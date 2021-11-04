import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogDetail, updateBlog } from '../../actions/blogActions';
import { Editor } from '@tinymce/tinymce-react';
import Spinner from '../../components/layout/Spinner'
import Alert from '../../components/layout/Alert';
import { BLOG_UPDATE_RESET } from '../../actions/actionTypes/blogTypes';
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes';

const UserEditScreen = ({match, history}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin    
    
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(username);
    }   

    useEffect(() =>{
        if (successUpdate) {
            dispatch({ type: BLOG_UPDATE_RESET })
            dispatch({
                type: SET_GLOBAL_ALERT,
                payload: {
                    alert: 'Successfully updated username!',
                    alertType: 'success'
                }
            })
            history.push(`/profile/${userInfo._id}`)                
        } 
        if (!blog || !blog.title || blog._id !== match.params.id) {
            dispatch(getBlogDetail(match.params.id))
        } else {
            setTitle(blog.title)
            setText(blog.text)
            if(!userInfo || userInfo._id !== blog.author._id){
                history.push(`/login`)
            } 
        }        
      
    }, [match, dispatch, blog, successUpdate, history, updatedBlog, userInfo])
    
    
    return (
        <div className="form-container auth-form" onSubmit={submitHandler}>
        <h2 className="form-heading text-center">Edit User</h2>
        {error && <Alert type="danger">{error}</Alert>}
        <form>
            <div className="mb-4">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" name="username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
         
            <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
            <div className="mb-4">
                <button type="button" onClick={()=>deleteHandler()} className="btn btn-danger btn-sm">Delete Profile</button>
                {loadingDelete && <Spinner />}
            </div>
        </form>
    </div>
    )
}

export default UserEditScreen
