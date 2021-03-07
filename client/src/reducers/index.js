import {combineReducers} from 'redux';
import books from './book';
import users from './user';

const rootReducers = combineReducers({
    books,
    users
});

export default rootReducers;