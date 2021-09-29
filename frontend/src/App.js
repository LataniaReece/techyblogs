import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import './App.css'

// Components
import HomeComponent from './components/HomeComponent';
import Navbar from './components/layout/Navbar';

// Screens
import AllBlogsScreen from './screens/blogs/AllBlogsScreen';
import BlogCreateScreen from './screens/blogs/BlogCreateScreen';
import BlogDetailsScreen from './screens/blogs/BlogDetailsScreen';
import BlogUpdateScreen from './screens/blogs/BlogUpdateScreen';

const App = () => {
    return (
        <>
        <Provider store={store}>
            <Router>
                <Navbar />
                <main>
                    <div className="container pt-5" style={{"height": "100vh"}}> 
                        <Switch>
                            <Route path='/blogs/new' component={BlogCreateScreen} exact />
                            <Route path='/blogs/:id/edit' component={BlogUpdateScreen} exact />
                            <Route path='/blogs/:id' component={BlogDetailsScreen} exact />
                            <Route path='/blogs' component={AllBlogsScreen} exact />
                            <Route path='/' component={HomeComponent} exact />
                        </Switch>
                    </div>
                </main>
            </Router>
        </Provider>
        </>
    )
}

export default App
