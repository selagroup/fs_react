import React, { useState } from 'react'
import { UserModel } from '../../models/User'
import User from './User';

export interface UserListProps {
    users: UserModel[]; 
    selected?: (selectedItem: UserModel) => void;
}
const UserList: React.FC<UserListProps> = (props: UserListProps) => {

    const [selectedIndex, setSelectedIndex] = useState(-1);  
    const {users = [],selected} = props;
    
    const handleSelection =  (index: number, user: UserModel) => {
        setSelectedIndex(index);
        selected && selected(user);
    }

    return (
        <ul className="list-group">
                {users
                    .map((u, inx) => {
                        
                        const active = inx === selectedIndex ? "active" : "";

                        return (<li key={u.id}
                            onClick={() => handleSelection(inx,u)}
                            className={`list-group-item ${active}`}
                        >
                            <User user={u} />
                        </li>);
                })}
        </ul>
    )

}

export default UserList;