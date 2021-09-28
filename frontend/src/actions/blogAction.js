import axios from 'axios';
import { 
    BLOG_LIST_FAIL,
    BLOG_LIST_REQUEST, 
    BLOG_LIST_SUCCESS,
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL
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

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             },
//         }

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
