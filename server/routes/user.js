const express = require('express');
const _ = require('lodash');
const {User} = require('../models/user');
const {Book} = require('../models/book');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/',async (req,res)=>{

    const users = await User.find();
    if(!users) return res.status(400).json({ error:true, message:'No users found'});
    res.json(users);

});
router.get('/auth',auth,(req,res)=>{
   res.json({
       isAuth:true,
       id: req.user._id,
       name:req.user.name,
       lastname: req.user.lastname,
       email:req.user.email
   });
});
router.get('/logout',auth ,(req,res) =>{

   req.user.deleteToken(req.token, (err,user)=>{
       
       if(err) return res.status(400).send(err);

       res.sendStatus(200);
   });
});

router.get('/:id',  async (req,res) =>{

    //const id = req.query.id;
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send('user not found!');

    res.json(_.pick(user,['name','lastname']));

});
router.get('/:id/posts',async (req,res)=>{

    const posts = await Book.find({ ownerId : req.params.id  });
    if(!posts) return res.status(400).send('No post found!');

    res.json(posts);
});


router.post('/',async (req,res)=>{

    const user = await new User(req.body).save();

    if(!user) return res.status(400).json({
        success:false
    });

    res.json({
        success:true,
        user
    });

});
router.put('/:id',(req,res)=>{

});
router.delete('/:id',(req,res)=>{

});


module.exports = router;