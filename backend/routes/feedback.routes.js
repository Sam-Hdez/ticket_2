const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const feedbackController = require('../controllers/feedback.controller');
const { feedbackMiddleware } = require('../middlewares/feedback.middleware');

const feedbackMiddleware = new feedbackMiddleware();

/* POST http://localhost:3000/feedback/ */
router.post('/create',
    /*cors(corsOption),*/
    feedbackMiddleware.validateCreateFeedback,
    feedbackController.createFeedback
);

/* GET http://localhost:3000/feedback/ */
router.get('/update',
    /*cors(corsOption),*/
    feedbackMiddleware.validateGetFeedback,
    feedbackController.getFeedback
);

/* DELETE http://localhost:3000/feedback/ */
router.delete('/drop',
    /*cors(corsOption),*/
    feedbackMiddleware.validateDeleteFeedback,
    feedbackController.removeFeedback
);

/* PUT http://localhost:3000/feedback/ */
router.put('/list-all',
    /*cors(corsOption),*/
    feedbackMiddleware.validateEditFeedback,
    feedbackController.editFeedback
);

module.exports = router;