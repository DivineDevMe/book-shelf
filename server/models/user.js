const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;


const Schema = mongoose.Schema;
const userSchema = new Schema({

    email:{

        type:String,
        required: true,
        trim:true,
        unique:1

    },
    password:{

        type:String,
        required:true

    },
    name:{
        type: String,
        required:true,
        maxlenght:100
    },
    lastname:{

        type: String,
        required:true,
        maxlenght:100
    },
    role:{

        type:Number,
        default:0
    },
    token:{
        type:String
    }


});

userSchema.pre('save',function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,(err, salt)=>{
            if(err) return next(err);
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{ next()}
});


userSchema.methods.generateAuthToken = function(cb){
    let user = this;
    const token =  jwt.sign({ _id:this._id},config.SECRET);

    this.token = token;

    this.save((err,user) =>{
        if(err) return cb(err);
        cb(null,user);
    })
}


userSchema.statics.verifyToken = function(token,cb){
    const user = this;
    jwt.verify(token,config.SECRET,function(err,decoded){

        user.findOne({ '_id': decoded, 'token':token},function(err,user){
           if(err) return cb(err);
           cb(null,user);
        })
    })
}

userSchema.methods.deleteToken = function(token,cb){

    this.update({ $unset:{token:1 }}, function(err,user){
        if(err) return cb(err);
        cb(null,user);
    });
}

const User = mongoose.model('User',userSchema);


module.exports = {User}