const  express = require('express')
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();


router.post('/',async (req,res) =>{


    console.log(req.body);

    const user = await User.findOne({'email':req.body.email});
    if(!user) return res.json({
        isAuth:false,
        message: 'Email Invalid login'
    });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) return  res.json({
        isAuth:false,
        message: 'Invalid login'
    });

   //generate token
   user.generateAuthToken( (err,user) =>{

        if(err) return res.status(400).send(err);

        res.cookie('auth',user.token).json({
            isAuth:true,   
            id: user._id,
            email: user.email
        })
   });
  

});

module.exports = router;
