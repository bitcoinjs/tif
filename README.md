# TIF

[![TRAVIS](https://secure.travis-ci.org/bitcoinjs/tif.png)](http://travis-ci.org/bitcoinjs/tif)
[![NPM](http://img.shields.io/npm/v/tif.svg)](https://www.npmjs.org/package/tif)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Bitcoin Transaction Interchange Format (TIF) decoding/encoding module.


## Format

``` markdown
tx?[version=<int>][&locktime=<uint>][&anyonecanpay=1]
in?txId=<txid>&vout=<uint>[&script=<hex>][&sequence=<uint>][&prevtx=<hex>]
in?txId=<txid>&vout=<uint>&witness=<hex>&value=<satoshis>[&script=<hex>][&sequence=<uint>]
out?address=<address>[&value=<satoshis>]
out?script=<hex>[&value=<satoshis>]
```


## Example

``` javascript
let tif = require('tif')

tif.encode({
  tx: {
    version: 2
  },
  outs: [
    {
      address: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH',
      value: 100000
    },
    {
      address: '1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP',
      value: 100000
    }
  ]
})
```

## LICENSE [MIT](LICENSE)
