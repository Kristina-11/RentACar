import React from 'react'

function Login() {
    return (
        <main className='container has-text-centered mt-6 p-4'>
            <section className="container has-text-centered">
                <h1 className="is-size-1 has-text-dark">Log in</h1>
                <div className="has-text-centered">
                    <form className='pt-6 m-3'>
                        <div className="field">
                            <label className="label has-text-dark is-size-5">Email</label>
                            <div className="control has-icons-left">
                                <input className="input" name='email' type="email" placeholder="Email" />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                            <p className="help error email"></p>
                        </div>                                      
                        <div className="field">
                            <label className="label has-text-dark is-size-5">Password</label>
                            <div className="control has-icons-left">
                                <input className="input" name='password' type="password" placeholder="Password" />
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
