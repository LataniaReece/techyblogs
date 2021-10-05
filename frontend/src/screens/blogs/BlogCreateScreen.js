import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../../actions/blogActions';
import Spinner from '../../components/layout/Spinner'
import Alert from '../../components/layout/Alert';
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes';


const BlogCreateScreen = ({history}) => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)

    const userLogin = useSelector (state => state.userLogin)
    const { userInfo } = userLogin

    const blogCreate = useSelector(state => state.blogCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = blogCreate

    useEffect(() =>{
        if(!userInfo || !userInfo._id){
            history.push('/login?redirect=/blogs/new')
        }
        if(successCreate){
            dispatch({
                type: SET_GLOBAL_ALERT,
                payload: {
                    alert: 'Blog Successfully Created!',
                    alertType: 'success'
                }
            })
            history.push('/blogs')
        }
    }, [userInfo, successCreate, history])

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
            setUploading(false)
        }
    }
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(title && text && image){
            dispatch(createBlog({
                title, 
                text, 
                image
            }))
        }     
    }
    
    return (
        <div className="form-container" onSubmit={submitHandler}>
            <h2 className="form-heading text-center">Create New Blog</h2>
            {loadingCreate ? <Spinner /> : (
                <form>
                    {errorCreate && <Alert type="danger">{errorCreate}</Alert>}
                    <div class="mb-4">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" name="title" class="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div class="mb-4">
                        <label for="Blog Text" class="form-label">Blog Text</label>
                        <textarea name="text" class="form-control" id="Blog Text" rows="8" resize="none" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    </div>
                    <div class="input-group mb-4">
                        <input type="file" class="form-control" id="file" name="image" onChange={uploadFileHandler}/>
                    </div>
                    {uploading && <Spinner />}
                    <div className="mb-4">
                        <button  utton type="submit" class="btn btn-primary w-100" disabled={uploading && true}>Submit</button>
                    </div>
                </form>
            )}        
        </div>
    )
}

export default BlogCreateScreen;
