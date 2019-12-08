import React from 'react'
import PropTypes from 'prop-types'
import '../styles/item.css';
import { UserModel } from '../../models/User';

export interface EditUserProps {
    user?: UserModel
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    save: () => void

}
const EditUser = (props: EditUserProps) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.save();
    }
    const { user } = props; 
    return (
        <form onSubmit={onSubmit} className="item">
            <legend>Edit User id:{user ? user.id : ''}</legend>
            <div className="form-group">    
                <label htmlFor="username">username</label>
                <input type="text" name="username" className="form-control" id="username"
                    value={user ? user.username : ''}
                    onChange={props.onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">email</label>
                <input type="text" name="email" className="form-control" id="email"
                    value={user ? user.email : ''}
                    onChange={props.onChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>

    )
}

// EditUser.propTypes = {
//     id: PropTypes.number.isRequired,
//     username: PropTypes.string,
//     email: PropTypes.string,
//     onChange: PropTypes.func,
//     save: PropTypes.func,
// }

export default EditUser;