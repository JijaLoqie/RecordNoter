var express = require('express');
var moment = require('moment');
const pool = require('./database');
var app = express();
const port = 5000;

app.use(express.json({ limit: "500mb" }));

app.get('/', function(req, res) {
  res.send("JijaLoqie begins to get cool!");
});

app.post('/addUser', (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;

  console.log(`User ${username} created!`);
  console.log(`${req}`);

  const addUserQuery = `INSERT INTO users (username, password) VALUES ( '${username}', '${password}' )`;

  pool.query(addUserQuery).then((response) => {
    console.log("User saved!");
    console.log(response);
    res.send(response);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  });
});

app.post('/addRecord', (req, res)=>{
  const username = req.body["username"];
  const text = req.body["text"];
  const date = moment().format('DD.MM.YYYY/hh:mm:ss');

  console.log(`Record by ${username} created!`);

  const addRecordQuery = `INSERT INTO records (username, text, date) VALUES ( '${username}', '${text}', '${date}' )`;

  pool.query(addRecordQuery).then((response) => {
    console.log("Record saved!");
    console.log(response);
    res.send(response);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  });
});
//  todo: edit record!!
app.post('/editRecord', (req, res)=>{
  const id = req.body["id"];
  const text = req.body["text"];
  console.log(id, text);

  const editRecordQuery = `UPDATE records SET text = '${text}' WHERE user_id = ${id}`;

  pool
    .query(editRecordQuery)
    .then((response) => {
      console.log("Record edited and saved!");
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//todo: deleteRecord!!
app.post('/deleteRecord', (req, res)=>{
  const id = req.body["id"];


  const addRecordQuery = `DELETE FROM records WHERE user_id = ${id}`;

  pool.query(addRecordQuery).then((response) => {
    console.log("Record saved!");
    console.log(response);
    res.send(response);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  });
});

app.get("/getRecords", (req, response) => {
  pool.query('SELECT * FROM records', (err, records) => {
    response.send({records: records.rows});
  });
})
// todo: getRecordById!!
app.get("/getRecordById", (req, response) => {
  pool.query(`SELECT ${req.body["index"]} FROM records`, (err, data) => {
    console.log(data);
    response.send({record: data.record});
  });
})

app.listen(port, () => console.log(`Server on ${port}`));
