import React from 'react'
import { Link } from 'react-router-dom'
const BlogComponent = ({blog, first}) => {

    return (
        <>
        {first ? (
            <Link className="blog-container card mb-3 col-md-12 first" to={`/blogs/${blog._id}`}>
                <img src={blog.image.url} className="card-img-top" alt={blog.title} />
                <div class="card-img-overlay p-4">
                  <h5 className="card-title">{blog.title}</h5>
                  <h6>{blog.relativeTime}</h6>
              </div>
            </Link>
        ) : (
            <Link class="blog-container card mb-3 mx-2 col-md-3" to={`/blogs/${blog._id}`}>
            <div class="row g-0">
              <div class="col-md-4">
                <img src={blog.image.url} class="img-responsive rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{blog.title}</h5>
                  <p class="card-text">{blog.text.length > 50 ? `${blog.text.substring(0,50)}...` : blog.text}</p>
                  <p class="card-text"><small class="text-muted">{blog.relativeTime}</small></p>
                </div>
              </div>
            </div>
          </Link>
        )}
        </>
    )
}

export default BlogComponent
