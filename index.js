const venom = require('./src/connect');
const {connect} = venom;
const { isEmpty } = require("lodash");
const {Viewers}  = require("./src/model");
var CronJob = require('cron').CronJob;
var http = require('./src/http');
const configs = require('./global-config')


var job = new CronJob('*/5 * * * * *', async function() {
  var nowuser = await nowusers()
  var afteruser = await afterusers()
  if(afteruser.status !== 400)
  {
    if(afteruser.length > nowuser.length)
    {
      // foi deletado um user do banco
      console.log('afte > now')
    }
    if(afteruser.length < nowuser.length)
    {   
      console.log('afte < now')
        // foi add um user no banco 
      for(var cont = 0 ; cont <= nowuser.length -1 ;cont++)
      {
        if(isEmpty(afteruser[cont]))
        {
          await Viewers.UpdateAfterUsers(nowuser[cont]);
          connect(nowuser[cont].cliente)
            .then((client) => {start(client)})
            .catch((erro) => {
              console.log(erro);
            });
        }
      }
    }
  }else
  {
    for(var cont = 0 ; cont <= nowuser.length -1 ;cont++)
    {
      await Viewers.UpdateAfterUsers(nowuser[cont])
      connect(nowuser[cont].cliente)
      .then((client) => {start(client)})
      .catch((erro) => {
        console.log(erro);
      });
      
    }
  }
}, null, true, 'America/Sao_Paulo');
job.start();


var jobH = new CronJob('* 0 * * * *', async function() {

  var afteruser = await afterusers()
  for(var cont = 0 ; cont <= afteruser.length -1 ;cont++)
  {

    connect(afteruser[cont].cliente)
    .then((client) => {start(client)})
    .catch((erro) => {
      console.log(erro);
    });
  }
}, null, true, 'America/Sao_Paulo');
jobH.start();


void async function() {
  var user = await afterusers()
  for(var cont = 0 ; cont <= user.length ;cont++)
  {
      connect(user[cont].cliente).then((client) => {start(client)})
        .catch((erro) => {
        console.log(erro);
      });
  } 
  
}()

async function nowusers()
{
  var users = await Viewers.SelectUser()
  return users
}
async function afterusers()
{
  var users = await Viewers.selectAfterUsers()
  return users
}


function start(client) {
  //console.log(client)
  client.onMessage((message) => {
    if (message.body === 'QR' && message.isGroupMsg === false) {
      client
        //.sendText(message.from, 'Isso ai continua mandando hi !!')
        .sendImage(
          message.from,
          `./rogerio.png`,
          `rogerio`,
          'teste de imagem'
        )
        .then((result) => {
         // console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}
