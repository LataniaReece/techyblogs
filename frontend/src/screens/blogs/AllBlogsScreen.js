import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../actions/blogAction';
import BlogComponent from '../../components/blogs/BlogComponent'

const AllBlogsScreen = () => {

    const dispatch = useDispatch()
    const blogList = useSelector(state => state.blogList)
    let { loading, error, blogs} = blogList

    useEffect(() => {

        dispatch(getBlogs())
        
    }, [dispatch])


    return (
        <div>
            <h1>All Blogs</h1>
            <div className="row">
                {blogs && blogs.map(blog =>{
                    return <BlogComponent key={blog._id} blog={blog}/>
                })}
            </div>
        </div>
    )
}

export default AllBlogsScreen
