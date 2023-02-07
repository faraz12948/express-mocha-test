const UserRepository = require('../repositories/users');

const createUser = async user => {
    return await UserRepository.createUser(user);
};

const getUsers = async () => {
    return await UserRepository.getUsers();
};

const getUser = async id => {
    return await UserRepository.getUser(id);
};

const updateUser = async (id, user) => {
    return await UserRepository.updateUser(id, user);
};

const deleteUser = async id => {
    return await UserRepository.deleteUser(id);
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
