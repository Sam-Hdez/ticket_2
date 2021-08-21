const { CreateTables } = require('../controllers/createtables.controller');

async function models() {
    try {
        await CreateTables();
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    models,
}