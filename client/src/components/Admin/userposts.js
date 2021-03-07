import React, { Component } from 'react';
import {connect } from 'react-redux';
import moment from 'moment';
import {getUserPosts} from '../../actions';
import {Link} from 'react-router-dom'
 
class UserPosts extends Component {

    componentWillMount() {
        this.props.dispatch(getUserPosts(this.props.users.login.id));
    }

    showAllPosts  = (user) => (
       user.userposts ? 
            user.userposts.map( (item) => (
                <tr key={item._id}>
                    <td>
                        <Link to={`/user/edit-post/${item._id}`}>{item.name}</Link>
                    </td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                </tr>
            ))
        : null
    )

    render() {
        console.log(this.props)
        let user = this.props.users;
        return (
            <div className='user_posts'>
                 <h4>Your Reviews</h4>
                 <table>
                     <thead>
                         <tr>
                             <td>Name</td>
                             <td>Author</td>
                             <td>Date</td>
                         </tr>
                     </thead>
                     <tbody>
                         {this.showAllPosts(user)}
                     </tbody>
                 </table>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        users:state.users
    }
}
export default connect(mapStateToProps)(UserPosts);