import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewBlogForm from './blogs/NewBlogForm/NewBlogForm';
import HomeComponent from './HomeComponent';
import Navbar from './layout/Navbar';
import './App.css'
import Blogs from './blogs/Blogs/Blogs';

const App = () => {
    return (
        <>
        <Router>
            <Navbar />
            <main>
            <Route path='/blogs/new' component={NewBlogForm} />
            <Route path='/blogs' component={Blogs} exact />
                <Route path='/' component={HomeComponent} exact />
            </main>
        </Router>
        </>
    )
}

export default App
