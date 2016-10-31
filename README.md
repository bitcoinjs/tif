# TIF

[![TRAVIS](https://secure.travis-ci.org/bitcoinjs/tif.png)](http://travis-ci.org/bitcoinjs/tif)
[![NPM](http://img.shields.io/npm/v/tif.svg)](https://www.npmjs.org/package/tif)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Bitcoin Transaction Interchange Format (TIF) decoding/encoding module.


## Format

``` markdown
tx?[version=<int>][&locktime=<uint>][&anyonecanpay=1]
in?txId=<txid>&vout=<uint>&script=<hex>[&sequence=<uint>]
in?txId=<txid>&vout=<uint>&witness=<hex>&value=<satoshis>[&script=<hex>][&sequence=<uint>]
out?address=<address>[&value=<satoshis>][&n=<uint>]
out?script=<hex>[&value=<satoshis>][&n=<uint>]
```


## Example

``` javascript
var tif = require('tif')
```

## LICENSE [MIT](LICENSE)
