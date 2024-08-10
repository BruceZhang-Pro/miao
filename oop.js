// function Vector (x, y) {
//   this.x = x
//   this.y = y
// }

// Vector.prototype.plus = function (vector) {
//   return new Vector(this.x + vector.x, this.y + vector.y)
// }
// Vector.prototype.minus = function (vector) {
//   return new Vector(this.x - vector.x, this.y - vector.y)
// }
// Object.defineProperty(Vector.prototype, "length", {
//   get: function () {
//   return Math.sqrt(this.x * this.x + this.y * this.y)
//   }
// })

class Vector{

  constructor (x, y) {
    this.x = x
    this.y = y
  }
  plus (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }
  minus (vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

}

// var v1 = new Vector(1, 2)
// var v2 = new Vector(3, -4)

// var v3 = v1.plus(v2)
// var v4 = v2.minus(v1)

// var l = v4.length()
// console.log(v1)
// console.log(v2)
// console.log(v3)
// console.log(v4)
// console.log(l)

// var a = new Vector(1,2)
// var b = new Vector(2,2)
// var c = a.plus(b)
// var d = a.minus(b)
// console.log(c.x)
// console.log(c.y)
// console.log(d.x)
// console.log(d.y)
// console.log(c.length)
// assert(c.x == 3, 'a+b的x应该为3')
// assert(c.y == 4, 'a+b的y应该为4')
// assert(d.x == -1, 'a-b的x应为-1')
// assert(d.y == 0, 'a-b的y应为0')
// assert(c.length == 5,'a+b的长度应为5')
// console.log(a)


// function Complex (real, imag) {
//   this.real = real
//   this.imag = imag
// }

// Complex.prototype.toString = function() {
//   //console.log(this.real + "+" + this.imag + "i")
//   return "" + this.real + (this.imag > 0 ? "+" : "") + this.imag + "i"
// }
// Complex.prototype.plus = function (complex) {
//   return new Complex((this.real + complex.real), (this.imag + complex.imag))
// }
// Complex.prototype.minus = function (complex) {
//   return new Complex((this.real - complex.real), (this.imag - complex.imag))
// }
// Complex.prototype.multiple = function (complex) {
//   return new Complex((this.real * complex.real - this.imag * complex.imag), (this.real * complex.imag + this.imag * complex.real))
// }

// Complex.prototype.div = function (complex) {
//   complex.imag *= -1
//   let c = this.multiple(complex)
//   let real = c.real / ((complex.real ** 2) + (complex.imag ** 2))
//   return new Complex(real, c.imag)
// }

class Complex {
  constructor (real, imag) {
    this.real = real
    this.imag = imag
  }
  toString () {
    return "" + this.real + (this.imag > 0 ? "+" : "") + this.imag + "i"
  }
  plus (complex) {
    return new Complex((this.real + complex.real), (this.imag + complex.imag))
  }
  minus (complex) {
    return new Complex((this.real - complex.real), (this.imag - complex.imag))
  }
  multiple (complex) {
    return new Complex((this.real * complex.real - this.imag * complex.imag), (this.real * complex.imag + this.imag * complex.real))
  }
  div (complex) {
    complex.imag *= -1
    let c = this.multiple(complex)
    let real = c.real / ((complex.real ** 2) + (complex.imag ** 2))
    return new Complex(real, c.imag)
  }
}


// (a + bi) - (c + di)
// (a - c) + (b - d)i

// (a + bi)(c + di)
// ac + adi + bci + bdi^2
// (ac - bd) + (adi + bci)

// var c1 = new Complex(4, 5)
// var c2 = new Complex(1, -2)

// var c3 = c1.plus(c2)
// var c4 = c1.minus(c2)
// var c5 = c1.multiple(c2)
// var c6 = c1.div(c2)
// console.log(c1)
// console.log(c2)
// console.log(c3)
// console.log(c4)
// console.log(c5)
// console.log(c6.toString())
// console.log(c6)

// var a = new Complex(1,2)
// var b = new Complex(2,4)
// var c = a.div(b)
// console.log(c.real)
// console.log(c.imag)
// assert(c.real == 0.5, 'a/b的实部应该为0.5')
// assert(c.imag == 0, 'a/b的虚部应该为0')



// function LinkedListNode (val, next) {
//   this.val = (val === undefined ? 0 : val)
//   this.next = (next === undefined ? null : next)
// }
// // 表示一个单向链表
//   function LinkedList() {
//     this._head = null
//     this._length = 0
//   }
//   // 返回链表第idx个结点的值
//   LinkedList.prototype.at = function(idx) {
//     let p = this._head
//     while (idx > 0 && p) {
//       p = p.next
//       idx--
//     }
//     if (p) {
//       return p.val
//     }
//     return undefined
//   }
//   // 设置链表第idx项的值为val
//   LinkedList.prototype.set = function(idx, val) {
//     let p = this._head
//     while (idx > 0 && p) {
//       p = p.next
//       idx--
//     }
//     if (p) {
//       p.val = val
//       return true
//     }
//     return false
//   }
//   // 在链表末尾新增一个结点，值为val
//   LinkedList.prototype.append = function(val) {
//     this._length++
//     if (this._head == null) {
//       this._head = new LinkedListNode(val)
//       return this._head
//     }
//     let p = this._head
//     while (p.next) {
//       p = p.next
//     }
//     p.next = new LinkedListNode(val)
//     return this._head
//   }
//   // 返回链表末尾结点的值，并删除末尾结点
//   LinkedList.prototype.pop = function() {
//     if (this._head == null) {
//       return undefined
//     }
//     this._length--
//     let result = 0
//     let p = this._head
//     if (p.next == null) {
//       result = p.val
//       p = null
//       return result
//     }
//     while (p.next.next) {
//       p = p.next
//     }
//     result = p.next.val
//     p.next = null
//     return result
//   }
//   // 在链表头部新增一个结点，值为val
//   LinkedList.prototype.prepend = function(val) {
//     let p = new LinkedListNode(val, this._head)
//     this._head = p
//     this._length++
//     return this._head
//   }
//   // 返回链表第一个结点的值，并删除这一个结点
//   LinkedList.prototype.shift = function() {
//     if (this._head == null) {
//       return undefined
//     }
//     this._length--
//     let result = this._head.val
//     this._head = this._head.next
//     return result
//   }
//   LinkedList.prototype.toArray = function() {
//     let array = []
//     let p = this._head
//     while (p) {
//       array.push(p.val)
//       p = p.next
//     }
//     return array
//   }
//   LinkedList.prototype.toString = function () {
//     return this.toArray().join("->")
//   }
//   Object.defineProperty(LinkedList.prototype, "size", {
//     get: function () {
//       return this._length
//     }
//   })

