var Knoq = require('knoq');
var curli = require('curli');
var inherits = require('inherits');

var Peeq = function Peeq(uri, opts, callback) {
  if(!(this instanceof Peeq)) return new Peeq(uri, opts, callback);
  this.lastModified = new Date(0);
  Knoq.call(this, uri, opts, callback);
};

inherits(Peeq, Knoq);

Peeq.prototype.preRequest = function preRequest() {
  var checkLastModified = function checkLastModified(err, headers) {
    if (err) return this.emit('error', err);

    if (!headers['last-modified']) {
      this.emit('error', new Error('\'last-modified\' header not available in ' + JSON.stringify(headers)));
    }

    var modified = new Date(headers['last-modified']);

    this.pending = false;

    if (this.lastModified < modified) {
      this.lastModified = modified;
      this.request();
    }
  };

  if (this.ready()) {
    this.pending = true;
    curli(this.uri, checkLastModified.bind(this));
  }
};

module.exports = Peeq;
