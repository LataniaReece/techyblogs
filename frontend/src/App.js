import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import './App.css'

// Components
import HomeComponent from './components/HomeComponent';
import Navbar from './components/layout/Navbar';

// Screens
import AllBlogsScreen from './screens/blogs/AllBlogsScreen';
import BlogCreateScreen from './screens/blogs/BlogCreateScreen';

const App = () => {
    return (
        <>
        <Provider store={store}>
            <Router>
                <Navbar />
                <main>
                    <div className="container pt-5" style={{"height": "100vh"}}> 
                        <Route path='/blogs/new' component={BlogCreateScreen} />
                        <Route path='/blogs' component={AllBlogsScreen} exact />
                        <Route path='/' component={HomeComponent} exact />
                    </div>
                </main>
            </Router>
        </Provider>
        </>
    )
}

export default App
