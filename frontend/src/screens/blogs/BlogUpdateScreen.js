import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogDetail, updateBlog } from '../../actions/blogActions';
import { Editor } from '@tinymce/tinymce-react';
import Spinner from '../../components/layout/Spinner'
import Alert from '../../components/layout/Alert';
import { BLOG_UPDATE_RESET } from '../../actions/actionTypes/blogTypes';
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes';

const BlogUpdateScreen = ({match, history}) => {
    const dispatch = useDispatch();

    const editorRef = useRef(null);

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const blogDetail = useSelector(state => state.blogDetail)
    const { loading: loadingDetails, error: errorDetails, blog } = blogDetail

    const blogUpdate = useSelector(state => state.blogUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, blog: updatedBlog } = blogUpdate

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setMessage(error)
            setUploading(false)
        }
    }
    
    const submitHandler = (e) => {
        e.preventDefault();

        if(image){
            if(title && text){
                dispatch(updateBlog(blog._id, {
                    title, 
                    text, 
                    image
                }))
            }
        } else if(title && text){
            dispatch(updateBlog(blog._id, {
                title, 
                text
            }))
        }  
    }   

    useEffect(() =>{
        if(!userInfo || !userInfo._id){
            history.push('/login?redirect=/blogs')
            dispatch({
            type: SET_GLOBAL_ALERT,
            payload: {
                alert: 'You have to sign in first!',
                alertType: 'danger',
                dismissable: false
            }
        })
        }
        if (successUpdate) {
            dispatch({ type: BLOG_UPDATE_RESET })
            dispatch({
                type: SET_GLOBAL_ALERT,
                payload: {
                    alert: 'Successfully updated blog!',
                    alertType: 'success'
                }
            })
            history.push(`/blogs/${updatedBlog._id}`)                
        } 
        if (!blog || !blog.title || blog._id !== match.params.id) {
            dispatch(getBlogDetail(match.params.id))
        } else {
            setTitle(blog.title)
            setText(blog.text)
            if(!userInfo || userInfo._id !== blog.author._id){
                history.push(`/login`)
            } 
        }        
      
    }, [match, dispatch, blog, successUpdate, history, updatedBlog, userInfo])
    
    
    return (
        <>
        {(loadingDetails || loadingUpdate)? <Spinner /> : (
            <>
            {errorDetails && <Alert type="danger">{errorDetails}</Alert>}
            {message && <Alert type="danger">{message}</Alert>}
            <div className="form-container update-blog" onSubmit={submitHandler}>
                <h2 className="form-heading text-center">Update New Blog</h2>
                {errorUpdate && <Alert type="danger">{errorUpdate}</Alert>}
                <form>
                    <div class="mb-4">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" name="title" class="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div class="mb-4">
                    <Editor
                    apiKey="uq26sqh6ptu3m1qypa8quh5frkf26gd79zb02c1862hq2qxh"
                    onInit={(evt, editor) => editorRef.current = editor}
                    value={text}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                    onEditorChange={(newValue, editor) => setText(newValue)}
                    />
                </div>
                    <div class="input-group mb-4">
                        <input type="file" class="form-control" id="file" name="image" onChange={uploadFileHandler}/>
                    </div>
                    {uploading && <Spinner />}
                    <div className="mb-4">
                        <button type="submit" class="btn btn-primary w-100" disabled={uploading && true}>Submit</button>
                    </div>
                </form>
            </div>
            </>
        )}
       
        </>
    )
}

export default BlogUpdateScreen
