const { sequelize, DataTypes, Op } = require('../db/conexion');
const { Users } = require('./users.model')
const { Skills } = require('./skills.model')
const { MembersCircleEnterprises } = require('./membersCircleEnterprises.model');

const Feedbacks = sequelize.define('feedbacks', {
    feedback_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visibility: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_general_feedback: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    relation_circle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MembersCircleEnterprises,
            key: 'relation_circle_id'
        }
    },
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Skills',
            key: 'skill_id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    underscored: true
});

class Feedback {
    constructor(data){
        this.user_id = data.user_id;
        this.relation_circle_id = data.relation_circle_id;
        this.skill_id = data.skill_id;
        this.points = data.points;
        this.feedback = data.feedback;
        this.visibility = data.visibility;
        this.is_general_feedback = data.is_general_feedback;
    }

    /**
     * Crea un nuevo elemento del feedback
     */
    async createFeedback() {
        try {
            const feedbackcreate = await Feedbacks.create ({
                user_id: this.user_id,
                relation_circle_id: this.relation_circle_id,
                skill_id: this.skill_id,
                points: this.points,
                feedback: this.feedback,
            });
            return feedbackcreate;
        } catch (error) {
            throw new Error('Error en la función createfeedback: ' + error.message);
        }
    }

    /**
     * Actualiza datos del feedback                                                                                                                              
     */
     async updatefeedback(id, data) {
        try {
            let feedback_status = await Feedbacks.update({
                user_id: this.user_id,
                relation_circle_id: this.relation_circle_id,
                skill_id: this.skill_id,
                points: this.points,
                feedback: this.feedback,
                visibility: this.visibility,
                is_general_feedback: this.is_general_feedback
            }, {
                where: {
                    feedback_id: id
                }
            });
            return feedback_status;
        } catch (error) {
            throw new Error('Error en la función updateFeedback: ' + error.message);
        }
    }

    /**
     * Borra un feedback
     * @param {number} id
     */
     async deleteFeedback(id) {
        try {
            let feedback_status = await Feedbacks.update({
                active: false,
            }, {
                where: {
                    feedback_id: id
                }
            });
            return feedback_status;
        } catch (error) {
            throw new Error('Error en la función deleteFeedback: ' + error.message);
        }
    }

    /**
     * Obtén el registro de un feedback por su id
     * @param {number} id
     */
    async getFeedbackById(id) {
        try {
            return Feedbacks.findOne({
                where: {
                    feedback_id: id,
                    active: true
                },
                attributes: {
                    exclude: [
                        'updated_at',
                        'created_at',
                        'active'
                    ]
                }
            });
        } catch (error) {
            throw new Error('Error en la función getFeedbackById: ' + error.message);
        }
    }
}

async function CreateTableFeedbacks() {
    try {
        await Feedbacks.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo Feedbacks: ${e.message}`);
    }
}

module.exports = {
    CreateTableFeedbacks,
    Feedbacks,
    Feedback
}