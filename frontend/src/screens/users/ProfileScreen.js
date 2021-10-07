import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../../actions/userActions'
import BlogComponent from '../../components/blogs/BlogComponent'
import Spinner from '../../components/layout/Spinner'

const ProfileScreen = ({match}) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, userInfo: profileUserInfo } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: loggedInUserInfo } = userLogin

    useEffect(() => {
        if(!profileUserInfo || !profileUserInfo.user._id || profileUserInfo.user._id !== match.params.id ){
            dispatch(getUserDetails(match.params.id))
        }
    }, [profileUserInfo, dispatch, match])


    return (
        <>
        { loading ? <Spinner /> : (
            <div>
            <h1>{ profileUserInfo && profileUserInfo.user.username}'s profile</h1>
            {(profileUserInfo && profileUserInfo.user._id) && (
                <>
                <h3>Blogs</h3>
                <div className="blogs-container">
                    <div className="row flex-wrap justify-content-center">
                        {profileUserInfo.userBlogs && profileUserInfo.userBlogs.map((blog, index) =>{
                            return <BlogComponent key={blog._id} blog={blog} />
                        })}
                    </div>
                </div>
                </>
            )}
        </div>
        )}
        </>
    )
}

export default ProfileScreen
