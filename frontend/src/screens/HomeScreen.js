import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className='home'>
      <h1>Techy Blogs</h1>
      <p className='lead container'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p>
      <Link to='/blogs'>
        <button className='btn btn-lg btn-primary'>See Blogs</button>
      </Link>
    </div>
  );
};

export default HomeScreen;
