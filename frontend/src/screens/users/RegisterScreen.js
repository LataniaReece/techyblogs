import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes'
import { register } from '../../actions/userActions'
import Alert from '../../components/layout/Alert'

const RegisterScreen = ({history, location}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { error, success } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/blogs'


    useEffect(() =>{
        if(success){
            dispatch({
                type: SET_GLOBAL_ALERT,
                payload: {
                    alert: 'Successfully registered, welcome to the blog site!',
                    alertType: 'success'
                }
            })
            history.push(redirect)
        }
    }, [success, dispatch, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(username, email, password))
        }
    }
    return (
        <div className="form-container" onSubmit={submitHandler}>
        <h2 className="form-heading text-center">Register</h2>
        {error && <Alert type="danger">{error}</Alert>}
        {message && <Alert type="danger">{message}</Alert>}
        <form>
            <div class="mb-4">
                <label for="username" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="mb-4">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" class="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="mb-4">
                <button type="submit" class="btn btn-primary w-100">Submit</button>
            </div>
            <div className="mb-4">
                <p className="text-muted">Already have an account? <Link to="/login">Sign In Here</Link></p>
            </div>
        </form>
    </div>
    )
}

export default RegisterScreen
