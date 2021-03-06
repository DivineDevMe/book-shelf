export default function(state={}, action){
    switch (action.type) {
        case 'GET_ALL_BOOKS':  
            return {...state,list:action.payload}
        case 'GET_BOOK_W_REVIEWER':
            return {
                ...state,
                book:action.payload.book,
                reviewer:action.payload.reviewer
            }
        case'ADD_BOOK':
            return {...state,newbook:action.payload}
        case'CLEAR_NEWBOOK':
            return {...state,newbook:action.payload}
        case 'CLEAR_BOOK_W_REVIEWER':
            return {
                ...state,
                book:action.payload.book,
                reviewer: action.payload.reviewer
            }
        default:
            return state
    }
}