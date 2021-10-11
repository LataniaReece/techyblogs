import React from 'react'
import { Link } from 'react-router-dom'
const BlogComponent = ({blog, first}) => {

    return (
        <>
        {first ? (
            <Link className="blog-container card mb-3 col-md-12 first" to={`/blogs/${blog._id}`}>
                <img src={blog.image.url} className="card-img-top" alt={blog.title} />
                <div className="card-img-overlay p-4">
                  <h5 className="card-title">{blog.title}</h5>
                  <h6>{blog.relativeTime}</h6>
              </div>
            </Link>
        ) : (
            <Link className="blog-container card mb-3 col-md-4 not-first" to={`/blogs/${blog._id}`}>
              <div class="card bg-dark text-white">
                <div className="img-container">
                <img src={blog.image.url} class="card-img" alt="..." />
                </div>
                <div class="card-img-overlay">
                  <h5 class="card-title">{blog.title}</h5>
                  <p class="card-text">Written by {blog.author.username}</p>
                  <p class="card-text">{blog.relativeTime}</p>
                </div>
            </div>
          </Link>
        )}
        </>
    )
}

export default BlogComponent
