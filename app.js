var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	app = express.createServer();

app.get('/', function(req, res){
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function(err, text){
        res.send(text);
    });
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(1337);