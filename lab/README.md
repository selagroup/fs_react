# Full Stack React + Node.js User Admin Lab

# Node.js

## step 0 - Setup the server
```sh
npx express-generator-typescript "user-admin-api"
```
## step 0.5 - install packages 
- cd into the project folder and install the following packages
```sh
npm install cors http-errors @types/cors @types/http-errors
``` 

## step 1 

### use the mockdb and update port
- update the `src\daos\MockDb\MockDb.json` file :
``` json
{
  "users": [
    {
      "usernname": "Sean Maxwell",
      "email": "sean.maxwell@gmail.com",
      "id": 159123164363
    },
    {
      "username": "Gordan Freeman",
      "email": "gordan.freeman@halflife.com",
      "id": 906524522143
    },
    {
      "username": "John Smith",
      "email": "jsmith@yahoo.com",
      "id": 357437875835
    }
  ]
}
```
- update the `src\entities\User.ts` interface and class defenition, change name to username:
```ts

export interface IUser {
    id?: number;
    username: string;
    email: string;
}

export class User implements IUser {

    public id?: number;
    public username: string;
    public email: string;

    constructor(nameOrUser: string | IUser, email?: string) {
        if (typeof nameOrUser === 'string') {
            this.username = nameOrUser;
            this.email = email || '';
        } else {
            this.username = nameOrUser.username;
            this.email = nameOrUser.email;
        }
    }
}

```
- Under `src\env` update the `developent.env` variable `PORT` value to differetn port value.


## step 2 

### create a controller

- Under `src\shared` folder create a new `apiResponse.ts` file that will include an interface and factory functions for generating a unified reponse object.

```ts
export interface IApiResponse {
    data: any;
    error: string | undefined;
    errorCode: number;
}
export const ApiResponse = {
    OK(data: any): IApiResponse {
        return  {
            data,
            error: undefined,
            errorCode: 0,
        };
    },
    ERROR(error: string, errorCode: number): IApiResponse {
        return {
            data: undefined,
            error,
            errorCode,
        };
    }
}
```
- add an export to the `src\shared\index.ts`:
```ts
... 
    export * from './apiResponse';
...
```
- Create a new `users.controller.ts` file under a new `src\controllers` folder :
```ts
import { UserDao } from '@daos';
import { logger } from '@shared';
import { Request, Response } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ApiResponse } from '@shared';
import createHttpError = require('http-errors');

const userDao = new UserDao();

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await userDao.getAll();
        return res.send( ApiResponse.OK(users) );
    } catch (err) {
       throw createHttpError(BAD_REQUEST);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user  = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        user.id = Number(user.id);
        await userDao.update(user);
        return res.send(ApiResponse.OK(user));
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
};

```

## step 3

### setup routes

- Update the user routes file under `src\routes\User.ts` to use the controller methods:
```ts

import { Router, Express } from 'express';
import * as UserController from '../controllers/users.controller';

const router = Router();
router.get('/', UserController.getUser  );
router.post('/', UserController.createUser );
router.put('/:id', UserController.updateUser);

export default router;

``` 
## step 4 
### update error handler, catch all route and setup cors
- add the cors middleware to the `src\Server.ts` file, add the import:
```ts
    import cors from 'cors';
```
- Then use the middleware, add add to the top of the middlwares used.
```ts
app.use(cors());
```
- In the `src\Server.ts` file update the catch all route to throw a 404 error.
```ts
...
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
        next(createHttpError(NOT_FOUND));
    });
... 
```
- In the `src\Server.ts` create a new error handling middleware that responsds with an api error response
```ts
...
    
    app.use( (err: HttpError & Error, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode).json( ApiResponse.ERROR(err.message, err.statusCode));
    });

...
```

## Step 5

### Run the server
- run the server:
```sh
npm run start:dev
```
- open postman and test.



# React

## step 0 - Setup the client

### create react app

- download node and npm
- create your app
    ```sh
    npx create-react-app <app-name> --typescript
    ```
- run the app for the first time.
    ```sh
    cd <app-name>
    npm start
    ```

## step 0.5

- in order to make the ui more friendly and neat i will use a third party css package call `bootstrap`
- add `bootstrap` to your application by run:
    ```sh
    yarn add bootstrap
    ```
- on the `App.ts` add the `bootstrap` css:
    ```jsx
    import 'bootstrap/dist/css/bootstrap.min.css';
    ```

## step 1

### create your first component

- under `src` create new folder, `users`. on that folder create new folder `components` (`src/users/components`).
- in this folder create  `User.ts` file:

```tsx
/* src/users/components/User.tsx */
import React from 'react'
const User: React.FC = () => {
    return (
        <div className="item">
            <div>
                id:1
            </div>
            <div>
                username:johndoe
            </div>
            <div>
                email:johndoe@gmail.com
            </div>
        </div>
    )
}

export default User;

```

