const express = require('express')
const app = express()
const configs = require('../global-config')
const port = configs.http_port
const jose = require('jose')
const bcrypt = require('bcryptjs')
const {Viewers} = require('./model')
const bodyParse = require('body-parser')


app.use(express.static('public'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));

app.post('/register', async (req, res) => {
  try
  {
    console.log(req.body)
    var verify = await Viewers.VerifyUser(req.body);
    console.log(verify)
    if(verify.msg == 'Ok'){
      verify = await Viewers.VerifyPhone(req.body);
      if(verify.msg == 'Ok'){
        var hash = await bcrypt.hash(req.body.password,10);
        req.body.password = hash;
        var crypt = req.body
        var obj = await Viewers.createNowUsers(crypt);
        return res.send({obj});
      }else{
        return res.send({phone: "exist"});
      }
    }
    else{
      return res.send({user: "exist"});
    }
    
  }catch(err)
  {
    return res.status(400).send({error: 'Resgirter fail' })
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})