import axios from 'axios';
import { 
    BLOG_LIST_FAIL,
    BLOG_LIST_REQUEST, 
    BLOG_LIST_SUCCESS,
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL,
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAIL,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL,
    BLOG_DELETE_REQUEST,
    BLOG_DELETE_SUCCESS,
    BLOG_DELETE_FAIL
} from './actionTypes/blogTypes';

export const getBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: BLOG_LIST_REQUEST })


        const { data } = await axios.get('api/blogs')

        dispatch({
            type: BLOG_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BLOG_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createBlog = (formData) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_CREATE_REQUEST })

//         const { userLogin: { userInfo } } = getState()

        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     },
        // }

        const { data } = await axios.post('/api/blogs', formData);

        dispatch({
            type: BLOG_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const getBlogDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_DETAIL_REQUEST })

        const { data } = await axios.get(`/api/blogs/${id}`)

        dispatch({
            type: BLOG_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateBlog = (id, formData) => async (dispatch) => {
    console.log(id)
    console.log(formData)
    try {
        dispatch({ type: BLOG_UPDATE_REQUEST })

//         const { userLogin: { userInfo } } = getState()

        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     },
        // }

        const { data } = await axios.put(`/api/blogs/${id}`, formData);

        dispatch({
            type: BLOG_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_DELETE_REQUEST })

        // const { userLogin: { userInfo } } = getState()

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${userInfo.token}`
        //     },
        // }

        await axios.delete(`/api/blogs/${id}`)

        dispatch({ type: BLOG_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: BLOG_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}