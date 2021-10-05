import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../actions/blogActions';
import BlogComponent from '../../components/blogs/BlogComponent'
import Alert from '../../components/layout/Alert';
import Spinner from '../../components/layout/Spinner';

const AllBlogsScreen = ({history, location}) => {
    const [ successMessage, setSuccessMessage ] = useState('')

    const dispatch = useDispatch()
    const blogList = useSelector(state => state.blogList)
    let { loading, error, blogs} = blogList

    useEffect(() => {
        if(location.state && location.state.successMessage && location.state.successMessage !== ''){
            setSuccessMessage(location.state.successMessage)
            history.replace({ state: { successMessage: ''}});
        }
        dispatch(getBlogs())
        
    }, [dispatch, location, history])


    return (
        <>
        <div className="blogs-container">
            <h1>All Blogs</h1>
            {loading ? <Spinner /> : (
                <>
                {error && <Alert type="danger">{error}</Alert>}
                {successMessage && <Alert type="success">{successMessage}</Alert>}
                <div className="row justify-content-between">
                    {blogs && blogs.map((blog, index) =>{
                        return <BlogComponent key={blog._id} blog={blog} first={index === 0 ? true: false}/>
                    })}
                </div>
                </>
            )}         
        </div>
        </>
    )
}

export default AllBlogsScreen