- on the `src/users` create new folder `styles`.
- in this folder create new `css` file `items.css`.

```css
/* src/users/styles/item.css */
.item{
   width: 300px;
   border-radius: 10px;
   border: solid 1px lightgray;
   padding: 10px;
}
```

- in `User` component, add the item `css`

```tsx
/* src/users/components/User.tsx */
import React, { Component } from 'react'
import '../style/item.css'
...
```

- in `App.ts` file, import the `User` element.

```jsx
/* src/App.tsx */
import User from 'users/components/User'
```

- remove all the `jsx` that return from the `render` function and return the `User` Element

```tsx
/* src/App.tsx */
...
    return (
        <User/>
    )
...
```

## step 2

### pass data from root component to child component.

- create a new `User` interface. under the `src`create a new folder `models`.
- Inside this folder create a new `User.ts` file that contains the interface defenition.
```typescript
    export interface UserModel {
        id: number;
        username: string;
        email: string;
    }
```

- declare the properties that `User` component going to use by adding a new `UserProps` interface.
    - add at the beginning of `User` file:
        ```tsx
            export interface UserProps {
            user: UserModel
            }
        ```
- on the `User.tsx` file change the hard coded id, username and email to the one that came from the prop
```tsx
...
    <div className="user-item">
            <div>
                id:{props.user.id}
            </div>
            <div>
                username:{props.user.username}
            </div>
            <div>
                email:{props.user.email}
            </div>
        </div>
...
```
- under the `src\users\components\` create a new file `EditUser.tsx` and create a new component
```tsx
import React from 'react'
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
```
- this component renders a form that will enable editing the user details.
- this is a controlled component that it's state controllerd by it's parent component, as it expects the parent the handle the change adn submit events.
- notice the `onChange` and `save` props are expecting callback functions.
- on the `App.tsx` file create a 2 new hooks at the top of the function, to handle the state of the form.
```tsx
    const [selectedUser, setSelectedUser] = useState<UserModel>(user);
    const [editUser, setEditUser] = useState<UserModel  >(user);
```
- for now initialize them both with a hardoced `UserModel`.
- create 2 event handlers for the change and save events emitted by the `EditUser` component.
```tsx
...
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
...
```
- on the `App.tsx` update the jsx generated by the component ot include the `User` and `EditUser` components
- make sure to pass the new state values and event handlers to the appropriate components

```tsx
...
    <div >
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
...
```

## step 3 
### rendering lists
- under the `src\users\components\` create a new file `UserList.tsx` and create a new component
```tsx
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
```
- this component renders a list of `UserModel` recieved as props and dispatch a select event when clicking on an item.
- to handle the current selection the component is implementing a `useState` for keeping the state of the selected item index.
- on the `App.tsx` file create a new state hook and an effect hook at the top of the function, to handle the state of the user list items.
```tsx
... 
    const [userList, setUserList] = useState<UserModel[]>([]);

    useEffect(()=> {
        const users = [
            {
                id: 1,
                username: 'johndoe',
                email: 'johndoe@gmail.com',
            },
            {
                id: 2,
                username: 'janedoe',
                email: 'janedoe@gmail.com',
            },
            {
                id: 3,
                username: 'johnsmith',
                email: 'johnsmith@gmail.com',
            },
            {
                id: 4,
                username: 'janesmith',
                email: 'janesmith@gmail.com',
            }
        ]
        setUserList(users);
    }, []);
...
```
- For now we are just using a hard coded list but in the next step we will update it to be fetched from a server.
- Add a list selection handler that will set the state of the selected and edited user to the selected item:
```tsx
...
    const handleSelection = (selected: UserModel) => {
        setSelectedUser(selected);
        setEditUser(selected);
    }
...
```
- Update the `App.tsx` jsx, replace the User component with the UserList component and pass the appropriate props:
```tsx
...
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
...
```

 



## step 4
### fetching data from remote.

- under `src` folder create a `.env` file to hold environment variables:
```env
REACT_APP_API_BASE_URL="http://<nodejs server>/api"
REACT_APP_API_USERS_PREFIX="users"
```
- the url should direct to node js server you built eariler.
- under `src` create a new folder `src\api` and insider create a file `users`:
```ts
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

``` 
-  This module uses the browser's built-in `fetch` api to call the api server with get and put requests.
-  For the url we are using envionment variables that are replaced in build time with the values in the `.env` file.
- on the `App.tsx` file update the user list to use the newly created api to fetch and display the user list from the server:
```tsx
...
useEffect(()=> {
        UsersApi.getUsers()
            .then( data => setUserList(data));
        
    }, [])
...
```
- Also update the handler to call the `updateUser` on the server:
```tsx
...
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
...
```
- done! congratulations your a full stack ninja.  :)





