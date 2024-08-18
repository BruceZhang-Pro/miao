
var brucezhang_pro = function() {
  "use strict"
//用于判断基础类型的值是否为falsey的函数
function isFalsey (item) {
  if (item === false || item === null || item === 0 || item === "" || item === undefined || item !== item) {
    return true
  } else {
    return false
  }
}
//遍历数组,并可以提前返回
function forEach(array, iteratee = identity) {
  if (array.length === undefined) { // 说明是个纯对象,没有length属性
    for (let key in array) {
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
//map映射
function myMap(array, func) {
  var result = []
  for (var i = 0; i < array.length; i++) {
    result.push(func(array[i]))
  }
  return result
}
//判断是否为数组
function isArray(item) {
  return Object.prototype.toString.call(item) === '[object Array]'
}
  //Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are false
  function compact(array) {
    var result = []
    forEach(array, (item) => {
      if (isFalsey(item) !== true) {
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
    let func = selectMatchObjectFunc(predicate)
    for (let i = fromIndex; i < array.length; i++) {
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
    let func = selectMatchObjectFunc(predicate)
    for (let i = fromIndex; i >= 0; i--) {
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
    let result = []
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
      let result = []
      forEach(array, item => {
        if (isArray(item) === true) {
          let smallArray = item
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
        let valueString = value.toString()
        let otherString = other.toString()
        return valueString === otherString
      }else {
        return value === other
      }
    }
    if (Object.prototype.toString.call(value) === '[object RegExp]') {
      return value.source === other.source && value.flags === other.flags
    }

    let isFalse = false
    if (Object.prototype.toString.call(value) === "[object Object]") {
      let valArray = []
      let othArray = []
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
  //   let result = []
  //   // let course = []
  //   let str = ""
  //   for (let i = 0; i < string.length; i++) {
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
    for (let key in source) {
      if (key in object) {
        if(isEqual(object[key], source[key]) === false) {
          return false
        }
      } else {
        return false
      }
    }
    return true
  }
  //Creates a function that performs a partial deep comparison between a given object and source, returning true if the given object has equivalent property values, else false.
  function matches(source) {
    return function(object) {
      return isMatch(object, source)
    }
  }
  function matchesProperty(path, srcValue) {
    return function(object) {
      let func = property(path)
      return isEqual(func(object), srcValue)
    }
  }
  //Creates a function that returns the value at path of a given object.
  function property(path) {
    let keyArray = []
    if(typeof path === "string") {
      keyArray = path.split(".")
    } else {
      keyArray = path
    }
    return function(object) {
      let obj = object
      for (let key of keyArray) {
        if (typeof obj !== "object" || obj === null) {
          return obj
        }
        obj = obj[key]
      }
      return obj
    }
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
    let result = []
    let func = selectMatchObjectFunc(predicate)
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
    for (let key in object) {
      if (iteratee(object[key], key, object) === false) {
        return object
      }
    }
    return object
  }
  function forOwn(object, iteratee = identity) {
    for (let key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) === true) {
        if (iteratee(object[key], key, object) === false) {
          return object
        }
      }
    }
    return object
  }
  function fromPairs(pairs) {
    let result = {}
    forEach(pairs, array => {
      result[array[0]] = array[1]
    })
    return result
  }
  function toPairs(object) {
    let result = []
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
  return {
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
