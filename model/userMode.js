const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: 'localhost',
    dialect: 'postgres'
});
try {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        }).catch(error => {
            console.error('Unable to connect to the database:', error);

        })

} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const User = sequelize.define('users_v3s', {

    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },

});
sequelize.sync();

module.exports = User;
