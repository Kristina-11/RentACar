import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { storage, db, auth, firebase } from '../firebase/config';
import { VisitorContext } from '../context/VisitorsContext';

function Signup() {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== '' && email !== '' && password !== '') {
      try {
        // Adding user
        auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          return db.collection('users').doc(res.user.uid).set({
            username: username
          });
        }).catch(err => {
          // setError(err)
          console.log(err);
        });
      } catch (error) {
        console.log(error);
      }
    }
    history.push('/');
  }

return (
    <main className='container has-text-centered mt-6 p-4'>
      <section className="container has-text-centered">
        <h1 className="is-size-1 has-text-dark">Sign up</h1>
        <div className="has-text-centered">
            <form method='post' className='pt-6 m-3' onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label has-text-dark is-size-5">Username</label>
                    <div className="control has-icons-left">
                        <input className="input" name='text' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <p className="help error username"></p>
                </div>  
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
                        <input className="input" name='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </div>
                    <p className="help error password"></p>
                </div>
                <button className='button is-medium is-dark'>Sign up</button>
            </form>
        </div>
      </section>
    </main>
  )
}

export default Signup
