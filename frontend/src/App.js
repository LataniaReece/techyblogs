import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Provider, useDispatch, useSelector} from 'react-redux';
import store from './store'
import './App.css'
import '../src/components/layout/layout.css'

// Components
import HomeComponent from './components/HomeComponent';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

// Screens
import AllBlogsScreen from './screens/blogs/AllBlogsScreen';
import BlogCreateScreen from './screens/blogs/BlogCreateScreen';
import BlogDetailsScreen from './screens/blogs/BlogDetailsScreen';
import BlogUpdateScreen from './screens/blogs/BlogUpdateScreen';

import LoginScreen from './screens/users/LoginScreen';
import RegisterScreen from './screens/users/RegisterScreen';
import ProfileScreen from './screens/users/ProfileScreen';
import { RESET_GLOBAL_ALERT } from './actions/actionTypes/globalAlertTypes';

const AppWrapper = () => {

    return (
      <Provider store={store}>
        <Router>
            <App />
        </Router>
      </Provider>
    )
  }


const App = () => {
    const [ message, setMessage] = useState('')

    const dispatch = useDispatch()
    let history = useHistory()

    const globalAlert = useSelector(state => state.globalAlert)
    const { alert: globalAlertMessage } = globalAlert

    useEffect(() =>{
        if(globalAlertMessage){
            setMessage(globalAlertMessage.alert)
            dispatch({ type: RESET_GLOBAL_ALERT})
            setTimeout(() =>{
                setMessage('')
            }, 5000)
            if(localStorage.getItem('alert')){
                localStorage.removeItem('alert')
            }
        }

    }, [globalAlertMessage, globalAlert])

 

    useEffect(() => {
        console.log(history)
    }, []);

    return (
        <Router>                                   
             <Switch>
                <Route path='/' component={HomeComponent} exact />
                <>
                    <main>
                        <Navbar />        
                            <div className="container pt-5" style={{"height": "100vh"}}> 
                                { message && <Alert type="success" dismissable={true}>{message}</Alert>}
                                <Switch>
                                <Route path="/login" component={LoginScreen} exact/>
                                <Route path="/register" component={RegisterScreen} exact/>
                                <Route path="/profile/:id" component={ProfileScreen} exact/>
                                <Route path='/blogs/new' component={BlogCreateScreen} exact/>
                                <Route path='/blogs/:id/edit' component={BlogUpdateScreen} exact/>
                                <Route path='/blogs/:id' component={BlogDetailsScreen} exact/>
                                <Route path='/blogs' component={AllBlogsScreen} exact/>
                                </Switch>
                            </div>
                    </main>
                </>
            </Switch>
        </Router>
    )
}


export default AppWrapper;
