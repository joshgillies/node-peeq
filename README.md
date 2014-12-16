# Peeq

Continuously retrieve web resources based on Last-Modified header.

Peeq is based on [Knoq](https://github.com/joshgillies/node-knoq)
and exposes an almost identical API as a result, with the exception
that it will only return a "response" event if the resource has been updated.

[![build status](https://secure.travis-ci.org/joshgillies/node-peeq.svg)](http://travis-ci.org/joshgillies/node-peeq)

[![NPM](https://nodei.co/npm/peeq.png?downloads=true&stars=true)](https://nodei.co/npm/peeq/)

# Example

```javascript
var Peeq = require('peeq');
var resource = Peeq('https://en.wikipedia.org/wiki/JavaScript');

resource.on('response', function(res) {
  console.log(res.statusCode);
  resource.end();
});

resource.on('end', function() {
  console.log('ended!');
});
```

# Install

`npm install peeq`

# License

MIT
