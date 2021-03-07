require('express-async-errors');
const express = require('express');

//app variables
const app = express();

//getting startup files
require('./startup/db')();
require('./startup/routes')(app,express)

/**
 * This will be rendered by server in production for the home path /
 * this is one approach
 */
if(process.env.NODE_ENV === 'production'){
    const path = require('path')
    app.get('/*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


const port = process.env.PORT || 3001; 
app.listen(port, ()=>{ console.log(`Server listening to port ${port}`);});