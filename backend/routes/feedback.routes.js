const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { FeedbackController } = require('../controllers/feedback.controller');
const { FeedbackMiddleware } = require('../middlewares/feedback.middleware');
const { UserInSession } = require('../middlewares/user.middleware');

const feedbackMiddleware = new FeedbackMiddleware();
const feedbackController = new FeedbackController();

/* POST http://localhost:3000/feedback/ */
router.post('/create',
    /*cors(corsOption),*/
    UserInSession,
    feedbackMiddleware.validateCreateFeedback,
    feedbackController.CreateFeedback
);

/* GET http://localhost:3000/feedback/ */
router.put('/update',
    /*cors(corsOption),*/
    UserInSession,
    feedbackMiddleware.validateEditFeedback,
    feedbackController.UpdateFeedback
);

/* DELETE http://localhost:3000/feedback/ */
router.delete('/drop',
    /*cors(corsOption),*/
    UserInSession,
    feedbackMiddleware.validateDeleteFeedback,
    feedbackController.DeleteFeedback
);

/* PUT http://localhost:3000/feedback/ */
router.get('/list-all',
    /*cors(corsOption),*/
    UserInSession,
    feedbackMiddleware.validateGetFeedback,
    feedbackController.feedbackbyid
);

module.exports = router;