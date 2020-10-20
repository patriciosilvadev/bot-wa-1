const express = require('express');
const authMiddlewares = require('./authMiddlewares');
const {Viewers} = require('./model')


const router = express.Router();
router.use(authMiddlewares);

router.get('/', async (req,res) => {
    const responses = await Viewers.VerifyResponses(req.query)
    const responsesVerify = 0;
    return res.send({ ok: true, UserId: req.UserId, responses: responses});
})

router.post('/newResponse', async (req,res) => {
    var body = req.body;
    const require = await Viewers.CreateNewResponses(body)
    return res.send({ ok: true, body: body, require: require})
})

router.post('/deleteResponse', async (req,res) => {
    const require = await Viewers.DeleteResponses(req.body)
    if(require)
    {
        if(require.msg == "OK")
        {
            return res.send({ ok: true, result: require });
        }else
        {
            if(require.msg == "Ops...")
            {
                return res.send({ msg: "Ops...", status: 400});
            }
            if(require.msg == "NÃO INCLUÍDO")
            {
                return res.send({ msg: "NÃO INCLUÍDO", status: 400});
            }
        }
    }else
    {
        res.send({ ok: false, result: require });
    }
})

module.exports = app => app.use('/project', router);