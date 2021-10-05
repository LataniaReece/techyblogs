import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'

const ProfileScreen = ({history}) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (!userInfo) {
            history.push('/login?redirect=profile')
        }
    }, [userInfo, history])


    return (
        <div>
            <h1>My Profile</h1>
            {(userInfo && userInfo._id) && (
                <p>{userInfo.username}</p>
            )}
        </div>
    )
}

export default ProfileScreen
