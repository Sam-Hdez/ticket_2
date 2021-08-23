const express = require('express');
const router = express();

const userRoutes = require('./user.routes');
const enterpriseRoutes = require('./enterprise.routes');
const userCircleRoutes = require('./userCircle.routes');
const addressRoutes = require('./address.routes');
const skillRoutes = require('./skills.routes');
const membersCircleEnterprisesRoutes = require('./membersCircleEnterprises.routes');
const hobbyRoutes = require('./hobbies.routes');
const degreeRoutes = require('./degree.routes');
// ESTAS RUTAS LAS COMENTE POR QUE AUN NO ESTAN IMPLEMENTADAS
//const catalogRoutes = require('./catalog.routes');
//const elementCatalogRoutes = require('./elementCatalog.routes');
//const feedbackRoutes = require('./feedback.routes');
//const hiringRoutes = require('./hiring.routes');
const { route } = require('./user.routes');

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
router.use('/degree', degreeRoutes);
// ESTAS RUTAS LAS COMENTE POR QUE AUN NO ESTAN IMPLEMENTADAS
//router.use('/catalog', catalogRoutes);
//router.use('/elementCatalog', elementCatalogRoutes);
//router.use('/feedback', feedbackRoutes);
//router.use('/hiring', hiringRoutes);

module.exports = router;