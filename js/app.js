/**
 * Module dependencies.
 */
 
var express    = require('express'),
    http       = require('http'),
    path       = require('path');
var fs = require('fs');
var app = express();
app.get('/', function(req, res) {
    fs.readFile(__dirname+'/_login.html', 'utf-8', function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('not found!');
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});
/*
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('ZDI0MGY3ZWYwNzYyMDk2YjUzNmM0M2IzMGIzMjAzMmQ2MmZhN2MwZTQxNmU5ZWVkNjRmMjMyNmVmMTA2ZWE3OGNiZjNlNTAwZWY3ZmQ2YWQzNjE5MWU4NmNiMjNmNDNh', 'base64'),
  audience: 'JelTeIAsjRphF41HAxSxOJ785mwpaSVF'
});
app.use('/api/path-you-want-to-protect', jwtCheck);
*/

 
http.createServer(app).listen(8000, function (){
	console.log("create server in listening to 8000...");
});
