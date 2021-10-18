import axios from 'axios'
import { 
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT_FAIL, 
    USER_LOGOUT_REQUEST, 
    USER_LOGOUT_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "./actionTypes/userTypes"
import { SET_GLOBAL_ALERT } from './actionTypes/globalAlertTypes'


export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/users/login',
            { username, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })        

        localStorage.setItem('userInfo', JSON.stringify(data))
        // dispatch({
        //     type: SET_GLOBAL_ALERT,
        //     payload: {
        //         alert: 'Welcome Back!',
        //         alertType: 'success'
        //     }
        // })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGOUT_REQUEST
        })

        await axios.get('/api/users/logout')

        dispatch({
            type: USER_LOGOUT_SUCCESS
        })        

        localStorage.removeItem('userInfo')
        localStorage.setItem('alert', JSON.stringify({
            'alert': 'Goodbye!',
            'alertType': 'success'
        }))
        window.location.reload()
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}


export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/users/register',
            { username, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        // dispatch({
        //     type: SET_GLOBAL_ALERT,
        //     payload: {
        //         alert: "Welcome to Latania's Techy Road!",
        //         alertType: 'success'
        //     }
        // })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    console.log(id)
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/users/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}