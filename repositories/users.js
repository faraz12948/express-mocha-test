const User = require('../model/userMode');

const createUser = async user => {
    return await User.create(user);
};

const getUsers = async () => {
    const user = await User.findAll();
    return user;
};

const getUser = async id => {
    return await User.findByPk(id);
};

const updateUser = async (id, user) => {
    const response = await User.update(user, { where: { id: id } });
    console.log(response, "here");
    return response;
};

const deleteUser = async id => {
    return await User.destroy({ where: { id: id } });
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
