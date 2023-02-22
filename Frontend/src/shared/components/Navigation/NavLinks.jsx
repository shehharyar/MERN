import React from 'react'
import './NavLinks.css';
import { useContext } from 'react';
import { AuthCOntext } from '../../context/auth-context';
import { NavLink } from 'react-router-dom'
const NavLinks = ({id}) => {
 const authCtx= useContext(AuthCOntext);
  return (
    
        <ul className="nav-links weblinks" id={id}>
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    { authCtx.isLoggedIn && <li>
      <NavLink to="/u1/places">MY PLACES</NavLink>
    </li>}
    {
      authCtx.isLoggedIn &&
      <li>
      <NavLink to="/places/new">ADD PLACE</NavLink>
    </li>}
    {!authCtx.isLoggedIn &&
    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>}
{
  authCtx.isLoggedIn && <button onClick={authCtx.LogOut}>LogOut</button>
}

  </ul>
    
  )
}

export default NavLinks