const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
