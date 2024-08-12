
var brucezhang_pro = function() {
  "use strict"
//用于判断基础类型的值是否为falsey的函数
function isFalsey (item) {
  if (item === false || item === null || item === 0 || item === "" || item === undefined || item === NaN) {
    return true
  } else {
    return false
  }
}
//遍历数组,并可以提前返回
function myForEach(array, func) {
  for (var i = 0; i < array.length; i++) {
    if (func(array[i], i) === false) {
      break
    }
  }
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
    myForEach(array, (item) => {
      if (isFalsey(item) !== true) {
        result.push(item)
      }
    })
    
    return result
  }
  
  //Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
  function dunck(array, size = 1) {
    var result = []
    var count = 0
    var smallArray = []
    myForEach(array, (item) => {
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
    return //待实现
  }
  //This method returns the first argument it receives.
  function identity(value) {
    return value
  }
  //This method is like _.findIndex except that it iterates over elements of collection from right to left.
  function findLastIndex() {
    return //待实现
  }
  //Flattens array a single level deep.
  function flatten(array) {
    var result =[]
    myForEach(array, item => {
      if(isArray(item) === true) {
        myForEach(item, val => {
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
    myForEach(array, item => {
      if(isArray(item) === true) {
        var smallArray = flattenDeep(item)
        myForEach(smallArray, val => {
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
      myForEach(array, item => {
        if (isArray(item) === true) {
          let smallArray = item
          if(depth > count) {
            smallArray = recursivelyFlatten(smallArray, depth)
            count--
          }
          myForEach(smallArray, val => {
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
  return {
    flattenDepth: flattenDepth,
    flattenDeep: flattenDeep,
    flatten: flatten,
    identity: identity,
    findLastIndex: findLastIndex,
    findIndex: findIndex,
    drop: drop,
    fill: fill,
    compact: compact,
    dunck: dunck,
  }
}()
