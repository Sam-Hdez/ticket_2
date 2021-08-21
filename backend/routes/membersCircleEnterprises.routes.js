const express = require('express');
const router = express.Router();

const membersCircleEnterprisesController = require('../controllers/membersCircleEnterprises.controller');

router.get('/',
    membersCircleEnterprisesController.getMemberCircleEnterprises
);

router.get('/:id',
    membersCircleEnterprisesController.getMemberCircleEnterpriseById
);

router.post('/',
    membersCircleEnterprisesController.createMemberCircleEnterprise
);

router.put('/',
    membersCircleEnterprisesController.editMemberCircleEnterprise
);

router.delete('/',
    membersCircleEnterprisesController.removeMemberCircleEnterprise
);


module.exports = router;