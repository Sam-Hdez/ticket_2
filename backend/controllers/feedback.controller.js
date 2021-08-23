const { obtenerIdUsser } = require('../services/jwt.service');
const { newfeedback, editfeedback, deletefeedback, feedbackById } = require('../services/feedbacks.service')

async function CreateFeedback(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);

        let feedback = { user_id: user, points: req.body.points, feedback: req.body.feedback, relation_circle_id: req.body.relation_circle_id, skill_id: req.body.skill_id }
        let status_feedback = await newfeedback(feedback);
        res.status(200).json({ message: 'Feedback creado: ' + status_feedback });
    } catch (error) {
        res.status(502).json({ message: 'Error al crear el feedback: ' + error.message });;
    }
}

async function UpdateFeedback(req, res) {
    try {
        let feedback = { feedback_id: req.body.feedback_id, points: req.body.points, feedback: req.body.feedback, visibility: req.body.visibility, is_general_feedback: req.body.is_general_feedback, relation_circle_id: req.body.relation_circle_id, skill_id: req.body.skill_id }
        let status_feedback = await editfeedback(feedback);
        res.status(200).json({ message: 'Feedback actualizado: ' + status_feedback.feedback_id });
    } catch (error) {
        res.status(502).json({ message: 'Error al actualizar el feedback: ' + error.message });;
    }
}

async function DeleteFeedback(req, res) {
    try {
        let feedback = { feedback_id: req.body.feedback_id }
        let status_feedback = await deletefeedback(feedback);
        res.status(200).json({ message: 'Feedback eliminado' + status_feedback.feedback_id});
    } catch (error) {
        res.status(502).json({ message: 'Error al eliminar el feedback: ' + error.message });;
    }
}

async function feedbackbyid(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);
        let status_feedback = await feedbackById(user);
        res.status(200).json({ message: 'Lista de los feedback', data: status_feedback });
    } catch (error) {
        res.status(502).json({ message: 'Error al listar los feedbacks: ' + error.message });;
    }
}

module.exports = {
    CreateFeedback,
    UpdateFeedback,
    DeleteFeedback,
    feedbackbyid
}