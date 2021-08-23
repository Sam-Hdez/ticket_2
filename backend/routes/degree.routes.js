const express = require('express');
const router = express.Router();

const degreeController = require('../controllers/degrees.controller');

router.get('/',
    degreeController.getDegrees
);

router.get('/:id',
    degreeController.getDegreesById
);

router.get('/user/:id',
    degreeController.getDegreesByUserId
);

router.post('/',
    degreeController.createDegrees
);

router.put('/',
    degreeController.editDegrees
);

router.delete('/',
    degreeController.deleteDegrees
);


module.exports = router;