const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('../routes/user');
const books = require('../routes/book');
const loginAuth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function(app,express){
    //middlewares on demand
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static('client/build'));

    //routes
    app.use('/api/login',loginAuth );
    app.use('/api/users',users);
    app.use('/api/books',books);
    
    app.use(error);
}