const { CreateTableUsers, LoadingOneAdmin } = require('../models/users.model');
const { CreateTableEnterprises } = require('../models/enterprises.model');
const { CreateTableAddresses } = require('../models/addresses.model');
const { CreateTableDegrees } = require('../models/degrees.model');
const { CreateTableHobbies } = require('../models/hobbies.model');
const { CreateTableCatalogs } = require('../models/catalogs.model');
const { CreateTableElementsCatalogs } = require('../models/elementsCatalogs.model');
const { CreateTableUserCircles } = require('../models/userCircles.model');
const { CreateTableMembersCircleEnterprises } = require('../models/membersCircleEnterprises.model');
const { CreateTableSkills } = require('../models/skills.model');
const { CreateTableFeedbacks } = require('../models/feedbacks.model');
const { CreateTableHirings } = require('../models/hirings.model');
const { CreateTableApplies } = require('../models/applies.model');


async function CreateTables() {
    CreateTableUsers();
    LoadingOneAdmin();
    CreateTableEnterprises();
    CreateTableAddresses();
    CreateTableDegrees();
    CreateTableHobbies();
    CreateTableCatalogs();
    CreateTableElementsCatalogs();
    CreateTableUserCircles();
    CreateTableMembersCircleEnterprises();
    CreateTableSkills();
    CreateTableFeedbacks();
    CreateTableHirings();
    CreateTableApplies();
}

module.exports = {
    CreateTables
}