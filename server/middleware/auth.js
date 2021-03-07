const jwt = require('jsonwebtoken');
const {User} = require('../models/user');


module.exports = function (req, res, next) {
  const token = req.cookies.auth; 

  if (!token) return res.json({ error:true});

  try {

    User.verifyToken(token, (err,user) =>{

        if(err) throw err;

        if(!user) return res.json({ error:true });

        req.token = token;
        req.user = user;
        next();
    });
  }
  catch (ex) {
    console.log(`Verifying Token Error : ${ex}`);
    res.status(400).send('Invalid token.');
  }
}