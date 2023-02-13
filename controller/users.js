const UserService = require('../services/users');

const createUser = async (req, res) => {
    const user = req.body;
    const newUser = await UserService.createUser(user);
    res.status(201).json({
        message: 'User created successfully',
        data: newUser
    });
};

const getUsers = async (req, res) => {

    const users = await UserService.getUsers();
    res.status(200).json({
        message: 'Users retrieved successfully',
        data: users
    });
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    if (user !== null) {
        res.status(200).json({
            message: 'User retrieved successfully',
            data: user
        });
    } else {
        res.status(404).json({
            message: 'User not found',

        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await UserService.updateUser(id, user);
    res.status(200).json({
        message: 'User updated successfully',
        data: updatedUser
    });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(200).json({
        message: 'User deleted successfully'
    });
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
