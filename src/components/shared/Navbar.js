import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { VisitorContext } from '../../context/VisitorsContext'
import { auth } from '../../firebase/config';

export default function Navbar({userObject, setUserObject}) {
  const { user, setUser } = useContext(VisitorContext);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setUserObject(null);
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
          { user === null && <NavLink to='/login' className='pl-3'>Log in</NavLink> } 
          { user === null &&<NavLink to='/signup' className='pl-3'>Sign up</NavLink> }
          { user != null && user !== 'Admin' && <NavLink to='/profile' className='pl-3'>Profile</NavLink> }
          { user != null && user === 'Admin' && <NavLink to='/admin' className='pl-3'>Admin panel</NavLink> }
          { user != null && <NavLink to='/' onClick={handleLogout} className='pl-3'>Log out</NavLink> }
        </div>
      </div>
    </nav>
  )
}
