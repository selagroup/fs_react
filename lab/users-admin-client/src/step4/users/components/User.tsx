import React from 'react'
import '../styles/item.css'
import { UserModel } from '../../models/User'

export interface UserProps {
   user: UserModel
}
const User: React.FC<UserProps> = (props: UserProps ) => {
    const { user } = props;
    return (
        <div className="item">
            <div>
                id: {user.id}
            </div>
            <div>
                username: {user.username}
            </div>
            <div>
                email: {user.email}
            </div>
        </div>
    )
}


export default User;