import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../../actions/userActions'
import BlogComponent from '../../components/blogs/BlogComponent'

const ProfileScreen = ({match}) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { userInfo: profileUserInfo } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: loggedInUserInfo } = userLogin

    useEffect(() => {
        if(!profileUserInfo || !profileUserInfo.user._id){
            dispatch(getUserDetails(match.params.id))
        }
    }, [profileUserInfo, dispatch, match])


    return (
        <div>
            <h1>{ profileUserInfo && profileUserInfo.user.username}'s profile</h1>
            {(profileUserInfo && profileUserInfo.user._id) && (
                <>
                <h3>Blogs</h3>
                <div className="row justify-content-between">
                    {profileUserInfo.userBlogs && profileUserInfo.userBlogs.map((blog, index) =>{
                        return <BlogComponent key={blog._id} blog={blog} />
                    })}
                </div>
                </>
            )}
        </div>
    )
}

export default ProfileScreen
