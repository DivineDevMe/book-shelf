export default function(state={}, action){
    switch (action.type) {
        case 'USER_LOGIN':
            return {...state,login:action.payload}
        case 'AUTH_USER':
            return {...state,login:action.payload}
        case 'GET_USER_POSTS':
            return {...state,userposts:action.payload}
        case 'ALL_USERS':
            return {...state,userslist:action.payload}
        case 'USER_REGISTER':
            return {...state,
                registered:action.payload.success,
                userslist:action.payload.users
            }
        default:
            return state
    }
}
