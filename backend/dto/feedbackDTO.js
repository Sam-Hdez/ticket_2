const Joi = require('joi');

class FeedbackDTO {
    post = Joi.object().keys({
        user_id: Joi.number().greater(-1).required(),
        points: Joi.number().greater(-1).required(),
        feedback: Joi.string().max(255).required(),
        relation_circle_id: Joi.number().greater(-1).required(),
        skill_id: Joi.number().greater(-1).required()
    });

    put = Joi.object().keys({
        feedback_id: Joi.number().greater(-1).optional(),
        points: Joi.number().greater(-1).optional(),
        feedback: Joi.string().max(255).optional(),
        visibility: Joi.boolean().optional(),
        is_general_feedback: Joi.number().greater(-1).optional(),
        relation_circle_id: Joi.number().greater(-1).optional(),
        skill_id: Joi.number().greater(-1).optional()
    });

    delete = Joi.object().keys({
        feedback_id: Joi.number().greater(-1).required()
    });

    get = Joi.object().keys({
        feedback_id: Joi.number().greater(-1).required()
    });
}

module.exports = {
    FeedbackDTO
}