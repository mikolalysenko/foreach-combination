"use strict"

var NUM_EXPAND = 32

function generateForeach(k) {
  var funcName = "foreach" + k + "Comb"
  var code = ["function ", funcName, "(x,f){var n=x.length|0"]
  for(var i=0; i<k; ++i) {
    code.push(",i", i)
  }
  code.push(",r;")
  for(var i=0; i<k; ++i) {
    code.push("for(i", i, "=", ((i===0) ? "0" : "1+i" + (i-1)), ";i", i, "<n;++i", i, "){")
  }
  code.push("r=f(")
  for(var i=0; i<k; ++i) {
    if(i > 0) {
      code.push(",")
    }
    code.push("x[i", i, "]")
  }
  code.push(");if(r!==void 0)return r;")
  for(var i=0; i<k; ++i) { 
    code.push("}")
  }
  code.push("};return ", funcName)
  var proc = new Function(code.join(""))
  return proc()
}

function noop() {}

var CACHE = {}
function bigCombination(x,k,f) {
  if(k < 0) {
    return
  }
  var proc = CACHE[k]
  if(!proc) {
    CACHE[k] = proc = generateForeach(k)
  }
  return proc(x,f)
}

function createExports() {
  var list = [noop]
  for(var i=1; i<NUM_EXPAND; ++i) {
    list.push(generateForeach(i))
  }
  list.push(bigCombination)
  var funcName = "dispatchCombination"
  var code = ["function ", funcName, "(x,k,f){switch(k){"]
  var args = []
  for(var i=0; i<NUM_EXPAND; ++i) {
    code.push("case ", i, ":return c", i, "(x,f);")
    args.push("c" + i)
  }
  code.push("default:return b(x,f)}}return ", funcName)
  args.push("b")
  args.push(code.join(""))
  var proc = Function.apply(void 0, args)
  module.exports = proc.apply(void 0, list)
  for(var i=0; i<NUM_EXPAND; ++i) {
    module.exports[i] = list[i]
  }
}

createExports()