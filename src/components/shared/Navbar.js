import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar is-dark">
            <div className="container level">
                <div className="level-item is-size-1">
                    <NavLink exact to='/'>
                        <h1>Rent A Car</h1>
                    </NavLink>
                </div>
                <div className="level-item is-size-6">
                    <NavLink to='/login' className='pl-3'>Log in</NavLink>
                    <NavLink to='/signup' className='pl-3'>Sign up</NavLink>
                    <NavLink to='/profile' className='pl-3'>Profile</NavLink>
                    <NavLink to='/admin' className='pl-3'>Admin panel</NavLink>
                    <NavLink to='/logout' className='pl-3'>Log out</NavLink>
                </div>
            </div>
        </nav>
    )
}
