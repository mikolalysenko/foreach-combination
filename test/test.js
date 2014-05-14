"use strict"

var tape = require("tape")
var foreachComb = require("../forcomb.js")

tape("foreach-combination", function(t) {
  var array = "abcd".split("")
  var pairs = []
  foreachComb(array, 2, function(a,b) {
    pairs.push(a+b)
  })
  t.same(pairs, ["ab", "ac", "ad", "bc", "bd", "cd"])

  var triples = []
  foreachComb(array, 3, function(a,b,c) {
    triples.push(a+b+c)
  })
  t.same(triples, ["abc", "abd", "acd", "bcd"])

  t.end()
})