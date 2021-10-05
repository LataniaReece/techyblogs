import React, {useEffect} from 'react';
import { deleteBlog, getBlogDetail } from '../../actions/blogActions';
import {useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import Alert from '../../components/layout/Alert';
import { BLOG_DELETE_RESET } from '../../actions/actionTypes/blogTypes';
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes';

const BlogDetailsScreen = ({match, history}) =>{
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const blogDetail = useSelector(state => state.blogDetail)
    const { loading, error, blog } = blogDetail

    const blogDelete = useSelector(state => state.blogDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = blogDelete

    useEffect(() =>{
        if(successDelete){
            dispatch({type: BLOG_DELETE_RESET})
            dispatch({
                type: SET_GLOBAL_ALERT,
                payload: {
                    alert: 'Successfully Deleted Blog!',
                    alertType: 'success'
                }
            })
            history.push('/blogs')
        }
        dispatch(getBlogDetail(match.params.id))
           
    }, [match, dispatch, successDelete, history])

    const deleteHandler = (id) => {
        if(!userInfo || !userInfo._id || userInfo._id !== blog.author._id){
            alert('You do not have permission to do that!')
        } else{
            if (window.confirm('Are you sure you want to delete this blog?')) {
                dispatch(deleteBlog(id))
            }
        }   
    }    
    
    return(
        <>
        {loading ? <Spinner /> : (
            <>
            {error && <Alert type="danger" noMargin={true}>{error}</Alert>}
            {errorDelete && <Alert type="danger" noMargin={true}>{errorDelete}</Alert>}
            { (blog && blog._id) && (
                <div className="blog-details">
                    <h2 className="mb-2">{blog.title}</h2>                    
                    <p><small className="text-muted">{blog.relativeTime} | Written by {blog.author.username}</small></p>
                    {(userInfo && userInfo._id && userInfo._id === blog.author._id) && (
                        <>
                        <Link to={`/blogs/${blog._id}/edit`}><button type="button" className="btn btn-primary btn-sm me-2">Edit Blog</button></Link>
                        <button type="button" onClick={()=>deleteHandler(blog._id)} className="btn btn-danger btn-sm">Delete Blog</button>
                        {loadingDelete && <Spinner />}
                        </>
                    )}                    
                    <img src={blog.image.url} className="card-img-top my-3" alt={blog.title} />
                    <p className="content">{blog.text}</p>                   
                </div>
            )}
            </>
        )}       
        </>
    )
}

export default BlogDetailsScreen;