  class LinkedListNode {
    constructor (val, next) {
      this.val = (val === undefined) ? 0 : val
      this.next = (next === undefined) ? null : next
    }
  }

  class LinkedList {
    #head = null
    #length = 0
    // 返回链表第idx个结点的值
    at (idx) {
      let p = this.#head
      while (idx > 0 && p) {
        p = p.next
        idx--
      }
      if (p) {
        return p.val
      }
      return undefined
    }
    // 设置链表第idx项的值为val
    set (idx, val) {
      let p = this.#head
      while (idx > 0 && p) {
        p = p.next
        idx--
      }
      if (p) {
        p.val = val
        return true
      }
      return false
    }
    // 在链表末尾新增一个结点，值为val
    append (val) {
      this.#length++
      if (this.#head == null) {
        this.#head = new LinkedListNode(val)
        return this.#head
      }
      let p = this.#head
      while (p.next) {
        p = p.next
      }
      p.next = new LinkedListNode(val)
      return this.#head
    }
    // 返回链表末尾结点的值，并删除末尾结点
    pop () {
      if (this.#head == null) {
        return undefined
      }
      this.#length--
      let result = 0
      let p = this.#head
      if (p.next == null) {
        result = p.val
        p = null
        return result
      }
      while (p.next.next) {
        p = p.next
      }
      result = p.next.val
      p.next = null
      return result
    }
    // 在链表头部新增一个结点，值为val
    prepend (val) {
      let p = new LinkedListNode(val, this.#head)
      this.#head = p
      this.#length++
      return this.#head
    }
    // 返回链表第一个结点的值，并删除这一个结点
    shift () {
      if (this.#head == null) {
        return undefined
      }
      this.#length--
      let result = this.#head.val
      this.#head = this.#head.next
      return result
    }
    toArray () {
      let array = []
      let p = this.#head
      while (p) {
        array.push(p.val)
        p = p.next
      }
      return array
    }
    toString  () {
      return this.toArray().join("->")
    }
    get size () {
      return this.#length
    }

  }

// var s = new LinkedList()
// s.append(1)
// s.append(2)
// s.prepend(3)
// console.log(s.size)
// assert(s.size == 3, '链表长度应该为3')
// s.prepend(4)
// console.log(s.at(0))
// console.log(s.at(1))
// console.log(s.at(3))
// assert(s.at(0) == 4, '0号位置应该为4')
// assert(s.at(1) == 3, '1号位应该为3')
// assert(s.at(3) == 2, '3号位应该为2')



