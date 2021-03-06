import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth} from '../actions'


export default function(ComposedClass,reload){

class AuthenticationCheck extends Component {
    state = { 
        loading:true
     }

    componentWillMount() {
        this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps){
       this.setState({loading:false});
       if(!nextProps.users.login.isAuth){

        if(reload === true){
            this.props.history.push('/login');
        }
        
       }else{

        if(reload === false){
            this.props.history.push('/user')
        }
       }
    }

    render() {
        if(this.state.loading){
            return <div className='loader'>Loading...</div>
        }
        return (
           <ComposedClass {...this.props} user={this.props.user} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

return connect(mapStateToProps)(AuthenticationCheck)
}