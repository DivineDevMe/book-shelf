const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const bookSchema = new Schema({

    name:{
        type:String,
        required:true,
        maxlenght:100
    },
    author:{
        type:String,
        required:true,
        maxlenght:100
    },
    review:{
        type:String,
        default:'n/a',
    },
    pages:{  
        type:String,
        default:'n/a',
    
    },
    ratings:{ 
        type:Number,
        max:5,
        min:1,
        default:'n/a'
    },
    price:{
        type:String,
        default:'n/a'
    },
    ownerId:{
        type:String,
        required:true,
       
    }

},{timestamps:true});

const Book = mongoose.model('Book',bookSchema);

module.exports ={Book} ;