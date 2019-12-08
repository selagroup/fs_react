
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
