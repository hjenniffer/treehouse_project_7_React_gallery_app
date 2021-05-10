import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <header>
      <nav className='main-nav'>
        <ul>
          <li><NavLink to='/cats'>Cats</NavLink></li>
          <li><NavLink to='/dogs'>Dogs</NavLink></li>
          <li><NavLink to='/beaches'>Beaches</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;