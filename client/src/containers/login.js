import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../actions'

class LoginContainer extends Component {
    state = { 
        email:'',
        password:'',
        error:'',
        success:false
     }

     componentWillReceiveProps(nextProps){
        if(nextProps.users.login.isAuth){
            this.props.history.push('/user');
        }

     }

     handleInputEmail = (event) =>{
         this.setState({ email:event.target.value})
     }
     handleInputPassword = (event) =>{
        this.setState({ password:event.target.value})
    }

    submitForm = (e)=>{
        e.preventDefault();
        this.props.dispatch(login(this.state));
    }

    render() {
        let  user = this.props.users;
        return (
            <div className='rl_container'>
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>

                    <div className='form_element'>
                        <input 
                          type='email'
                          placeholder='Enter email'
                          value={this.state.email}
                          onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className='form_element'>
                        <input 
                          type='password'
                          placeholder='Enter password'
                          value={this.state.password}
                          onChange={this.handleInputPassword}
                        />
                    </div>
                    <button type='submit'>Log in</button>
                   <div className='error'>
                   { 
                        user.login? 
                        <div>{user.login.message}</div> 
                        :null
                    }
                    </div>
                </form>
            </div>   
        );
    }
}
const mapStateToProps = (state) => {
    return {
        users:state.users
    }
}


export default connect(mapStateToProps)(LoginContainer)

 