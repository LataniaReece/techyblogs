import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getUserDetails } from '../../actions/userActions';
import BlogComponent from '../../components/blogs/BlogComponent';
import Spinner from '../../components/layout/Spinner';

const ProfileScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, userInfo: profileUserInfo } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: loggedInUserInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(getUserDetails(match.params.id));
  }, []);

  useEffect(() => {
    if (successDelete) {
      history.push('/blogs');
    }
    if (
      !profileUserInfo ||
      !profileUserInfo.user._id ||
      profileUserInfo.user._id !== match.params.id
    ) {
      dispatch(getUserDetails(match.params.id));
    }
  }, [profileUserInfo, dispatch, match, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='blogs-container'>
          <h1>{profileUserInfo && profileUserInfo.user.username}'s profile</h1>
          {profileUserInfo && profileUserInfo.user._id && (
            <>
              {loggedInUserInfo &&
                loggedInUserInfo._id &&
                loggedInUserInfo._id === profileUserInfo.user._id && (
                  <>
                    <button
                      type='button'
                      onClick={() => deleteHandler(loggedInUserInfo._id)}
                      className='btn btn-danger btn-sm'
                    >
                      Delete Profile
                    </button>
                    {loadingDelete && <Spinner />}
                  </>
                )}
              <h3>Blogs</h3>
              <div>
                <div className='row flex-wrap justify-content-center'>
                  {profileUserInfo.userBlogs &&
                    profileUserInfo.userBlogs.map((blog, index) => {
                      return <BlogComponent key={blog._id} blog={blog} />;
                    })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileScreen;
