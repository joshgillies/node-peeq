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
  if (!this.ready()) return;

  var checkLastModified = function checkLastModified(err, headers) {
    if (err) return this.emit('error', err);

    this.pending = false;

    if (!headers['last-modified']) {
      this.emit('error', new Error('\'last-modified\' header not available.'));
    }

    var modified = new Date(headers['last-modified']);

    if (this.lastModified < modified) {
      this.lastModified = modified;
      this.request();
    }
  };

  this.pending = true;

  curli(this.uri, checkLastModified.bind(this));
};

module.exports = Peeq;
