import React from 'react'
import { Link } from 'react-router-dom'
const BlogComponent = ({blog, first}) => {

    return (
        <>
        {first ? (
            <Link className="blog-first-item card mb-3 col-md-12" to={`/blogs/${blog._id}`}>
                <img src={blog.image.url} className="card-img-top" alt={blog.title} />
                <div className="card-img-overlay p-4">
                  <h5 className="card-title">{blog.title}</h5>
                  <div class="blog-info d-flex wg-100">
                    <p class="blog-date me-2"><i class="far fa-calendar-alt me-2 icon"></i><span>{blog.relativeTime}</span></p>
                    <p class="blog-author"><i class="fas fa-user me-2 icon"></i><span>{blog.author.username}</span></p>
                  </div>
              </div>
            </Link>
        ) : (
          <Link class="card blog-item border-0 col-lg-4 col-md-6 mb-3 px-1" to={`/blogs/${blog._id}`}>
          <img src={blog.image.url} class="card-img-top img-fluid" />
          <div class="card-body blog-item-content p-0 pt-3">
          <div class="blog-info d-flex flex-column flex-sm-row wg-100">
              <p class="blog-date me-2"><i class="far fa-calendar-alt me-2 icon"></i><span>{blog.relativeTime}</span></p>
              <p class="blog-author"><i class="fas fa-user me-2 icon"></i><span>{blog.author.username}</span></p>
          </div>
          <h3 class="blog-title wg-100">{blog.title}</h3>
          </div>
          </Link>
        )}
        </>
    )
}

export default BlogComponent
