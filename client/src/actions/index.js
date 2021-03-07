import axios from 'axios';

export  function login({email,password}){

    const request =  axios.post('/api/login',{email,password})
                    .then( response => response.data);
            
    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/users/auth').then( response => response.data );
    return{
        type:'AUTH_USER',
        payload:request
    }
}

export function getUsers (){

    const request = axios.get('/api/users').then( response => response.data)
    return{
        type:'ALL_USERS',
        payload:request
    }

}
export function regUser(user,userlist){

    const request = axios.post('/api/users',user);

    return ( dispatch) =>{
           request.then( ({data}) => {
             let users = data.success? [...userlist,data.user]:userlist;
             let response ={
                 success: data.success,
                 users
             }

             dispatch({
                 type:'USER_REGISTER',
                 payload:response
             })

           })
    }

}

export function addbook(book){
    const request = axios.post('/api/books',book).then(response=>response.data);
    return{ type:'ADD_BOOK',payload:request}
}

export function clearnewbook(){
    return{
        type:'CLEAR_NEWBOOK',
        payload:{}
    }
}

export function getUserPosts(userId){
    const request = axios.get(`/api/users/${userId}/posts`).then(response => response.data);
    console.log(request);
    return{ 
        type:'GET_USER_POSTS', 
        payload:request
    }
}

export  function getBook(){

}
export  function updateBook(){}
export  function deleteBook(){}
export  function clearBook(){}

export async function getBooks(
    limit=10,
    start=0,
    order ='asc',
    bookList = ''
    ){

    const urlStr = `/api/books?skip=${start}&limit=${limit}&order=${order}`;

    const request = await axios.get(urlStr).then( response => {
        // bookList ?  [...bookList,...response.data] : response.data ;
        if(bookList){ return [...bookList,...response.data] }else{ return response.data}
    })

    return {
        type:'GET_ALL_BOOKS',
        payload :request
    }
}


export  function getBookWithReviewer(id){

    const req =  axios.get(`/api/books/${id}`);

    return (dispatch) =>{
          req.then( ({data}) =>{

            let book = data;

            axios.get(`/api/users/${book.ownerId}`)
                             .then( ({data}) =>{

                                let response ={
                                    book,
                                    reviewer:data
                                }
                      
                                dispatch({

                                    type:'GET_BOOK_W_REVIEWER',
                                    payload: response

                                });
                             });

         } )
    }

}

export function clearBookWithReviewer(){
    return{
        type:'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book:{},
            reviewer:{}
        }
    }
}