
var brucezhang_pro = function() {
  "use strict"
  const ARRAY = '[object Array]'
  const OBJECT = '[object Object]'
  const EVERY = true
  const SOME = false
//用于判断基础类型的值是否为falsey的函数
function isFalse (item) {
  if (item === false || item === null || item === 0 || item === "" || item === undefined || item !== item) {
    return true
  } else {
    return false
  }
}
//遍历数组,并可以提前返回
function forEach(array, iteratee = identity) {
  if (array.length === undefined) { // 说明是个纯对象,没有length属性
    for (var key in array) {
      if (iteratee(array[key], key, array) === false) {
        return array
      }
    }
  } else {
    for (var i = 0; i < array.length; i++) {
      if (iteratee(array[i], i, array) === false) {
        return array
      }
    }
  }
  return array
}
function forEachStartIndex(array, fromIndex = 0, iteratee = identity) {
  if (fromIndex !== 0) {
    return forEach(array.slice(fromIndex), iteratee)
  } else {
    return forEach(array, iteratee)
  }
}
//判断是否为数组
function isArray(item) {
  return Object.prototype.toString.call(item) === '[object Array]'
}
//Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are false
function compact(array) {
  var result = []
  forEach(array, (item) => {
    if (isFalse(item) !== true) {
      result.push(item)
    }
  })
  
  return result
}
  
  //Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
  function chunk(array, size = 1) {
    var result = []
    var count = 0
    var smallArray = []
    forEach(array, (item) => {
      smallArray.push(item)
      count++
      if(count === size) {
        result.push(smallArray)
        count = 0
        smallArray = []
      }
    })

    if (smallArray.length > 0) {
      result.push(smallArray)
    }
    return result
  }
  //Fills elements of array with value from start up to, but not including, end.
  function fill(array, val, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = val
    }
    return array
  }
  //Creates a slice of array with n elements dropped from the beginning.
  function drop(array, n = 1) {
    var result = []
    for (var i = n; i < array.length; i++) {
      result.push(array[i])
    }
    return result
  }
  //This method is like _.find except that it returns the index of the first element predicate returns truthy for instead of the element itself.
  function findIndex(array, predicate = identity, fromIndex = 0) {
    var func = selectMatchObjectFunc(predicate)
    for (var i = fromIndex; i < array.length; i++) {
      if (func(array[i]) === true) {
        return i
      }
    }
    return -1
  }
  //This method returns the first argument it receives.
  function identity(value) {
    return value
  }
  //This method is like _.findIndex except that it iterates over elements of collection from right to left.
  function findLastIndex(array, predicate = identity, fromIndex = array.length - 1) {
    var func = selectMatchObjectFunc(predicate)
    for (var i = fromIndex; i >= 0; i--) {
      if (func(array[i]) === true) {
        return i
      }
    }
    return -1
  }
  //Flattens array a single level deep.
  function flatten(array) {
    var result =[]
    forEach(array, item => {
      if(isArray(item) === true) {
        forEach(item, val => {
          result.push(val)
        })
      } else {
        result.push(item)
      }
    })
    return result
  }
  //Recursively flattens array.
  function flattenDeep(array) {
    var result = []
    forEach(array, item => {
      if(isArray(item) === true) {
        var smallArray = flattenDeep(item)
        forEach(smallArray, val => {
          result.push(val)
        })
      } else {
        result.push(item)
      }
    })
    return result
  }
  //Recursively flatten array up to depth times.
  function flattenDepth(array, depth = 1) {
    var count = 0
    function recursivelyFlatten(array, depth) {
      count++
      var result = []
      forEach(array, item => {
        if (isArray(item) === true) {
          var smallArray = item
          if(depth > count) {
            smallArray = recursivelyFlatten(smallArray, depth)
            count--
          }
          forEach(smallArray, val => {
            result.push(val)
          })
        } else {
          result.push(item)
        }
      })
      return result
    }
    return recursivelyFlatten(array, depth)
  }
  //Performs a deep comparison between two values to determine if they are equivalent.
  //typeof 把对象,数组,集合(特殊的数组.可以不考虑它),正则,null,都认为object 函数为function, NaN为number
  function isEqual(value, other) {
    if (value === null) {
      return value === other
    }
    if(Object.prototype.toString.call(value) !== Object.prototype.toString.call(other)) {
      return false
    }
    if (typeof value !== 'object') {
      if (typeof value === 'function') {
        var valueString = value.toString()
        var otherString = other.toString()
        return valueString === otherString
      }else {
        return value === other
      }
    }
    if (Object.prototype.toString.call(value) === '[object RegExp]') {
      return value.source === other.source && value.flags === other.flags
    }

    var isFalse = false
    if (Object.prototype.toString.call(value) === "[object Object]") {
      var valArray = []
      var othArray = []
      forOwn (value, (_, key) =>{ //取得对象的Key
        valArray.push(key)
      })
      forOwn (other, (_, key) =>{ //取得对象的Key
        othArray.push(key)
      })
      if (valArray.length !== othArray.length) {
        return false
      }
      forEach(valArray, key => {
        if(isEqual(value[key], other[key]) === false) {
          isFalse = true
          return false
        }
      })
      if (isFalse === true) {
        return false
      }

    } else { // Array,Set,Map 会到这里
      if (value.length !== other.length) {
        return false
      }
      forEach(value, (_, i) => {
        if(isEqual(value[i], other[i]) === false) {
          isFalse = true
          return false
        }
      })
      if (isFalse === true) {
        return false
      }
    }

    return true
  }
  // function split(string, separator) { //先不实现了,没看懂lodash是怎么实现的
  //   if (typeof separator !== 'string') {
  //     return []
  //   }
  //   var result = []
  //   // var course = []
  //   var str = ""
  //   for (var i = 0; i < string.length; i++) {
  //     if(string[i] !== separator) {
  //       str += string[i]
  //     } else {
  //       result.push(str)
  //       str = ""
  //     }
  //   }
  //   return result
  // }
  //Performs a partial deep comparison between object and source to determine if object contains equivalent property values.
  function isMatch(object, source) {
    for (var key in source) {
      if(Object.hasOwn(object, key)) {
        if (object[key] && typeof object[key] === "object") {
          return isMatch(object[key], source[key])
        } else {
          return object[key] === source[key]
        }
      } else {
        return false
      }
    }

  }
  //Creates a function that performs a partial deep comparison between a given object and source, returning true if the given object has equivalent property values, else false.

  function matches(source) {
    return function(object) {
      return isMatch(object, source)
    }
  }
  function matchesProperty(path, srcValue) {
    return function(object) {
      var func = property(path)
      return isEqual(func(object), srcValue)
    }
  }
  //Creates a function that returns the value at path of a given object.
  function property(path) {
    var keyArray = []
    if(typeof path === "string") {
      var regexp = /\[(\d+)\]/g
      var str = path.replaceAll(regexp, ".$1")
      keyArray = str.split(".")
    } else {
      keyArray = path
    }
    return function(object) {
      var obj = object
      for (var key of keyArray) {
        if (Object.hasOwn(obj, key) === true) {
          obj = obj[key]
        } else {
          return null
        }
      }
      return obj
    }
    // return function(object) {
    //   var obj = object
    //   for (var key of keyArray) {
    //     if (obj === null || obj === undefined) {
    //       return obj
    //     }
    //     obj = obj[key]
    //   }
    //   return obj
    // }
  }
  function selectMatchObjectFunc(predicate = identity) {
    if (typeof predicate === "string") {
      return property(predicate)
    } else if (Object.prototype.toString.call(predicate) === "[object Array]") {
      return matchesProperty(...predicate)
    } else if (Object.prototype.toString.call(predicate) === "[object Object]") {
      return matches(predicate)
    } else if (isFunction(predicate) === true) {
      return predicate
    } else {
      return undefined
    }
  }
  function filter(collection, predicate = identity) {
    var result = []
    var func = selectMatchObjectFunc(predicate)
    if (func === undefined) {
      return result
    }
    if (Object.prototype.toString.call(collection) === "[object Object]") {
      forOwn(collection, val => {
        if (func(val) === true) {
          result.push(val)
        }
      })
    } else {
      forEach(collection, val => {
        if (func(val) === true) {
          result.push(val)
        }
      })
    }

    return result
  }
  function isFunction(obj) {
    if (typeof obj === "function") {
      return true
    } else {
      return false
    }
  }
  function forIn(object, iteratee = identity) {
    for (var key in object) {
      if (iteratee(object[key], key, object) === false) {
        return object
      }
    }
    return object
  }
  function forOwn(object, iteratee = identity) {
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) === true) {
        if (iteratee(object[key], key, object) === false) {
          return object
        }
      }
    }
    return object
  }
  function fromPairs(pairs) {
    var result = {}
    forEach(pairs, array => {
      result[array[0]] = array[1]
    })
    return result
  }
  function toPairs(object) {
    var result = []
    if (Object.prototype.toString.call(object) === "[object Object]") {
      forOwn(object, (val, key) => {
        result.push([key, val])
      })
    } else { //如果是Set 或 Map ,返回传入的值
      return object
    }
    return result
  }
  function head(array) {
    return array[0]
  }
  function indexOf(array, value, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }
  function lastIndexOf(array, value ,fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }
  function initial(array) {
    return array.slice(0, array.length - 1)
  }
  function join(array, separator = ",") {
    var result = ""
    for (var i = 0; i < array.length - 1; i++) {
      result = result + array[i] + separator
    }
    result = result + array[array.length - 1]
    return result
  }
  function last(array) {
    return array[array.length - 1]
  }
  function pull(array, ...values) {
    if(values.length === 0) {
      return []
    }
    return filter(array, item => {
      var equal = false
      forEach(values, val => {
        if (item === val) {
          equal = true
          return false
        }
      })
      return equal === false
  })
  }
  function reverse(array) {
    var result = []
    for (var i = array.length - 1; i >= 0; i--) {
      result.push(array[i])
    }
    return result
  }
  function isNullObject(object) {
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) === true) {
        return false
      }
    }
    return true
  }
  function isHasOwnProperty(object, key) {
    if (Object.prototype.hasOwnProperty.call(object, key) === true) {
      return true
    } else {
      return false
    }
  }
  function judgeObjectType(object) {
    return Object.prototype.toString.call(object)
  }
  // function everyOrSome(collection, predicate = identity, isEvery = true) {
  //   var func = selectMatchObjectFunc(predicate)
  //   var isTrue = true
  //   if (judgeObjectType(collection) === OBJECT) {
  //     if (isNullObject(collection) === true) { //空对象返回true
  //       return true
  //     } else {
  //       forOwn(collection, (val, key) => {
  //         var obj = {}
  //         obj[key] = val
  //         if (func(obj) === !isEvery) {
  //           isTrue = !isEvery
  //           return false // 提前结束循环
  //         }
  //       })
  //     }
  //   } else { //collection 为 Array
  //     forEach(collection, val => {
  //       if (func(val) === !isEvery) {
  //         isTrue = !isEvery
  //         return false // 提前结束循环
  //       }
  //     })
  //   }
  //   if (isEvery) {
  //     return isTrue
  //   } else {
  //     return !isTrue
  //   }
  // }
  // function every(collection, predicate = identity) {
  //   return everyOrSome(collection, predicate, EVERY)
  // }
  // function some(collection, predicate = identity) {
  //   return everyOrSome(collection, predicate, SOME)
  // }
  function every(collection, predicate = identity) {
    var func = selectMatchObjectFunc(predicate)
    var isFalse = false
    if (judgeObjectType(collection) === OBJECT) {
      if (isNullObject(collection) === true) { //空对象返回true
        return true
      } else {
        forOwn(collection, (val, key) => {
          var obj = {}
          obj[key] = val
          if (func(obj) === false) {
            isFalse = true
            return false
          }
        })
        return true
      }
    } else { //collection 为 Array
      forEach(collection, val => {
        if (func(val) === false) {
          isFalse = true
          return false // 提前结束循环
        }
      })
    }
    return !isFalse
  }
  function some(collection, predicate = identity) {
    var func = selectMatchObjectFunc(predicate)
    var isTrue = false
    if (judgeObjectType(collection) === OBJECT) {
      if (isNullObject(collection) === true) { //空对象返回true
        return true
      } else {
        forOwn(collection, (val, key) => {
          var obj = {}
          obj[key] = val
          if (func(obj) === true) {
            isTrue = true
            return false // 提前结束循环
          }
        })
      }
    } else { //collection 为 Array
      forEach(collection, val => {
        if (func(val) === true) {
          isTrue = true
          return false // 提前结束循环
        }
      })
    }
    return isTrue
  }
  //string null number boolean object array 
  function parseJSON(JSON) {
    var i = 0
    return parseType()
    function parseType() {
      if (JSON[i] === "{") {
        return parseObject()
      } else if (JSON[i] === "[") {
        return parseArray()
      } else if (JSON[i] === '"') {
        return parseString()
      } else if ((JSON[i] >= 0 && JSON[i] <= 9) || JSON[i] === "-" || JSON[i] === ".") {
        return parseNumber()
      } else if (JSON[i] === "t") {
        if (JSON.slice(i, i + 4) === "true") {
          i += 4
          return true
        } else {
          i += 4
          throw new SyntaxError("error")
        }
      } else if (JSON[i] === "f") {
        if (JSON.slice(i, i + 5) === "false") {
          i += 5
          return false
        } else {
          i += 5
          throw new SyntaxError("error")
        }
      } else { //还有最后一种情况,null
        i += 4
        return null
      }
    }

    function parseObject() {
      var obj = {}
      i++ // skip this "{"
      var key = null
      var value = null
      if (JSON[i] === "}") {
        i++ // skip this "}"
        return obj
      }
      while (i < JSON.length) {
        if (JSON[i] === "}") {
          i++
          break
        } else if (JSON[i] === ",") {
          i++
        } else if (JSON[i] === '"') {
          key = parseString()
          if (JSON[i] === ":") {
            i++
            value = parseType()
          } else {
            throw new SyntaxError("error")
          }
          obj[key] = value
        } else {
          throw new SyntaxError("error")
        }
      }
      return obj
    }
    function parseArray() {
      i++ //skip this "["
      var result = []
      var value = null
      while (i < JSON.length - 1) {
        if (JSON[i] === "]") {
          i++
          break
        } else if (JSON[i] === ",") {
          i++
        } else {
          value = parseType()
          result.push(value)
        }
      }
      return result
    }
    function parseString() {
      i++ //skip this '"'
      var result = ""
      while (JSON[i] !== '"') {
        result += JSON[i++]
      }
      i++
      return result
    }
    function parseNumber() {
      var result = ""
      while ((JSON[i] >= "0" && JSON[i] <= "9") || JSON[i] == "." || JSON[i] == "-") {
        result += JSON[i++]
      }
      var array = result.split("")
      if (indexOf(array, ".") > -1) {
        return parseFloat(result) 
      } else {
        return parseInt(result) 
      }
    }
  }
  //把 undefined NaN(类型为number) 都转为null,function和symbols转为空字符串,对array和object和string做前后处理,特别在处理string时,要加' \" ',boolean和number和bigint不用处理
  function stringifyJSON(object) {
    var objectType = Object.prototype.toString.call(object)

    if (typeof object === "string") {
      return "\"" + object + "\""
    }else if (typeof object === "bigint" || typeof object === "boolean") {
      return object.toString()
    } else if (typeof object === "number") {
      var str = object.toString()
      if (str === "NaN") {
        return "null"
      } else {
        return str
      }
    } else if (objectType === "[object Array]") {
      return stringifyArray(object)
    } else if (objectType === "[object Object]") {
      return stringifyObject(object)
    } else if (objectType === "[object Null]" || typeof object === "undefined") {
      return "null"
    } else { 
      return ""
    }

    function stringifyObject(object) {
      var result = ""
      forOwn(object, (value, key) => {
        result += stringifyJSON(key) + ":" + stringifyJSON(value) + ","
      })
      return "{" + result.slice(0, result.length - 1) + "}"
    }

    function stringifyArray(array) {
      var result = ""
      forEach(array, item => {
        result += stringifyJSON(item) + ","
      })
      return "[" + result.slice(0, result.length - 1) + "]"
    }
  }
  function calculateKeyBy(collection, iteratee, action) {
    var key = null
    var func = selectMatchObjectFunc(iteratee)
    if (judgeObjectType(collection) === ARRAY) {
      forEach(collection, val => {
        key = func(val)
        action(key, val)
      })
    } else { // else is Object
      forOwn(collection, (val, k) => {
        var obj = {}
        obj[k] = val
        key = func(obj)
        action(key, obj)
      })
    }
  }
  function countBy(collection, iteratee = identity) {
    var result = {}
    calculateKeyBy(collection, iteratee, key => {
      result[key] = (result[key] || 0) + 1
    })
    return result
  }
  function groupBy(collection, iteratee = identity) {
    var result = {}
    calculateKeyBy(collection, iteratee, (key, val) => {
      if (result[key] !== undefined) {
        result[key].push(val)
      } else {
        result[key] = [val]
      }
    })
    return result
  }
  function keyBy(collection, iteratee = identity) {
    var result = {}
    calculateKeyBy(collection, iteratee, (key, val) => {
      result[key] = val
    })
    return result
  }
  function map(collection, iteratee = identity) {
    var result = []
    var key = null
    var func = selectMatchObjectFunc(iteratee)
    if (judgeObjectType(collection) === ARRAY) {
      forEach(collection, (val, i, array) => {
        key = func(val, i, array)
        result.push(key)
      })
    } else { // else is Object
      forOwn(collection, (val) => {
        key = func(val)
        result.push(key)
      })
    }
    return result
  }
  function reduce(collection, iteratee = identity, accumulator) {
    var result = accumulator
    var start = 0
    if (judgeObjectType(collection) === ARRAY) {
      if (accumulator === undefined) {
        result = collection[0]
        start = 1
      }
      for (var i = start; i < collection.length; i++) {
        result = iteratee(result, collection[i], i, collection)
      }
    } else {
      var keys = getKeys(collection)
      if (accumulator === undefined) {
        result = {}
        result[keys[0]] = collection[keys[0]]
        start = 1
      }
      forEachStartIndex(keys, start, key => {
        result = iteratee(result, collection[key], key, collection)
      })
    }
    return result
  }
  function reduceRight(collection, iteratee = identity, accumulator) {
    var result = accumulator
    var start = null
    if (judgeObjectType(collection) === ARRAY) {
      start = collection.length - 1
      if (accumulator === undefined) {
        result = collection[start]
        start--
      }
      for (var i = start; i >= 0; i--) {
        result = iteratee(result, collection[i], i, collection)
      }
    } else {
      var keys = Object.keys(collection)
      start = keys.length - 1
      if (accumulator === undefined) {
        result = {}
        result[keys[start]] = collection[keys[start]]
        start--
      }
      for (var i = start; i >= 0; i--) {
        result = iteratee(result, collection[keys[i]], keys[i], collection)
      }
    }
    return result
  }
  function size(collection) {
    if (judgeObjectType(collection) === OBJECT) {
      var count = 0
      forOwn(collection, _ => ++count)
      return count
    } else {
      return collection.length
    }
  }
  function sortBy(collection, iteratee = [identity]) {
    var result = collection
    forEach(iteratee, item => {
      result = sortOneBy(result, item)
    })

    function sortOneBy(collection, iteratee) {
      var map = groupBy(collection, iteratee)
      var sortKeys = getKeys(map)
      sortKeys = quickSort(sortKeys)
      var result = []
      forEach(sortKeys, key => {
        result.push(...map[key])
      })
      return result
    }
    function quickSort(array, start = 0, end = array.length) {
      if (end - start < 2) {
        return undefined
      }
      var pivotIndex = (Math.random() * (end - start) + start) | 0
      var pivot = array[pivotIndex]
      swap(array, pivotIndex, end - 1)
      var i = start
      var j = start
      while (j < end - 1) {
        if (array[j] < pivot) {
          swap(array, i, j)
          i++
        }
        j++
      }
      swap(array, i, end - 1)
      quickSort(array, start, i)
      quickSort(array, i + 1, end)

      return array
    }

    return result
  }
  function swap(array, i, j) {
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  function getKeys(object) {
    var result = []
    forOwn(object, (_, key) => {
      result.push(key)
    })
    return result
  }
  class Random {
    constructor() {
      this.myX = Date.now() % 4096 //获得随机数种子
      this.myC = 9973 //别人写的是 12345 ,我改成了素数
      this.myA = 1103515245 //A减1后能被M的所有质因数整除, 如果M能被4整除那么A减1也能被4整除
      this.myM = 0x80000000 // 2^31
    }
    get x() {
      return this.myX
    }
    get c() {
      return this.myC
    }
    get a() {
      return this.myA
    }
    get m() {
      return this.myM
    }
    set x(val) {
      this.myX = val
    }
  }
  var random = function() {
    var myRandom = new Random()
    return function(lower = 0, upper = 1, floating) {
      if (arguments.length === 1) {
        upper = arguments[0]
        lower = 0
      }
     //multiplier * current + addend) % modul
     myRandom.x = ((myRandom.a * myRandom.x + myRandom.c) % myRandom.m)
     if (Number.isInteger(lower) !== true || Number.isInteger(upper) !== true || floating === true) {
       return myRandom.x / myRandom.m * (upper - lower) + lower
      } else {
       return (myRandom.x / myRandom.m * (upper - lower) + lower) | 0
     }
    }
  }()
  function sample(collection) {
    var index = 0
    if (judgeObjectType(collection) === ARRAY) {
      index = random(collection.length)
      return collection[index]
    } else {
      var keys = getKeys(collection)
      index = random(keys.length)
      return collection[keys[index]]
    }
  }
  function isUndefined(value) {
    return value === undefined
  }
  function isNull(value) {
    return value === null
  }
  function isNil(value) {
    return (value === null || value === undefined)
  }
  function max(array) {
    if (array.length === 0) {
      return undefined
    }
    var maximum = -Infinity
    forEach(array, val => {
      if (val > maximum) {
        maximum = val
      }
    })
    return maximum
  }
  function min(array) {
    if (array.length === 0) {
      return undefined
    }
    var minimum = Infinity
    forEach(array, val => {
      if (val < minimum) {
        minimum = val
      }
    })
    return minimum
  }
  function maxBy(array, iteratee = identity) {
    var func = selectMatchObjectFunc(iteratee)
    return reduce(array, (result, val) => {
      if(func(result) < func(val)) {
        return val
      } else {
        return result
      }
    })
  }
  function minBy(array, iteratee = identity) {
    var func = selectMatchObjectFunc(iteratee)
    return reduce(array, (result, val) => {
      if (func(result) > func(val)) {
        return val
      } else {
        return result
      }
    })
  }
  function sumBy(array, iteratee = identity) {
    var func = selectMatchObjectFunc(iteratee)
    return reduce(array, (result, val) => {
      return result += func(val)
    },0)
  }
  // function round(number, precision = 0) { //可以尝试用字符串的方式写写
  //   debugger
  //   var strNumber = number.toString()
  //   var index = strNumber.lastIndexOf(".")
  //   var value = strNumber[index + precision + 1]
  //   strNumber = strNumber.slice(0, index + precision + 1)
  //   return Number(strNumber) + (value >= "5" ? 1 : 0) // 5.0被Number转换为5
  // }

  function round(number, precision = 0) {
    var assist = 1
    var num = number
    var prec = (precision >= 0 ? precision : -precision)
    while(prec > 0) {
      assist *= 10
      prec--
    }
    if(precision >= 0) {
      num *= assist
      num += 0.5
      num -= num % 1
      num /= assist
    } else {
      num /= assist
      num += 0.5
      num -= num % 1
      num *= assist
    }
    return num
  }
  function flatMap(collection, iterator = identity) {
    var result = map(collection, iterator)
    return flatten(result)
  }
  function flatMapDepth(collection, iterator = identity, depth = 1) {
    var result = map(collection, iterator)
    return flattenDepth(result, depth)
  }
  function flatMapDeep(collection, iterator = identity) {
    var result = map(collection, iterator)
    return flattenDeep(result)
  }
  function get(object, path, defaultValue) {
    var func = property(path)
    var result = func(object)
    return result ?? defaultValue
  }
  function has(object, path) {
    var func = property(path)
    if (func(object) !== null) {
      return true
    } else {
      return false
    }
  }
  function mapValues(object, iterator = identity) {
    var result = {}
    var func = selectMatchObjectFunc(iterator)
    forOwn(object, (val, key) => {
      result[key] = func(val)
    })
    return result
  }
  function mapKeys(object, iterator = identity) {
    var result = {}
    forOwn(object, (val, key) => {
      var k = iterator(val, key)
      result[k] = val
    })
    return result
  }
  function abs(val) {
    let result = 0
    if (val < 0){
      result = -val
    } else {
      result = val
    }
    return result
  }
  function range() {
    let start
    let end
    let step
    let result = []
    if (arguments.length === 0) {
      return result
    } else if (arguments.length === 1) {
      start = 0
      end = arguments[0]
      if (end < 0) {
        step = -1
      } else {
        step = 1
      }
    } else if (arguments.length === 2) {
      start = arguments[0]
      end = arguments[1]
      if (start < end) {
        step = 1
      } else {
        step = -1
      }
    } else {
      start = arguments[0]
      end = arguments[1]
      step = arguments[2]
    }

    let time = abs((end - start)) / (abs(step) !== 0 ? abs(step) : 1)
    let val = start
    while(time >= 1) {
      time--
      result.push(val)
      val += step
    }

    return result
  }
  function concat(array, ...arg) {
    let result = []
    forEach(array, val => {
      result.push(val)
    })
    forEach(arg, val => {
      if (isArray(val) === true) {
        result.push(...val)
      } else {
        result.push(val)
      }
    })
    return result
  }
  function repeat(string = "", n = 1) {
    let result = ""
    for (let i = 0; i < n; i++) {
      result += string
    }
    return result
  }
  function repeatChar(char = " ", n = 1) {
    let result = ""
    for (let i = 0; i < n; i++) {
      result += char[i % char.length]
    }
    return result
  }
  function pad(string = "", length = 0, char = " ") {
    let result = ""
    if (string.length >= length) {
      return result = string
    }
    let headLength = (length - string.length) >>> 1
    result = padStart(string, headLength + string.length, char)
    result = padEnd(result, length, char)
    return result
  }
  function padStart(string = "", length = 0, char = " ") {
    let result = ""
    if (string.length >= length) {
      return result = string
    }
    let headLength = length - string.length
    result += repeatChar(char, headLength)
    result += string
    return result
  }
  function padEnd(string = "", length = 0, char = " ") {
    let result = ""
    if (string.length >= length) {
      return result = string
    }
    let tailLength = length - string.length
    result += string
    result += repeatChar(char, tailLength)
    return result
  }
  function keys(object) {
    let result = []
    forOwn(object, (_, key) => {
      result.push(key)
    })
    return result
  }
  function keysIn(object) {
    let result = []
    forIn(object, (_, key) => {
      result.push(key)
    })
    return result
  }
  function values(object) {
    let result = []
    forOwn(object, value => {
      result.push(value)
    })
    return result
  }
  function valuesIn(object) {
    let result = []
    forIn(object, value => {
      result.push(value)
    })
    return result
  }
  function ceil(number, precision = 0) {
    let num = number
    if (precision === 0) {
      num += (num % 1 > 0) ? 1 : 0
      num = num - num % 1
    } else {
      let multiple = 10 ** precision
      num *= multiple
      num += (num % 1 > 0) ? 1 : 0
      num -= num % 1
      num /= multiple
    }
    return num
  }
  function floor(number, precision = 0) {
    let num = number
    if (precision === 0) {
      num -= num % 1
    } else {
      let multiple = 10 ** precision
      num *= multiple
      num -= num % 1
      num /= multiple
    }
     return num
  }
  function bind(func, thisArg, ...partials) {
    return function (...args) {
      let allArgs = []
      let i = 0
      forEach(partials, val => {
        if (val === "_") {
          allArgs.push(args[i++])
        } else {
          allArgs.push(val)
        }
      })
      while(i < args.length) {
        allArgs.push(args[i++])
      }
      return func.apply(thisArg, allArgs)
    }
  }
  function cloneDeep() {

  }
  return {
    bind,
    cloneDeep,
    floor,
    ceil,
    valuesIn,
    values,
    keysIn,
    keys,
    padEnd: padEnd,
    padStart: padStart,
    pad: pad,
    repeat: repeat,
    concat: concat,
    range: range,
    mapKeys: mapKeys,
    mapValues: mapValues,
    has: has,
    get: get,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,
    flatMap: flatMap,
    // isInteger: isInteger,
    sumBy: sumBy,
    round: round,
    minBy: minBy,
    maxBy: maxBy,
    min: min,
    max: max,
    isNil: isNil,
    isNull: isNull,
    isUndefined: isUndefined,
    sample: sample,
    random: random,
    sortBy: sortBy,
    size: size,
    reduceRight: reduceRight,
    reduce: reduce,
    map: map,
    keyBy: keyBy,
    groupBy: groupBy,
    countBy: countBy,
    // slice: slice,
    // split: split,
    // parseInt: parseInt,
    stringifyJSON: stringifyJSON,
    parseJSON: parseJSON,
    some: some,
    every: every,
    reverse: reverse,
    pull: pull,
    last: last,
    join: join,
    initial: initial,
    lastIndexOf: lastIndexOf,
    indexOf: indexOf, // lodash要求 按照 SameValueZero 判断值, https://262.ecma-international.org/7.0/#sec-samevaluezero  但我没做
    head: head,
    toPairs: toPairs,
    fromPairs: fromPairs,
    forOwn: forOwn,
    forIn: forIn,
    isFunction: isFunction,
    filter: filter,
    property: property,
    matchesProperty: matchesProperty,
    matches: matches,
    isMatch: isMatch,
    isEqual: isEqual,
    flattenDepth: flattenDepth,
    flattenDeep: flattenDeep,
    flatten: flatten,
    identity: identity,
    findLastIndex: findLastIndex,
    findIndex: findIndex,
    drop: drop,
    fill: fill,
    compact: compact,
    chunk: chunk,
    forEach:forEach,
  }
}()
