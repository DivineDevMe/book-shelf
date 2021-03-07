import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addbook, clearnewbook } from '../../actions';

class AddBook extends Component {
    state = {  
        formdata:{
            name:'',
            pages:'',
            price:'',
            ratings:'',
            review:'',
            author:''
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearnewbook());
    }

    showNewBook = (book)=>{
        return(
           book.post?
             <div className='conf_link'>
                Click to <Link to={`/book/${book.bookId}`}> See New Book</Link>
             </div>
            :null
        )
    }

    handleInpt = (event,name)=>{
        const formdata = {...this.state.formdata};//grab old data
        formdata[name] = event.target.value;//update form data
        this.setState({
            formdata
        });
    }
   
    submitForm = (e) =>{

        e.preventDefault();

        this.props.dispatch( addbook({
            ...this.state.formdata,
            ownerId:this.props.users.login.id
        }))
    }

    render() {
        return (
            <div className='rl_container article'>
                <form onSubmit={this.submitForm}>

                    <h2>Add a review</h2>
                    <div className='form_element'>
                        <input 
                          type='text'
                          placeholder='Enter name'
                          value={this.state.formdata.name}
                          onChange={(event => this.handleInpt(event,'name'))}
                        />
                    </div>
                    <div className='form_element'>
                        <input 
                          type='text'
                          placeholder='Enter author'
                          value={this.state.formdata.author}
                          onChange={(event => this.handleInpt(event,'author'))}
                        />
                    </div>
                    <textarea 
                    value={this.state.formdata.review}
                    onChange={(event => this.handleInpt(event,'review'))}
                    />
                    <div className='form_element'>
                        <input 
                          type='number'
                          placeholder='Enter pages'
                          value={this.state.formdata.pages}
                          onChange={(event => this.handleInpt(event,'pages'))}
                        />
                    </div>
                    <div className='form_element'>
                        <select value={this.state.formdata.ratings}
                        onChange={(event => this.handleInpt(event,'ratings'))}
                        >
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </select>
                    </div>
                    <div className='form_element'>
                        <input 
                          type='number'
                          placeholder='Enter price'
                          value={this.state.formdata.price}
                          onChange={(event => this.handleInpt(event,'price'))}
                        />
                    </div>
                <button type='submit'>Add Review</button>
                {
                    this.props.books.newbook? this.showNewBook(this.props.books.newbook):null
                }
                </form>
            </div>
        );
    }
}

const mapStateToProps =(state)=>{
    console.log(state);
    return{
       books: state.books
    }
}
export default connect(mapStateToProps)(AddBook);