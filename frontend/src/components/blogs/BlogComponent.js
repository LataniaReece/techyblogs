import React, {useEffect} from 'react'

const BlogComponent = ({blog}) => {

    return (
        <div className="blog-container card mb-3">
            <img src={blog.image.url} className="card-img-top" alt={blog.title} />
            <div class="card-img-overlay p-4">
                <h5 className="card-title">{blog.title}</h5>
                <h6>Posted On: 9.27.2021</h6>
                <h6>Written By: Tania</h6>
            </div>
        </div>
    )
}

export default BlogComponent
