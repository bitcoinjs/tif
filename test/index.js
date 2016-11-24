var tape = require('tape')
var tif = require('../')
var fixtures = require('./fixtures')

fixtures.valid.forEach(function (f) {
  tape('encodes ' + f.description + ' for ' + JSON.stringify(f.raw).slice(0, 80) + '...', function (t) {
    t.plan(1)
    t.equal(tif.encode(f.raw), f.text)
  })
})

fixtures.valid.forEach(function (f) {
  if (!f.text) return

  tape('decodes ' + f.description + ' to ' + JSON.stringify(f.raw).slice(0, 80) + '...', function (t) {
    t.plan(1)
    t.same(tif.decode(f.text), f.raw)
  })
})

fixtures.invalid.forEach(function (f) {
  tape('decode throws on ' + f.description, function (t) {
    t.plan(1)
    t.throws(() => {
      tif.decode(f.text)
    }, new RegExp(f.exception))
  })
})
