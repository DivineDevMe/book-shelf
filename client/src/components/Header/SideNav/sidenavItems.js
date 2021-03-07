import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function SidenavItems({users}) {

    const items =[
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'users',
            text:'Admin',
            link:'/user/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-in',
            text:'Sign In',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'folder-open',
            text:'My Reviews',
            link:'/user/review',
            restricted:true
        },
        {
            type:'navItem',
            icon:'edit',
            text:'Add Reviews',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Sign Out',
            link:'/user/logout',
            restricted:true
        }
    ]

    const element = (item,i)=>{
       return <div key={i} className={item.type}>
            <Link to={item.link}>
            <FontAwesome name={item.icon} />
            {item.text}
            </Link>
        </div>
    }

    const showItems = ()=>{
       return  users.login? items.map( (item,i) =>{
           if(users.login.isAuth){
              return !item.exclude? element(item,i) : null
           }else{
            return !item.restricted ?element(item,i) : null
           }    
        }) : null
    }

    return (
        <div>
            {showItems()}
        </div>
    );
}

const mapSateToProps = (state)=>{
    return{
        users:state.users
    }
}
export default connect(mapSateToProps)(SidenavItems);