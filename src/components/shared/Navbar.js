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
                <div className="level-item is-size-4">
                    <NavLink to='/login'>Log in</NavLink>
                    <NavLink to='/signup'>Sign up</NavLink>
                </div>
            </div>
        </nav>
    )
}
