import { UserModel } from "../models/User";

const USERS_API_URL = `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_API_USERS_PREFIX}`;

const handleResponse=(res: Response) => {
    if(res.ok){
        return res.json().then( r =>{
             return r.data
            });
    }

    throw new Error(res.statusText);
}



const callAPI = (url: string, options: RequestInit | undefined = undefined ) => {

    return fetch(url, options)
        .then(handleResponse);
}

const UsersApi = {
    getUsers() {
        return callAPI(USERS_API_URL);
    },
    updateUser(user: UserModel) {
        const url = `${USERS_API_URL}/${user.id}`
        return callAPI(url, {
                 method:'PUT',
                 headers:{
                     "Content-Type":'application/json',
                 },
                 body:JSON.stringify(user)
            });
    },
}
export default UsersApi
