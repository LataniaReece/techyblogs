import React from 'react'

const BlogCreateScreen = () => {
    const [formData, setFormData] = useState({
           blog[title]: '',
           blog[text]: '',
           image: ''
    })
    
    const submitHandler = (e) => {
        e.preventDefault();
        console.log({...formData});
    }
    
    return (
        <div className="form-container" onSubmit={submitHandler}>
            <h2 className="form-heading text-center">Create New Blog</h2>
            <form>
                <div class="mb-4">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" name="title" class="form-control" id="title" value={formData.blog[title]} onChange={(e) => setFormData({ ...formData, blog[title]: e.target.value })} />
                </div>
                <div class="mb-4">
                    <label for="Blog Text" class="form-label">Blog Text</label>
                    <textarea name="text" class="form-control" id="Blog Text" rows="8" resize="none" value={formData.blog[text]} onChange={(e) => setFormData({ ...formData, blog[text]: e.target.value })}></textarea>
                </div>
                <div class="input-group mb-4">
                    <input type="file" class="form-control" id="file" name="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}/>
                </div>
                <div className="mb-4">
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default BlogCreateScreen;
