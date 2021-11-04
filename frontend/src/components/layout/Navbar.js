import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../../actions/userActions';

const Navbar = () => {

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
}

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Techy Blogs</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs/new">New Blog</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          {(userInfo && userInfo._id) ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/profile/${userInfo._id}`}>My Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={() => logoutHandler()}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              </>
          )}         
           
          </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
