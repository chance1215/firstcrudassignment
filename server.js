const express = require('express');
const app = express()
const port = process.env.PORT||8000;
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());



app.post('/users',function(req,res){
  let guest = {
    name: req.body.name,
    email: req.body.email, //parseInt(req.params.age)
    state: req.body.state
  }
  let newData = fs.readFileSync('./storage.json',"utf8")
  let data = JSON.parse(newData)
  data.push(guest);
  console.log(newData)
  fs.writeFileSync('./storage.json', JSON.stringify(data));
  res.send(data)
})


app.get('/users',function(req, res){
  let allUsers = fs.readFileSync('./storage.json',"utf8")
  res.send(allUsers);
});

app.get('/users/:name' ,(req,res)=>{
let arr = fs.readFileSync('./storage.json' ,'utf8');
let content =JSON.parse(arr)
let result = content.filter(item => item.name === req.params.name)[0];
if(result){
  res.json(result)
}else{
  res.sendStatus(400)
  }
});

app.patch('/users/:name' ,(req,res)=>{
let update = fs.readFileSync('./storage.json','utf8');
let newUpdates = JSON.parse(update)
for(let i = 0; i < newUpdates.length; i++){
  if( newUpdates[i].name === req.params.name){
    newUpdates[i] = req.body;
  }
}
fs.writeFileSync('./storage.json', JSON.stringify(newUpdates));
res.send(newUpdates)

});

app.delete('/users/:name',(req,res)=>{
  let deleteUser = fs.readFileSync('./storage.json','utf8');
  let oldDeletes = JSON.parse(deleteUser)
    for(let i = 0; i < oldDeletes.length; i++){
        if( oldDeletes[i].name === req.params.name){
            oldDeletes.splice(i,1);
          }
        }
fs.writeFileSync('./storage.json', JSON.stringify(oldDeletes));
res.send(oldDeletes);

});

app.use(function(req, res){
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
