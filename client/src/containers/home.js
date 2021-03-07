import React, { Component } from 'react';
import { connect } from "react-redux";
import { getBooks } from '../actions'
import BookItem from '../widgetUI/bookItem';

class HomeContainer extends Component {

     componentWillMount() {
        this.props.dispatch(getBooks(1,0,'desc'));
     }

     loadmore = () =>{
         let count = this.props.books.list.length;
        this.props.dispatch(getBooks(1,count,'desc',this.props.books.list));
    }

      renderitems = (books) =>{
         return(
             books.list ? books.list.map( (item,i) =>{
               return <BookItem {...item} key={i} />
             }) 
             : null
         )
     }
    render() {
        return (
            <div>
                {this.renderitems(this.props.books)}
                <div 
                onClick={this.loadmore}
                className='loadmore'
                >Load More</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}



export default connect(mapStateToProps)(HomeContainer)