  // // 表示一个集合（集合中元素没有序，但不能重复）
  // // 构造函数可选的可以传入集合中的初始值，但会被去重后存放
  // function MySet(initalValues = []) {
  //   this._set = []
  //   for (let value of initalValues) {
  //     this.add(value)
  //   }
  // }
  // // 向集合中添加元素
  // MySet.prototype.add = function(item) {
  //   if (!this._set.includes(item)) {
  //     return this._set.push(item)
  //   }
  //   return false
  // }
  // // 从集合中删除item元素
  // MySet.prototype.delete = function(item) {
  //   let index = this._set.indexOf(item)
  //   if (index >= 0) {
  //     this._set.splice(index, 1)
  //     return true
  //   }
  //   return false
  // }
  
  // // 获取集合中的元素用 c.size，它是一个getter
  // Object.defineProperty(MySet.prototype, "size", {
  //   get: function () {
  //     return this._set.length
  //   }
  // })


  // // 清空集合中的所有元素
  // MySet.prototype.clear = function() {
  //   this._set = []
  //   return this
  // }

  // // 判断集合中是否存在某元素
  // MySet.prototype.has = function(value) {
  //   if (this._set.includes(value)) {
  //     return true
  //   }
  //   return false
  // }
  // // 遍历集合中的元素（顺序无所谓）
  // MySet.prototype.forEach = function(func) {
  //   for (let i = 0; i < this._set.length; i++) {
  //     func(this._set[i], i, this._set)
  //   }
  // }

  class MySet {
    #set = null
    constructor (initalValues = []) {
      this.#set = []
      for (let val of initalValues) {
        this.add(val)
      }
    }
  // 向集合中添加元素
    add (val) {
      if (!this.#set.includes(val)) {
        return this.#set.push(val)
      }
      return false
    }
    // 从集合中删除item元素
    delete (item) {
      let index = this.#set.indexOf(item)
      if (index >= 0) {
        this.#set.splice(index, 1)
        return true
      }
        return false
    }
    // 获取集合中的元素用 c.size，它是一个getter
    get size () {
      return this.#set.length
    }
    // 清空集合中的所有元素
    clear () {
      this.#set = []
      return this
    }
    // 判断集合中是否存在某元素
    has (val) {
      return this.#set.includes(val)
    }
    // 遍历集合中的元素（顺序无所谓）
    forEach (func) {
      for (let i = 0; i < this.#set.length; i++) {
        func(this.#set[i] , i, this.#set)
      }
    }
  }

