import React from 'react'
import {Link} from 'react-router-dom'

const HomeComponent = () => {
    return (
        <div className="home">
        <h1>Latania's Techy Road</h1>
        <p className="lead">Get to know Latania reading her blogs about her road from a clinical research career to software development</p>
        <Link to="/blogs"><button className="btn btn-lg btn-primary">See Blogs</button></Link>
        </div>
    )
}

export default HomeComponent
