import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../actions/blogAction';
import BlogComponent from '../../components/blogs/BlogComponent'
import Alert from '../../components/layout/Alert';

const AllBlogsScreen = () => {

    const dispatch = useDispatch()
    const blogList = useSelector(state => state.blogList)
    let { loading, error, blogs} = blogList

    useEffect(() => {

        dispatch(getBlogs())
        
    }, [dispatch])


    return (
        <div className="blogs-container">
            <h1>All Blogs</h1>
            {error && <Alert type="danger">{error}</Alert>}
            <div className="row justify-content-between">
                {blogs && blogs.map((blog, index) =>{
                    return <BlogComponent key={blog._id} blog={blog} first={index === 0 ? true: false}/>
                })}
            </div>
        </div>
    )
}

export default AllBlogsScreen
