---
sidebarDepth: 2
sidebar: auto
---
## 面试题
  ### 数组去重
  常用方式有以下几种
  1. **`indexOf`** 或 **`includes`**

  ```javascript 
    
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

  2. 使用 **`Set`**  `Set`对象是值的集合，你可以按照插入的顺序迭代它的元素。  `Set`中的元素只会出现一次，即 `Set` 中的元素是唯一的。

  ```javascript
    function unique (arr) {
       return [...new Set(arr)]
    } 
  ```
  3. **`filter`**
  ```javascript
    function unique (arr) {
       return arr.filter((item, index, target) => {
         return index === target.indexOf(item)
       })
    } 
  ```

## Array
  123131
## find
## filter

