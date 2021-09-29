import react, {useEffect}from 'react';
import { getBlogDetail } from '../../actions/blogAction';
import {useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import Alert from '../../components/layout/Alert';

const BlogDetailsScreen = ({match}) =>{
    const blogDetail = useSelector(state => state.blogDetail)
    const { loading, error, blog } = blogDetail

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getBlogDetail(match.params.id))
    }, [match, dispatch])
    
    
    return(
        <>
        {loading && <Spinner />}
        {error && <Alert type="danger">{error}</Alert>}
        { (blog && blog._id) && (
            <div class="blog-details">
                <h2 className="mb-2">{blog.title}</h2>
                <small className="text-muted">Last updated 3 mins ago</small>
                <img src={blog.image.url} class="card-img-top my-3" alt={blog.title} />
                <p className="content">{blog.text}</p>
            </div>
        )}
        </>
    )
}

export default BlogDetailsScreen;