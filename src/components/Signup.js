import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { storage, db, auth, firebase } from '../firebase/config';

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
            id: res.user.uid,
            username,
            email,
            password
          }),
          db.collection('users-renting').doc(res.user.uid).set({
            id: res.user.uid,
            brandId: '',
            modelRenting: '',
            brandRenting: '',
            rentingFrom: '',
            rentingTo: '',
            rentingTime: 0,
            date: '',
            vip: false,
            payment: 0
          });
        }).catch(err => {
          // setError(err)
          console.log(err.message);
        });

        history.push('/');
      } catch (error) {
        console.log(error);
      }
    }
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
                        <input className="input" name='text' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <p className="help error username"></p>
                </div>  
                <div className="field">
                    <label className="label has-text-dark is-size-5">Email</label>
                    <div className="control has-icons-left">
                        <input className="input" name='email' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <p className="help error email"></p>
                </div>                                      
                <div className="field">
                    <label className="label has-text-dark is-size-5">Password</label>
                    <div className="control has-icons-left">
                        <input className="input" name='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
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
