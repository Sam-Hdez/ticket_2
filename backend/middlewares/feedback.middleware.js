const Joi = require('joi');
const { FeedbackDTO } = require('../dto/feedbackDTO');

const feedbackDto = new FeedbackDTO();

class FeedbackMiddleware {
    async validateCreateFeedback(req, res, next) {
        try {
            await Joi.attempt(req.body, feedbackDto.post);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateEditFeedback(req, res, next) {
        try {
            await Joi.attempt(req.body, feedbackDto.put);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateDeleteFeedback(req, res, next) {
        try {
            await Joi.attempt(req.body, feedbackDto.delete);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateGetFeedback(req, res, next) {
        try {
            console.log(req.params);
            await Joi.attempt(req.params, feedbackDto.get);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = {
    FeedbackMiddleware
}