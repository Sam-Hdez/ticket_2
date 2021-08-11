const { CreateTables } = require('../controllers/createtables.controller');

async function models() {
    CreateTables();
}

module.exports = {
    models,
}