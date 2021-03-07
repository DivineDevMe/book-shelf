import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home/home';
import BookView from "./components/Book";
import Layout from './hoc/layout';
import Login from './containers/login';
import Auth from './hoc/auth';
import User from './components/Admin';
import AddReview from './components/Admin/add';
import UserPosts from './components/Admin/userposts';
import Edit from './components/Admin/edit';
import RegisterUser from './components/Admin/reg';
import Logout from './components/Admin/logout';

function Routes(props) {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Auth(Home,null)}/>
                <Route path='/user' exact component={Auth(User,true)}/>
                <Route path='/user/register' exact component={Auth(RegisterUser,true)}/>
                <Route path='/user/review' exact component={Auth(UserPosts,true)}/>
                <Route path='/user/edit-post/:id' exact component={Auth(Edit,true)}/>
                <Route path='/user/add' exact component={Auth(AddReview,true)}/>
                <Route path='/user/logout' exact component={Auth(Logout,true)}/>
                <Route path='/book/:id' exact component={Auth(BookView)}/>
                <Route path='/login' exact component={Auth(Login,false)}/>
            </Switch>
        </Layout>
    );
}

export default Routes;