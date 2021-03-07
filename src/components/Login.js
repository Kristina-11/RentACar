import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { VisitorContext } from '../context/VisitorsContext';
import { auth, db } from '../firebase/config';

function Login() {
    const { setUser } = useContext(VisitorContext);
    const history = useHistory();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if(email !== '' && password !== '') {
          try {
            auth.signInWithEmailAndPassword(email, password)
            .then(res => {
              
            }).catch(err => {
              console.log(err)
            })
          } catch (error) {
            console.log(error)
          }
        }
        history.push('/');
    }

  return (
    <main className='container has-text-centered mt-6 p-4'>
      <section className="container has-text-centered">
        <h1 className="is-size-1 has-text-dark">Log in</h1>
        <div className="has-text-centered">
          <form className='pt-6 m-3' onSubmit={handleLogin}>
            <div className="field">
              <label className="label has-text-dark is-size-5">Email</label>
              <div className="control has-icons-left">
                <input className="input" name='email' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                </span>
              </div>
              <p className="help error email"></p>
            </div>                                      
            <div className="field">
              <label className="label has-text-dark is-size-5">Password</label>
              <div className="control has-icons-left">
                <input className="input" name='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                </span>
              </div>
              <p className="help error password"></p>
            </div>
            <button className='button is-medium is-dark'>Log in</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login
