var test = require('tape');
var Peeq = require('../');
var createServer = require('./server').createServer;

test('Basic functionality', function (t) {
  var server = createServer();

  server.listen(0, function() {
    var count = 0;
    var requests = 0;
    var modified = new Date(Date.now());
    var port = server.address().port;
    var host = '//localhost:' + port;
    var href = 'http:' + host + '/';

    var req = Peeq(href, 100, function(err, res) {
      t.ifError(err, 'no error');
      t.ok(res, 'get response if last-modified changed');
      t.equal(res.headers['last-modified'], req.lastModified.toString(), 'set lastModified property');
      if (requests++ === 1) {
        t.equal(requests, 2, 'shoud have made two requests');
        server.close();
        req.end();
        t.end();
      }
    });

    server.on('/', function(req, res) {
      if (count++ >= 4)
        modified = new Date(Date.now());
      res.writeHead(200, { 'last-modified': modified });
      res.end();
    });
  });
});

test('Error handling', function (t) {
  var server = createServer();


  server.listen(0, function() {
    var port = server.address().port;
    var host = '//localhost:' + port;
    var href = 'http:' + host + '/';

    var req = Peeq(href, 100, function(err, res) {
      t.ok(err, 'error when \'Last-Modified\' header not present');
      t.notOk(res, 'no response');
      server.close();
      req.end();
      t.end();
    });

    server.on('/', function(req, res) {
      res.writeHead(200);
      res.end();
    });
  });
});
