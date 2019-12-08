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
const UsersApi = {
    getUserByIdSync(id: number) {
        return users.find((u) => id === u.id);
    },
    getUsersSync() {
        return users;
    }
}
export default UsersApi
