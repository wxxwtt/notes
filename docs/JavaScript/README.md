---
sidebarDepth: 2
sidebar: auto
---
## 面试题
  ### 数组去重
  常用方式有以下几种
  1. **`indexOf`** 或 **`includes`**

  ```JavaScript 
     function unique (arr) {
       const newArr = []
       for(let i = 0; i < arr.length; i++) {
         if (newArr.indexOf(arr[i]) === -1) {
           newArr.push(arr[i])
         } 
         // includes
         // if (!newArr.includes(arr[i])) {
         //  newArr.push(arr[i])
         // } 
       }
       return newArr
     } 
  ```

  2. 使用 **`Set`**  `Set`对象是值的集合，你可以按照插入的顺序迭代它的元素。  `Set`中的元素只会出现一次，即 `Set` 中的元素是唯一的。(效率较高, `chrome 96` 版本)

  ```JavaScript
    function unique (arr) {
       return [...new Set(arr)]
    } 
  ```
  3. **`filter`**
  ```JavaScript
    function unique (arr) {
       return arr.filter((item, index, target) => {
         return index === target.indexOf(item)
       })
    } 
  ```


### var 和 let 关键字的作用域
  当使用 `var` 关键字声明变量时，它是全局声明的，如果在函数内部声明则是函数局部声明的。
  在 `let` 块、语句或表达式中使用关键字声明变量时，其范围仅限于该块、语句或表达式。  

  例如:  

  ```JavaScript
    var numArray = [];
    for (var i = 0; i < 5; i++) {
      numArray.push(i);
    }
    console.log(numArray);
    console.log(i);
  ```
  控制台输出 `[0, 1, 2, 3, 4] `和 `5` 。

  用 `var` 声明的变量是全局的, 当 `i++` 被执行时, 更新的是全局的变量 `i`, 执行过程类似如下
  ```JavaScript
    var numArray = [];
    var i;
    for (i = 0; i < 5; i ++) {
      numArray.push(i)
    }
    console.log(numArray);
    console.log(i);
  ```
  控制台输出 `[0, 1, 2, 3, 4] `和 `5` 。

  那么问题来了, 如果你想在一个函数在 `for` 循环中使用则会出现一个问题 例如下面的代码

  ```JavaScript
    var foo;
    for (var i = 0; i < 5; i++) {
      if (i === 3) {
        foo = function () {
          return i
        }
      }
    }
    console.log(foo())
  ```
  控制台输出 `5` 而不是 `3` 。这是因为`foo()`将始终引用更新后的 `全局变量i` 的值, 分配给的值 `i` 已更新，并且`foo()`返回全局 `i` 的值，而不是 `i` 在 `for` 循环中创建函数时的值

  再来看下面的代码: 
  ```JavaScript
    for (var i = 0; i < 5; i ++) {
      setTimeout(function () {
        console.log(i)
      }, 1000)
    }
  ```
  控制台没有输出 `0 1 2 3 4` 而是输出 `5 5 5 5 5`

  如果使用 `let` 关键字

  ```JavaScript
    var foo;
    for (let i = 0; i < 5; i++) {
      if (i === 3) {
        foo = function () {
          return i
        }
      }
    }
    console.log(foo())
  ```
  控制台输出 `3`

  ```JavaScript
    for (let i = 0; i < 5; i ++) {
      setTimeout(function () {
        console.log(i)
      }, 1000)
    }
  ```
  控制台输出 `0 1 2 3 4`

  这是因为使用 `let` 声明迭代变量时，JavaScript引擎在后台会为每个 迭代循环声明一个新的迭代变量。每个 `setTimeout` 引用的都是不同的变量实例，所以 输出的是我们期望的 值，也就是循环执行过程中每个迭代变量的值。

#### 总结:   
  1. `var` 声明的变量是全局作用域或者是函数作用域, 定义全局变量时 会创建window对象的属性
  2. `let` 声明的变量是块及作用域
  3. `let` 不会在全局声明时（在最顶部的范围）创建window 对象的属性。
  4. `let` 不可以在同一个函数或块作用域重复声明, `var` 可以重复声明



## find

## filter

