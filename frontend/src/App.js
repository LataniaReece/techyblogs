import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

import ReactNotification from 'react-notifications-component'

import { store as reactNotificationStore } from 'react-notifications-component';
import 'animate.css'
import 'react-notifications-component/dist/theme.css'

const AppWrapper = () => {

    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }


const App = () => {
    // let [count, setCount] = useState(0)
    // const [message, setMessage] = useState('')
    // const [alertType, setAlertType] = useState('')
    // const dispatch = useDispatch();

    // const globalAlert = useSelector(state => state.globalAlert)
    // const { alert: globalAlertMessage } = globalAlert

    // useEffect(() =>{
    //     if(globalAlertMessage && count === 0 ){
    //         setMessage(globalAlertMessage.alert)
    //         setAlertType(globalAlertMessage.alertType)
    //         setTimeout(() => {
    //             setMessage('');
    //           }, 5000);
    //           setCount( count += 1)
    //     }else{
    //         dispatch({
    //             type: RESET_GLOBAL_ALERT
    //         })
    //         setCount(0)
    //     }

    // }, [dispatch, globalAlertMessage, globalAlert])

    return (
        <Router>                                   
             <Switch>
                <Route path='/' component={HomeComponent} exact />
                <>
                    <main>
                        <Navbar />        
                            <div className="container pt-5" style={{"height": "100vh"}}> 
                                <ReactNotification />
                                <button className="btn btn-primary">Hello</button>
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
