import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { VisitorContext } from '../../context/VisitorsContext'
import { auth } from '../../firebase/config';

export default function Navbar() {
  const { user, setUser } = useContext(VisitorContext);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  }

  return (
    <nav className="navbar is-dark">
      <div className="container level">
        <div className="level-item is-size-1">
          <NavLink exact to='/'>
              <h1>Rent A Car</h1>
          </NavLink>
        </div>
        <div className="level-item is-size-6">
          { user != null && <NavLink to='/' className='pl-3'>Hello, {user}</NavLink>}
          <NavLink to='/login' className='pl-3'>Log in</NavLink>
          <NavLink to='/signup' className='pl-3'>Sign up</NavLink>
          <NavLink to='/profile' className='pl-3'>Profile</NavLink>
          <NavLink to='/admin' className='pl-3'>Admin panel</NavLink>
          <NavLink to='/' onClick={handleLogout} className='pl-3'>Log out</NavLink>
        </div>
      </div>
    </nav>
  )
}
