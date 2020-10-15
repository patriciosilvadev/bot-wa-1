const express = require('express');
const authMiddlewares = require('./authMiddlewares');


const router = express.Router();
router.use(authMiddlewares);

router.get('/', (req,res) => {

    res.send({ ok: true, UserId: req.UserId });
})

module.exports = app => app.use('/project', router);