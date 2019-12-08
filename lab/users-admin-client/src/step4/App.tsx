import React, { useState, useEffect } from 'react'
import User from './users/components/User'
import EditUser from './users/components/EditUser';
import UsersApi from './api/users'
import { UserModel } from './models/User';
import UserList from './users/components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {

    const [userList, setUserList] = useState<UserModel[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserModel>();
    const [editUser, setEditUser] = useState<UserModel  >();
    
    useEffect(()=> {
        UsersApi.getUsers()
            .then( data => setUserList(data));
        
    }, [])
    
    const saveEditUser = () => {
        editUser && UsersApi.updateUser(editUser)
            .then( () => {
                const updatedList = userList.map( u =>{
                    if(editUser && u.id === editUser.id){
                        return editUser;
                    }
        
                    return u;
                });
                setSelectedUser(editUser);
                setUserList(updatedList);
            });
    }

    const editUserChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const updatedUser = {
            ...editUser,
            [e.target.name]: e.target.value
        }

        setEditUser(updatedUser as UserModel);
    }

    const handleSelection = (selected: UserModel) => {
        setSelectedUser(selected);
        setEditUser(selected);
    }
    
    let style = {
        width: '600px',
        margin: `10px auto`
    }
    return (
        <div style={style}>
            <h1> User Admin </h1>
            <div className="row">
                <div className="col-xs-12 col-sm-8 list-group">
                    <UserList users={ userList } selected={handleSelection} />
                </div>
                <div className="col-xs-12 col-sm-4">
                    <EditUser 
                        user = {editUser}
                        save={saveEditUser}
                        onChange={editUserChange} />
                </div>
            </div>
        </div>
    )
    
}

export default App;
