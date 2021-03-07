import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getBook, updateBook, deleteBook,clearBook } from '../../actions';

class EditBook extends PureComponent {
    state = {  
        formdata:{
            _id: this.props.match.params.id,
            name:'',
            pages:'',
            price:'',
            ratings:'',
            review:'',
            author:''
        }
    }

    componentWillUnmount() {
        // this.props.dispatch(clearnewbook());
    }

    // showNewBook = (book)=>{
    //     return(
    //        book.post?
    //          <div className='conf_link'>
    //             Click to <Link to={`/book/${book.bookId}`}> See New Book</Link>
    //          </div>
    //         :null
    //     )
    // }

    // handleInpt = (event,name)=>{
    //     const formdata = {...this.state.formdata};//grab old data
    //     formdata[name] = event.target.value;//update form data
    //     this.setState({
    //         formdata
    //     });
    // }
   
    submitForm = (e) =>{

        e.preventDefault();

    }

    render() {
        return (
            <div className='rl_container article'>
                <form onSubmit={this.submitForm}>

                    <h2>Edit review</h2>
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
                <button type='submit'>Edit Review</button>
                <div className='delete_post'>
                    <div className='button'>
                        Delete Review
                    </div>
                </div>
               
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
export default connect(mapStateToProps)(EditBook);