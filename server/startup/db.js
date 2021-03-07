const mongoose = require('mongoose');
const config = require('../config/config').get(process.env.NODE_ENV);


module.exports = async function(){

    await mongoose.connect(config.DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: false,
        useFindAndModify:false
    }).then( () =>{ console.log(`DATABASE CONNECTION ESTABLISHED SUCCESSFULLY`)})
    .catch( err => console.log(`Database error: ${err}`));

}