import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/layout/Spinner'
import Alert from '../../components/layout/Alert';
import { deleteUser, getUserDetails, updateUser } from '../../actions/userActions';
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes';
import { USER_DELETE_RESET, USER_UPDATE_RESET } from '../../actions/actionTypes/userTypes';

const ProfileEditScreen = ({match, history}) => {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, userInfo: profileUserInfo } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { user: updatedUser, error, success: successUpdate} = userUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: loggedInUserInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { loading: loadingDelete, success: successDelete} = userDelete

    useEffect(() =>{
        console.log("hello")
        if(!profileUserInfo || !profileUserInfo.user._id || profileUserInfo.user._id !== match.params.id ){
            dispatch(getUserDetails(match.params.id))
        }else{
            setUsername(profileUserInfo.user.username)
        }    
    }, [profileUserInfo, match.params.id])

    useEffect(() =>{
        if(!loggedInUserInfo || !loggedInUserInfo._id){
            history.push('/login?redirect=/blogs')
            dispatch({
            type: SET_GLOBAL_ALERT,
            payload: {
                alert: 'You have to sign in first!',
                alertType: 'danger',
                dismissable: false
            }
        })
        }
        if(successUpdate){
            dispatch({
                type: SET_GLOBAL_ALERT,
                payload: {
                    alert: 'Successfully updated profile!',
                    alertType: 'success'
                }
            })
            dispatch({ type: USER_UPDATE_RESET})
            history.push(`/profile/${updatedUser._id}`)
        }
        if(successDelete){
            dispatch({type: USER_DELETE_RESET})
            history.push('/blogs')
        }
    }, [successUpdate, successDelete, dispatch, history, updatedUser, loggedInUserInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(username){
            dispatch(updateUser(profileUserInfo.user._id, username))
        }else{
            setMessage('Please fill in all fields')
        }
  
    }

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }
    
    return (
        <div className="form-container auth-form" onSubmit={submitHandler}>
        <h2 className="form-heading text-center">Edit User</h2>
        {(profileUserInfo && loggedInUserInfo) ? (
            <>
            {error && <Alert type="danger">{error}</Alert>}
            {message && <Alert type="danger">{message}</Alert>}
            <form>
                <div className="mb-4">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
            
                <div className="mb-4">
                    <button type="submit" className="btn btn-primary w-100">Update Profile</button>
                </div>
            </form>
            {(loggedInUserInfo && loggedInUserInfo._id && loggedInUserInfo._id === profileUserInfo.user._id) && (
                <>
                <button type="button" onClick={()=>deleteHandler(loggedInUserInfo._id)} className="btn btn-danger btn-sm">Delete Profile</button>
                {loadingDelete && <Spinner />}
                </>
                )} 
            </>
            ) : <Spinner /> 
        }     
        </div>
    )
}

export default ProfileEditScreen
