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
<<<<<<< HEAD
          <Link class="card blog-item border-0 col-lg-3 col-md-6 mb-3" to={`/blogs/${blog._id}`}>
          <img src={blog.image.url} class="card-img-top img-fluid" />
          <div class="card-body blog-item-content p-0 pt-3">
          <div class="blog-details d-flex wg-100">
              <p class="blog-date me-2"><i class="far fa-calendar-alt me-2 icon"></i><span>{blog.relativeTime}</span></p>
              <p class="blog-author"><i class="fas fa-user me-2 icon"></i><span>{blog.author.username}</span></p>
          </div>
          <h3 class="blog-title">{blog.title}</h3>
          </div>
=======
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
>>>>>>> 02dc16da8ea729be285f7a38e5eaaa5d2dbebef5
          </Link>
        )}
        </>
    )
}

export default BlogComponent