  // var c = new MySet() //初始化一个空集合
  // c.add(5)
  // c.add(5)
  // console.log(c.size) // 1
  // c.add(8)
  // console.log(c.size) // 2
  // console.log(c.has(5)) // true
  // console.log(c.has(999)) // false
  // c.delete(5)
  // console.log(c.size) // 1
  // c.delete(9)
  // console.log(c.size) // 1

class MyMap {
  #lists = null
  #size = null
  #volumeFraction = null 
  #minCapacity = null //最小容量
  constructor(volumeFraction = 0.75) { //容积率默认0.75
    this.#minCapacity = 16 //转化成二进制后,最好是只有一个1,这样语言底层会对取余操作进行优化
    this.#lists = new Array(this.#minCapacity).fill(null) //都设置为空值
    this.#size = 0
    this.#volumeFraction = volumeFraction
  }
  set (key, val) {
    let hashVal = this.calculateHash(key)
    let node = this.#lists[hashVal]
    while(node) {
      if (node.key === key) {
        node.val = val
        return this
      }
      node = node.next
    }
    node = {
      key: key,
      val: val,
      next: this.#lists[hashVal]
    }
    this.#lists[hashVal] = node
    this.#size++
    if (this.#size / this.#lists.length > this.#volumeFraction) {
      this.changeCapacity(this.#lists.length * 2)
    }

    return this
  }
  get (key) {
    let hashVal = this.calculateHash(key)
    let node = this.#lists[hashVal]
    while (node) {
      if (node.key === key) {
        return node.val
      }
      node = node.next
    }
    return undefined
  }
  delete (key) {
    let hashVal = this.calculateHash(key)
    let node = {next: this.#lists[hashVal]}
    let dummy = node
    while (node.next) {
      if (node.next.key === key) {
        node.next = node.next.next
        this.#lists[hashVal] = dummy.next
        this.#size--
        if (this.#size / this.#lists.length < this.#volumeFraction / 4) { //容积率小于4倍时才缩容,防止反复横条
          if ((this.#lists.length >>> 1) >= this.#minCapacity) {
            this.changeCapacity(this.#lists.length >>> 1)
          }
        }
        return true
      }
      node = node.next
    }
    return false
  }
  calculateHash (key) {
    let seed = 13131
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash * seed + key.charCodeAt(i)) >>> 0
    }
    return hash % this.#lists.length
  }
  has(key) {
    let hashVal = this.calculateHash(key)
    let node = this.#lists[hashVal]
    while (node) {
      if (node.key === key) {
        return true
      }
      node = node.next
    }
    return false
  }
  clear() {
    this.#lists = Array(this.#minCapacity).fill(null)
    this.#size = 0
    return true
  }
  changeCapacity (size) {
    let oldLists = this.#lists
    this.#lists = new Array(size).fill(null)
    let node = null
    this.#size = 0
    for (let i = 0; i < oldLists.length; i++) {
      node = oldLists[i]
      while (node) {
        this.set(node.key, node.val)
        node = node.next
      }
    }
  }
  forEach(func) {
    for (let i = 0; i < this.#lists.length; i++) {
      let node = this.#lists[i]
      while (node) {
        func(node.key, node.val, i, node)
        node = node.next
      }
    }
  }
  repetitionFraction() {
    if (this.#size == 0) {
      return 1
    }
    let count = 0
    for (let i = 0; i < this.#lists.length; i++) {
      if (this.#lists[i] != null) {
        count++
      }
    }
    return this.#size / count
  }
  get size() {
    return this.#size
  }

}

//测试代码
// for (let i = 0; i < 100; i++) {
//   myMap.set(Math.random().toString().slice(2), (Math.random() * 10000))
// }

// var count = 0
// myMap.forEach(it => {
//   count++
//   if (count % 3 == 0) {
//     myMap.delete(it)
//   }
// })



  // // 表示一个栈：即后进先出，先进后出
  // function Stack() {
  //   this._val = []
  // }
  // // 向栈中增加元素
  // Stack.prototype.push = function(_val) {
  //   return this._val.push(_val)
  // }
  // // 从栈中取出元素并删除栈顶元素
  // Stack.prototype.pop = function() {
  //   return this._val.pop()
  // }
  // // 查看但不删除栈顶元素
  // Stack.prototype.peek = function() {
  //   return this._val[this._val.length - 1]
  // }
  // // stack.size 获取栈中元素的数量
  // Object.defineProperty(Stack.prototype, "size", {
  //   get: function () {
  //     return this._val.length
  //   }
  // })

// 表示一个栈：即后进先出，先进后出
class Stack {
  #val = []

  // 向栈中增加元素
  push (val) {
    return this.#val.push(val)
  }
  // 从栈中取出元素并删除栈顶元素
  pop () {
    return this.#val.pop()
  }
  // 查看但不删除栈顶元素
  peek () {
    return this.#val[this.#val.length - 1]
  }
// stack.size 获取栈中元素的数量
  get size () {
    return this.#val.length
  }
}

  // var stack = new Stack()
  // stack.push(1)
  // stack.push(2)
  // console.log(stack.size) // 2
  // stack.push(3)
  // console.log(stack.size) // 3
  // console.log(stack.pop()) // 3
  // console.log(stack.pop()) // 2
  // stack.push(5)
  // console.log(stack.pop()) // 5 
  


  // // 表示一个队列：即先进先出，后进后出
  // function Queue() {
  //   this._head = null
  //   this.#tail = null
  //   this._length = 0
  // }
  
  // // 向队列中增加元素
  // Queue.prototype.add = function(val) {
  //   if (this._head == null) {
  //     this._head = new LinkedListNode(val)
  //     this.#tail = this._head
  //   } else {
  //     this.#tail.next = new LinkedListNode(val)
  //     this.#tail = this.#tail.next
  //   }
  //   this._length++
  //   return this
  // }
  // // 从队头取出元素并删除队头元素
  // Queue.prototype.pop = function() {
  //   if (this._head == null) {
  //     return undefined
  //   }
  //   let result = this._head.val
  //    if (this._head === this.#tail) {
  //     this._head = null
  //     this.#tail = null
  //   } else {
  //     this._head = this._head.next
  //   }
  //   this._length--
  //   return result
  // }
  // // 查看队头元素（没有查看队尾元素的功能）
  // Queue.prototype.peek = function() {
  //   return (this._head ? this._head.val : undefined)
  // }
  // // 以及queue.size获取队列的长度
  // Object.defineProperty(Queue.prototype, "size", {
  //   get: function () {
  //     return this._length
  //   }
  // })

  //  // 表示一个队列：即先进先出，后进后出
  //  function Queue() {
  //   this._queue = Array(10)
  //   this._head = 4 //指在队头的元素上
  //   this.#tail = 4 //指在最后一个元素的下一个位置上
  //   this._length = 0
  // }
  
  // // 向队列中增加元素
  // Queue.prototype.add = function(val) {
  //   if (this._head == this.#tail) {
  //     this._queue[this._head] = val
  //     this.#tail = (this.#tail + 1) % this._queue.length
  //     this._length++
  //     return this
  //   }
  //   if (this._length + 1 == this._queue.length) {
  //     let newArray = Array(this._queue.length * 2)
  //     for (let i = 0; i < newArray.length; i++) {
  //       if (this._head != this.#tail) {
  //         newArray[i] = this._queue[this._head]
  //         this._head = (this._head + 1) % this._queue.length
  //       } else {
  //         break
  //       }
  //     }
  //     this.#tail = this._queue.length - 1
  //     this._queue = newArray
  //     this._queue[this.#tail] = val
  //     this.#tail += 1
  //     this._head = 0
  //     this._length++
  //     return this
  //   }
  //   this._queue[this.#tail] = val
  //   this.#tail = (this.#tail + 1) % this._queue.length
  //   this._length++
  //   return this
  // }
  // // 从队头取出元素并删除队头元素
  // Queue.prototype.pop = function() {
  //   if (this._head == this.#tail) {
  //     return undefined
  //   }
  //   let result = 0
  //   if ((this._length * 4 + 4) < this._queue.length) { // 使用空间小于等于4倍的数组大小时
  //     let newArray = Array(this._queue.length >>> 1) // 缩容为原数组大小的2倍
  //     for (let i = 0; i < newArray.length; i++) {
  //       if (this._head != this.#tail) {
  //         newArray[i] = this._queue[this._head]
  //         this._head = (this._head + 1) % this._queue.length
  //       }else {
  //         break
  //       }
  //     }
  //     this._queue = newArray
  //     this._head = 0
  //     this.#tail = this._length
  //     result = this._queue[this._head]
  //     this._head++
  //     this._length--
  //     return result
  //   }
  //   result = this._queue[this._head]
  //   this._head = (this._head + 1) % this._queue.length
  //   this._length--
  //   return result
  // }
  // // 查看队头元素（没有查看队尾元素的功能）
  // Queue.prototype.peek = function() {
  //   return this._queue[this._head]
  // }
  // // 以及queue.size获取队列的长度
  // Object.defineProperty(Queue.prototype, "size", {
  //   get: function () {
  //     return this._length
  //   }
  // })

// 表示一个队列：即先进先出，后进后出
class Queue {
  #queue = Array(10)
  #head = 4 //指在队头的元素上
  #tail = 4 //指在最后一个元素的下一个位置上
  #length = 0

// 向队列中增加元素
add (val) {
  if (this.#head == this.#tail) {
    this.#queue[this.#head] = val
    this.#tail = (this.#tail + 1) % this.#queue.length
    this.#length++
    return this
  }
  if (this.#length + 1 == this.#queue.length) {
    let newArray = Array(this.#queue.length * 2)
    for (let i = 0; i < newArray.length; i++) {
      if (this.#head != this.#tail) {
        newArray[i] = this.#queue[this.#head]
        this.#head = (this.#head + 1) % this.#queue.length
      } else {
        break
      }
    }
    this.#tail = this.#queue.length - 1
    this.#queue = newArray
    this.#queue[this.#tail] = val
    this.#tail += 1
    this.#head = 0
    this.#length++
    return this
  }
  this.#queue[this.#tail] = val
  this.#tail = (this.#tail + 1) % this.#queue.length
  this.#length++
  return this
}
// 从队头取出元素并删除队头元素
pop () {
  if (this.#head == this.#tail) {
    return undefined
  }
  let result = 0
  if ((this.#length * 4 + 4) < this.#queue.length) { // 使用空间小于等于4倍的数组大小时
    let newArray = Array(this.#queue.length >>> 1) // 缩容为原数组大小的2倍
    for (let i = 0; i < newArray.length; i++) {
      if (this.#head != this.#tail) {
        newArray[i] = this.#queue[this.#head]
        this.#head = (this.#head + 1) % this.#queue.length
      }else {
        break
      }
    }
    this.#queue = newArray
    this.#head = 0
    this.#tail = this.#length
    result = this.#queue[this.#head]
    this.#head++
    this.#length--
    return result
  }
  result = this.#queue[this.#head]
  this.#head = (this.#head + 1) % this.#queue.length
  this.#length--
  return result
}
  // 查看队头元素（没有查看队尾元素的功能）
  peek () {
    return this.#queue[this.#head]
  }
// 以及queue.size获取队列的长度
  get size () {
    return this.#length
  }

}

  // var queue1 = new Queue()
  // function queueAdd(times) {
  //   while (times) {
  //     times--
  //     queue1.add(Math.random() * 1000 | 0)
  //   }
  //   return queue1
  // }
  // function queuePop(times) {
  //   while(times) {
  //     times--
  //     queue1.pop()
  //   }
  //   return queue1
  // }
 
