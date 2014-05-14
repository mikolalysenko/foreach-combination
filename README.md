foreach-combination
===================
Enumerate all k length subsets in an array.

# Example

```javascript
var kcomb = require("foreach-combination")

var array = [1, 2, 3, "a", "b", "c"]

kcomb(array, 3, function(x,y,z) {
  console.log(x, y, z)
})
```

Output:

```javascript
1 2 3
1 2 'a'
1 2 'b'
1 2 'c'
1 3 'a'
1 3 'b'
1 3 'c'
1 'a' 'b'
1 'a' 'c'
1 'b' 'c'
2 3 'a'
2 3 'b'
2 3 'c'
2 'a' 'b'
2 'a' 'c'
2 'b' 'c'
3 'a' 'b'
3 'a' 'c'
3 'b' 'c'
'a' 'b' 'c'
```

# Install

```
npm install foreach-combination
```

If you want to use this in a browser, then you should use [browserify](http://browserify.org/).

# API

#### `require("foreach-combination")(array, k, visit(x1,x2,...,xk)`
Visits all `k` size combinations in array in lexicographic order.

* `array` is an array
* `k` is the size of the combination to visit
* `visit(x1,x2,...xk)` is a callback that gets called once for each size k-subset of the array.  If `visit` returns a non-undefined value then the iteration is immediately terminated, and the result of `visit` is returned.

**Returns** The result of the last call to `visit`, or `undefined` if no value was ever returned.

**Note** If you know `k` in advance, you can avoid an extra dispatch by calling `require("foreach-combination")[k]` directly for any `k<32`

# Credits
(c) 2014 Mikola Lysenko. MIT License