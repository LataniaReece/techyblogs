import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import { createBlog } from '../../actions/blogActions';
import Spinner from '../../components/layout/Spinner'
import Alert from '../../components/layout/Alert';
import { SET_GLOBAL_ALERT } from '../../actions/actionTypes/globalAlertTypes';


const BlogCreateScreen = ({history}) => {

    const dispatch = useDispatch();

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
          console.log(editorRef.current.getContent());
        }
      };

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

        if (editorRef.current) {
            setText(editorRef.current.getContent())
        }

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
                        <Editor
                        apiKey="uq26sqh6ptu3m1qypa8quh5frkf26gd79zb02c1862hq2qxh"
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
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
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        />
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
