import {
    BLOG_LIST_FAIL, 
    BLOG_LIST_REQUEST, 
    BLOG_LIST_SUCCESS, 
    BLOG_CREATE_FAIL, 
    BLOG_CREATE_REQUEST, 
    BLOG_CREATE_RESET, 
    BLOG_CREATE_SUCCESS, 
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL,
    BLOG_UPDATE_RESET,
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAIL
} from "../actions/actionTypes/blogTypes"



export const blogListReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
        case BLOG_LIST_REQUEST:
            return { loading: true, blogs: [] }
        case BLOG_LIST_SUCCESS:
            return {
                loading: false,
                blogs: action.payload
            }
        case BLOG_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const blogDetailReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
        case BLOG_DETAIL_REQUEST:
            return { ...state, loading: true }
        case BLOG_DETAIL_SUCCESS:
            return { loading: false, blog: action.payload }
        case BLOG_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const blogCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_CREATE_REQUEST:
            return { loading: true }
        case BLOG_CREATE_SUCCESS:
            return { loading: false, success: true, blog: action.payload }
        case BLOG_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case BLOG_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const blogUpdateReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
        case BLOG_UPDATE_REQUEST:
            return { loading: true }
        case BLOG_UPDATE_SUCCESS:
            return { loading: false, success: true, blog: action.payload }
        case BLOG_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case BLOG_UPDATE_RESET:
            return {}
        default:
            return state
    }
}