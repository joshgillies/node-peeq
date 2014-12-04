# Peeq

Continuously retrieve web resources based on Last-Modified header.

Peeq is based on [Knoq](https://github.com/joshgillies/node-knoq) and exposes an amlost identical API as a result.

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
