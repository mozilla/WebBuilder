var express = require('express'),
	fs = require('fs');

var app = express.createServer();



app.get('/', function(req, res){
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.use(express.static(__dirname  + '/public'));

app.listen(1337);