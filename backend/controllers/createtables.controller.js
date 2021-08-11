const { CreateTableUsers, LoadingOneAdmin } = require('../models/users.model');

async function CreateTables() {
    CreateTableUsers();
    LoadingOneAdmin();
}

module.exports = {
    CreateTables
}