const express = require('express');
const router = express();

const userRoutes = require('./user.routes');
const enterpriseRoutes = require('./enterprise.routes');
const userCircleRoutes = require('./userCircle.routes');
const addressRoutes = require('./address.routes');
const skillRoutes = require('./skills.routes');
const membersCircleEnterprisesRoutes = require('./membersCircleEnterprises.routes');
const hobbyRoutes = require('./hobbies.routes');

router.get('/', (req, res) => {
    return res.status(200).json({ msg: `El servidor esta funcionando correctamente :D` });
});
router.use('/user', userRoutes);
router.use('/enterprises', enterpriseRoutes);
router.use('/usercircles', userCircleRoutes);
router.use('/address', addressRoutes);
router.use('/skill', skillRoutes);
router.use('/membersCircleEnterprises', membersCircleEnterprisesRoutes);
router.use('/hobby', hobbyRoutes);

module.exports = router;