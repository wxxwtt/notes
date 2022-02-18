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



## Vue相关面试题
  ### 1. vue的生命周期
  * `beforeCreate` 组件初始化之后 进行数据侦听和事件/侦听器的配置之前同步调用

  * `created` 组件创建完成之后立即调用 在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 $el property 目前尚不可用。不能获取dom
  * `beforeMount`  在挂载之前被调用 相关的 `render` 函数首次被调用。
  * `mounted` 实例被挂载之后调用, 可以操作操作dom了 但是不保证所有的子组件也都挂载完成 如果要保证所有的是视图都渲染完毕在执行某些操作 可以在 `mount` 中使用 `$nextTick`
  ```javascript
    mount: funciton () {
      this.$nextTick(() => {
        // 仅在整个视图都被渲染之后才会运行的代码
      })
    }
  ```

  * `beforeUpdate`
    数据更新之后 dom更新之前被调用 适合在dom被更新之前访问它. 如移除手动添加的事件监听 

  * `updated`
    dom更新完毕之后被调用 但不会保证所有的子组件也都被重新渲染完毕, 如果你希望整个视图都渲染完毕, 可以再`update` 里使用`$nextTick`
    ```javascript
      updated: funciton () {
        this.$nextTick(() => {
          // 仅在整个视图都被渲染之后才会运行的代码
        })
      }
    ```

  * `activated`
    被`keep-alive`缓存的组件激活时使用
  * `deactivated`
    被`keep-alive`缓存的组件失活时使用
  * `beforeDestroy`
    实例销毁之前调用, 实例仍可以使用
  * `destory`
    实例销毁之后调用

  ### 2. 父子组件的渲染顺序
  
  父 `beforeCreate` ---> 父 `created` ---> 父 `beforeMount` ---> 子 `beforeCreate` ---> 子 `created` ---> 子 `beforeMount`
   ---> 子 `mounted` ---> 父 `mounted` ---> 父 `beforeUpdate` ---> 子 `beforeUpdate` ---> 子 `updated` ---> 父 `updated` ---> 父 `beforeDestroy` ---> 子 `beforeDeatroy` ---> 子 `destoryed` ---> 父 `destroyed`

   * 如果父组件没有向子组件传递数据 子组件修改自身的数据 则不会触发父组件的`beforeUpdate` 和 `updated`

  ### 3. 组件通信
  1. 父子组件通信
  父组件通过自定义属性传递 子组件通过`props`进行接收

  `father.vue`
  ```javascript
    <HelloWorld
      msg="Welcome to Your Vue.js App"
      :channel="channel"
      />
  ```
  `son.vue`
  ```javascript
    props: {
      msg: String,
      channel: String
    }
  ```
  如果子组件想要修改父组件传递过来的数据, 不要直接修改 因为这会变得很难维护, 有可能多个地方使用了父组件传递值,
  然可以使用 父组件向子组件传递一个自定义的方法, 子组件通过`$emit`来触发传递过来的自定义方法
  `father.vue`
  ```javascript
    <HelloWorld
      msg="Welcome to Your Vue.js App"
      :channel="channel"
      @changeChannel="changeChannel"
      />

      methods: {
        changeChannel (msg) {
          this.channel = msg
        }
      }
  ```
  `son.vue`
  ```javascript
    props: {
      msg: String,
      channel: String
    }
    methods: {
      clickChannel () {
        this.$emit('changeChannel', '国际要闻')
      }
    }
  ```
  兄弟组件通信 可以使用 `eventBus`  `eventBus.$emit('handle')`触发  `eventBus.$on('handle')监听`  `eventBus.$off('handle')` 移除监听
  
  未完待续...

## undefined 和 null
  ```javascript
      console.log(undefined == null);
      console.log(undefined == false);
      console.log(null == false);
  ```


  之前记得 `undefined、null、0、-0、'' 、NaN` 会被转换成 `false`
  所以一开始上面的结果被认为会打印 `true true true`  可是在浏览器一运行却发现不是这么回事
   ```javascript
      console.log(undefined == null);  // true
      console.log(undefined == false); // false
      console.log(null == false); // false
  ```
  这是怎么回事呢？ 查阅MDN文档如下
  * 相等运算符（==和!=）比较算法比较两个操作数。可以大致概括如下：
  
  * 如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回true。
  * 如果一个操作数是null，另一个操作数是undefined，则返回true。

  如果两个操作数是不同类型的，就会尝试在比较之前将它们转换为相同类型：
  * 当数字与字符串进行比较时，会尝试将字符串转换为数字值。
  * 如果操作数之一是Boolean，则将布尔操作数转换为1或0。 如果是true，则转换为1。如果是 false，则转换为0。
  * 如果操作数之一是对象，另一个是数字或字符串，会尝试使用对象的valueOf()和toString()方法将对象转换为原始值。

  * JS高级里有说 要比较相等性之前，不能将null和undefined转换成其他任何值。

    所以进一步得出 上面的运算过程如下  `false` 会被隐式的转换为 0  即 `undefined == 0 和 null == 0` 结果为 `false` 因为`undefined和null自身没有任何方法` 无法被类型转换 


## ios 和 android 在移动端端的兼容性问题
  1像素边框
  .border {
    bottom:0;
    left:0;
    content: '';
    width:100%;
    height:1px;
    border-top: 1px solid #000;
    transform: scaleY (0.5);
  }

  时间格式
  ios 不支持 '2021-02-28 9:00'  可以将其转换为 '2021-02-28 9:00'.replace(/-/g, '/');

  ios 页面滚动不流畅 可以设置div 设置 css 属性
   .box : {
      -webkit-overflow-scrolling: touch; 
   }


  
   

## filter

