import React from 'react'

const NewBlogForm = () => {
    return (
        <div className="form-container">
            <h2 className="form-heading text-center">Create New Blog</h2>
            <form>
                <div class="mb-4">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" name="blog[title]" class="form-control" id="title" />
                </div>
                <div class="mb-4">
                    <label for="Blog Text" class="form-label">Blog Text</label>
                    <textarea name="blog[text]" class="form-control" id="Blog Text" rows="8" resize="none"></textarea>
                </div>
                <div class="input-group mb-4">
                    <input type="file" class="form-control" id="file" name="image" />
                </div>
                <div className="mb-4">
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogForm;
