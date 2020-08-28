## ES6 中的新语法规划

- let /const
- class 创建类
- import / export :ES6 Module 模块的导入导出规范(JS 中的模块化规范 AMD->CMD-CommonJS->ES6 Module)
- Arrow Function 箭头函数
- 模板字符串
- 解构赋值
- "..." 扩展、展开、剩余运算符
- Promise / async / await
- for of 循环
- Set / Map
- Array / Object... 提供的新方法
- ...

## 数组去重

```javascript
//方案一
~(function () {
  function unique() {
    let obj = {},
      _this = this;
    for (let i = 0; i < _this.length; i++) {
      let item = _this[i];
      if (obj.hasOwnProperty(item)) {
        _this[i] = _this[_this.length - 1];
        _this.length--;
        i--;
        continue;
      }
      obj[item] = item;
    }
    obj = null;
    return _this;
  }
  Array.prototype.myUnique = unique;
})();

let arr = [1, 3, 3, 4, 5, 5, 2, 1, 2, 3];
console.log(arr.myUnique()); //[1, 3, 2, 4, 5]
```

```javascript
//方案二
~(function () {
  function unique() {
    let _this = this;
    _this = new Set(_this);
    _this = Array.from(_this);
    return _this;
  }
  Array.prototype.myUnique = unique;
})();
let arr = [1, 3, 3, 4, 5, 5, 2, 1, 2, 3];
console.log(arr.myUnique()); //[1, 3, 4, 5, 2]
```

```javascript
//第三种不推荐
~(function () {
  function unique() {
    let _this = this;
    for (let i = 0; i < _this.length; i++) {
      let item = _this[i],
        newArr = _this.slice(i + 1);
      if (newArr.includes(item)) {
        _this.splice(i, 1);
        i--;
      }
    }
    return _this;
  }
  Array.prototype.myUnique = unique;
})();
let arr = [1, 3, 3, 4, 5, 5, 2, 1, 2, 3];
console.log(arr.myUnique()); // [4, 5, 1, 2, 3] 数组顺序改变了
```

### query-url-params

> 解析 url 地址中问号传参的信息

```javascript
~(function () {
  /**
   * getParam:获取url问号传参中的某一个参数对应的值
   * @params
   *      key:当前传递key对应的属性值
   * @return
   *      当前传递key对应的属性值
   */
  function getParam(key) {
    let obj = {},
      _this = this,
      askIn = _this.indexOf("?");
    if (!askIn) return;
    let a = document.createElement("a"),
      str = null;
    a.href = _this;
    str = a.search.substring(1);

    // let str = _this.split("?").reverse()[0];//这样也行
    str.split("&").forEach((item) => {
      let [key, val] = item.split("=");
      obj[key] = val;
    });

    return obj[key];
  }
  String.prototype.getParam = getParam;
})();

let url = "locallhost?key1=val1&key2=val2&key3=val3";
console.log(url.getParam("key3")); //val3
```

### 柯理化函数

```javascript
//es5
function fn(x, y) {
  return function (m) {
    return x + y + m;
  };
}
let res = fn(1, 2)(3);
console.log(res); //=>6 1+2+3

//es6
let fn1 = (x, y) => (m) => x + y + m;
let res1 = fn1(1, 2)(3);
console.log(res1); //=>6 1+2+3
```

### call 和 apply 的重写

```javascript
~(function () {
  //随机函数名
  function randomName() {
    let time = new Date().getTime;
    return "$sun" + time;
  }
  //自定义call
  function myCall(context = window, ...args) {
    let _this = this,
      res = null,
      fn = randomName();
    context[fn] = _this;
    res = context[fn](...args);
    delete context[fn];
    return res;
  }
  //自定义apply
  function myApply(context = window, args) {
    let _this = this,
      res = null,
      fn = randomName();
    context[fn] = _this;
    res = context[fn](...args);
    delete context[fn];
    return res;
  }
  ["myCall", "myApply"].forEach((item) => {
    Function.prototype[item] = eval(item);
  });
})();
let obj = { name: "sun" };
function fn(x, y) {
  this.total = x + y;
  return this;
}
let res = fn.myCall(obj, 1, 2);
console.log(res);
//res=>{name:'sun',totla:3}
res = fn.myApply(obj, [1, 2]);
console.log(res);
//res=>{name:'sun',totla:3}
```

### to-array

```javascript
let utils = (function () {
  //es5
  //   function toArray() {
  //     return [].slice.call(arguments, 0);
  //   }
  //es6
  let toArray = (...args) => args;
  return {
    toArray,
  };
})();

let arr = utils.toArray(1, 2, 3);
console.log(arr);
//arr=[1,2,3]
arr = utils.toArray("a", 1, 2, 3);
console.log(arr);
//arr=['a',1,2,3]
```

### hasPubProperty

```javascript
~(function () {
  /**
   * hasPubProperty:检测某个属性是否为对象的公有属性
   * @params
   *      attr:要检测的属性名(字符串或数字)
   * @return
   *      [Boolean] 检测的结果 true/false
   */
  function hasPubProperty(attr) {
    if (typeof attr !== "string" && typeof attr !== "number") return false;
    return attr in this && !this.hasOwnProperty(attr);
  }
  Object.prototype.hasPubProperty = hasPubProperty;
})();
console.log(Array.prototype.hasPubProperty("push")); //false
console.log([].hasPubProperty("push")); //true
```

### class 重构

```javascript
class Model {
  constructor(element = document) {
    this.element = element;
  }
  show() {
    this.element.style.display = "block";
  }
  hide() {
    this.element.style.display = "none";
  }
  static setPosition(x, y) {
    this.position = { x, y };
  }
}
Model.position = {
  x: 100,
  y: 200,
};
```
