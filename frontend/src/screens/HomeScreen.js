import React from 'react'
import {Link} from 'react-router-dom'

const HomeScreen = () => {
    return (
        <div className="home">
        <h1>Techy Blog</h1>
        <p className="lead container">Learn more about the latest techs and coding software through these blogs from experts in the field</p>
        <Link to="/blogs"><button className="btn btn-lg btn-primary">See Blogs</button></Link>
        </div>
    )
}

export default HomeScreen
