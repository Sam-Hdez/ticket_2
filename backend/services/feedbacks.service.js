const { Feedback } = require('../models/feedbacks.model');

const newfeedback = async(data) => {
    try {
        let new_feedback = new Feedback(data);
        await new_feedback.createFeedback();
        return new_feedback;
    } catch (error) {
        throw new Error('Error en la función newfeedback: ' + error.message)
    }
}

const editfeedback = async(data) => {
    try {
        let status_feedback = new Feedback(data);
        await status_feedback.updatefeedback(data.feedback_id, data);
        return status_feedback;
    } catch (error) {
        throw new Error('Error en la función editfeedback: ' + error.message)
    }
}

const deletefeedback = async(data) => {
    try {
        let status_feedback = new Feedback(data);
        await status_feedback.deleteFeedback(data.feedback_id);
        return status_feedback;
    } catch (error) {
        throw new Error('Error en la función deletefeecback: ' + error.message)
    }
}

const feedbackById = async(data) => {
    try {
        let feedback = await getFeedbackById(data);
        return feedback;
    } catch (error) {
        throw new Error('Error en la función feedbackById: ' + error.message)
    }
}

module.exports = {
    newfeedback,
    editfeedback,
    deletefeedback,
    feedbackById
}