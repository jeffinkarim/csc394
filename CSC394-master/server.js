const express = require('express');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

const app = express();

let db;
MongoClient.connect('mongodb+srv://jokerlai:Lwr!19941228@cluster0-xcdzy.mongodb.net/test?retryWrites=true').then(connection => {
	db = connection.db('csc394');
	app.listen(3000, function () {
		console.log('App started on port 3000');
	});
}).catch(error => {
	console.log('ERROR', error);
});

app.use(bodyParser.json());
app.use(express.static('static'));

app.post('/addUser', (req, res) => {
	db.collection('users').insertOne(req.body);
});

app.post('/updateScore', (req, res) => {
	db.collection('users').updateOne({'Name': req.body.CName},{$inc:{oT: req.body.oT, gC: req.body.gC, qW: req.body.qW, rC: req.body.rC}});
});

app.post('/updateGroup', (req, res) => {
	db.collection('users').updateOne({'Name': req.body.CName},{$set:{GroupID: req.body.GroupID}});
});

app.get('/getUser', (req, res) => {
	db.collection('users').find(req.body).toArray().then(data =>{
		res.json(data);
	});
});


