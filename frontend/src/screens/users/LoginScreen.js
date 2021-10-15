import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes';
import { login } from '../../actions/userActions';
import Alert from '../../components/layout/Alert';

const LoginScreen = ({history, location}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, error, success } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/blogs'

    useEffect(() =>{
        if(userInfo){
            return history.push(redirect)
        }
        if(success){
            dispatch({
                type: SET_GLOBAL_ALERT,
                payload: {
                    alert: 'Welcome Back!',
                    alertType: 'success'
                }
            })
            history.push({
                pathname: redirect,
                state: {
                    message: "my message"
                }
            })
        }
    }, [success, history, dispatch, redirect, userInfo])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <div className="form-container" onSubmit={submitHandler}>
        <h2 className="form-heading text-center">Login</h2>
        {error && <Alert type="danger">{error}</Alert>}
        <form>
            <div className="mb-4">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" name="username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
            <div className="mb-4">
            <p className="text-muted">Don't have an account? <Link to="/register">Sign Up Here</Link></p>
        </div>
        </form>
    </div>
    )
}

export default LoginScreen
