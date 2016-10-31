// https://gist.github.com/dcousens/8e72ff7ddf1f189cb7bbe42d0aeca9ce
// tx?[version=<int>][&locktime=<uint>][&anyonecanpay=1]
// in?txid=<txid>&vout=<uint>&script=<hex>[&txhex=<txhex>][&sequence=<uint>]
// in?txid=<txid>&vout=<uint>&witness=<hex>&value=<satoshis>[&script=<hex>][&sequence=<uint>]
// out?address=<address>[&value=<satoshis>][&n=<uint>]
// out?script=<hex>[&value=<satoshis>][&n=<uint>]

var typeforce = require('typeforce')
var qs = require('qs')

var SATOSHI_MAX = 21 * 1e14
function Satoshi (value) {
  return typeforce.UInt53(value) && value <= SATOSHI_MAX
}

function decodeTx (string) {
  var p = qs.parse(string.slice(3))
  if (p.version !== undefined) p.version = parseInt(p.version, 10)
  if (p.locktime !== undefined) p.locktime = parseInt(p.locktime, 10)
  if (p.anyonecanpay !== undefined) p.anyonecanpay = 1

  typeforce({
    version: typeforce.maybe(typeforce.Int32),
    locktime: typeforce.maybe(typeforce.UInt32),
    anyonecanpay: typeforce.maybe(1)
  }, p)

  return p
}

function decodeInput (string) {
  var p = qs.parse(string.slice(3))
  p.vout = parseInt(p.vout, 10)

  if (p.witness !== undefined) {
    p.value = parseFloat(p.value)
    typeforce({
      txId: typeforce.HexN(64),
      vout: typeforce.UInt32,
      script: typeforce.maybe(typeforce.Hex),
      witness: typeforce.Hex,
      sequence: typeforce.maybe(typeforce.UInt32),
      value: Satoshi
    }, p)
  } else {
    typeforce({
      txId: typeforce.HexN(64),
      vout: typeforce.UInt32,
      script: typeforce.Hex,
      sequence: typeforce.maybe(typeforce.UInt32)
    }, p)
  }

  return p
}

function decodeOutput (string) {
  var p = qs.parse(string.slice(4))
  p.value = parseFloat(p.value)

  if (p.address) {
    typeforce({
      address: typeforce.String,
      value: Satoshi
    }, p, true)
  } else {
    typeforce({
      script: typeforce.Hex,
      value: Satoshi
    }, p, true)
  }

  return p
}

function decode (string) {
  var result = {}
  var ins = []
  var outs = []

  string.split('\n').forEach(function (line) {
    if (line.startsWith('tx')) {
      result = decodeTx(line)
    } else if (line.startsWith('in')) {
      ins.push(decodeInput(line))
    } else if (line.startsWith('out')) {
      outs.push(decodeOutput(line))
    }
  })

  result.ins = ins
  result.outs = outs
  return result
}

function encode (tx) {
  var lines = []

  if (tx.version !== undefined ||
      tx.locktime !== undefined ||
      tx.anyonecanpay === 1) {
    lines.push('tx?' + qs.stringify({
      version: tx.version,
      locktime: tx.locktime,
      anyonecanpay: tx.anyonecanpay === 1 ? 1 : undefined
    }))
  }

  tx.ins.forEach(function (input) {
    lines.push('in?' + qs.stringify(input))
  })

  tx.outs.forEach(function (output) {
    lines.push('out?' + qs.stringify(output))
  })

  return lines.join('\n')
}

module.exports = {
  decode: decode,
  encode: encode
}
