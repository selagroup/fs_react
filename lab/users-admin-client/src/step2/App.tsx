import React, { useState, useEffect } from 'react'
import User from './users/components/User'
import EditUser from './users/components/EditUser';
import UsersApi from './api/users'
import { UserModel } from './models/User';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState<UserModel>();
    const [editUser, setEditUser] = useState<UserModel  >();
    
    useEffect(()=> {
        const usr = UsersApi.getUserByIdSync(1);
        setSelectedUser(usr);
        setEditUser(usr);
    }, [])
    
    const saveEditUser = () => {
        setSelectedUser(editUser);
    }

    const editUserChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const updatedUser = {
            ...editUser,
            [e.target.name]: e.target.value
        }

        setEditUser(updatedUser as UserModel);
    }
    
    let style = {
        width: '600px',
        margin: `10px auto`
    }
    return (
        <div style={style}>
            <h1> User Admin </h1>
            <div className="row">
                <div className="col-xs-12 col-sm-8">
                    {selectedUser ?  <User user={selectedUser} /> : null }
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
