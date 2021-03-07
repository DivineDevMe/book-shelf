import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {getUsers,regUser} from '../../actions';

class RegisterUser extends PureComponent {
    state = { 
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:'',
     }

     componentWillMount() {
         this.props.dispatch(getUsers());
     }

     componentWillUnmount() {
         
     }

     componentWillReceiveProps(nextProps){
         if(this.props.users.registered === false){
           this.setState({ error: 'Oops!!! user not added try again'})
         }else{
             this.setState({ 
                name:'',
                lastname:'',
                email:'',
                password:''
             })
         }
     }

     handleInputName = (event) =>{
        this.setState({ name : event.target.value})
     }
     handleInputLastname = (event) =>{
        this.setState({ lastname : event.target.value})
    }
    handleInputEmail = (event) =>{
        this.setState({ email : event.target.value})
    }
    handleInputPassword = (event) =>{
        this.setState({ password : event.target.value})
    }

    submitForm = (e)=>{
        e.preventDefault();

        this.props.dispatch( regUser({
            name:this.state.name,
            lastname:this.state.lastname,
            password:this.state.password,
            email:this.state.email
        },this.props.users.userslist)   )
    }

    listUsers = (users) =>(
        users.userslist?
            users.userslist.map( item => 
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
             )
         : null
    )

    
    render() {
        const users = this.props.users
        return (
            <div className='rl_container'>
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>
                    <div className='form_element'>
                        <input 
                           type='text'
                           placeholder='Name'
                           value={this.state.name}
                           onChange={ this.handleInputName}
                        />
                    </div>
                    <div className='form_element'>
                        <input 
                           type='text'
                           placeholder='Lastame'
                           value={this.state.lastname}
                           onChange={ this.handleInputLastname}
                        />
                    </div>
                    <div className='form_element'>
                        <input 
                           type='email'
                           placeholder='Email'
                           value={this.state.email}
                           onChange={ this.handleInputEmail}
                        />
                    </div>
                    <div className='form_element'>
                        <input 
                           type='password'
                           placeholder='Password'
                           value={this.state.password}
                           autoComplete
                           onChange={ this.handleInputPassword}
                        />
                    </div>
                    <button type='submit'>Add User</button>
                    <div className='error'>
                        { this.state.error}
                    </div>
                </form>

                <div className='current_users'>
                    <h4>Current Users</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listUsers(users)}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        users:state.users
    }
}

export default connect(mapStateToProps)(RegisterUser);