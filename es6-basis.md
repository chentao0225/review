## ES6 的基础语法

### let / const

> ES6 中新增用来创建变量和常量的

```javascript
let a = 12;
a = 13;
console.log(a); //13

const b = 11;
b = 12; // Uncaught TypeError:Assignment to constant varibale.
//基于const创建的变量，变量存储的值不能被修改(常量)
console.log(b);
```

> let 和 var 的区别

- let 不存在变量提升(当前作用域中，不能在 let 声明前使用变量)
- 同一作用域下，let 不允许重复声明
- let 能解决 typeof 暂时性死区问题
- 全局作用域中，使用 let 声明的变量并没有给 window 加上对应的属性
- let 会存在块作用域（除对象以外的大括号都可被看作块级私有作用域

### 箭头函数及 this 问题

> ES6 中新增了创建函数的方式："箭头函数"
>
> 真实项目中是箭头函数和 function 这种普通函数混合使用

箭头函数简化了创建函数的代码

```javascript
//箭头函数的创建都是函数表达式方式(变量=函数),这种模式下，不存在变量提升，函数只能在创建完成后被执行(也就是创建的代码之后执行)
const fn=([形参])=>{
    //函数体
    return
}
fn([实参])

//形参只有一个，小括号可以不加
const fn1=n=>{}

//函数体中只有一句话，并且是return xx的，可以省略大括号和return等
const fn2=n=>return n*1

function fn3(n){
    return function(m){
        return m+(++n)
    }
}

const fn4=n=>m=>m+(++n)

```

箭头函数中没有 arguments，但是可以基于剩余运算符获取实参集合，而且 ES6 中是支持给形参设置默认值的

```javascript
let obj = {};
let fn = (context = window, ...args) => {
  //console.log(arguments);//Uncaught ReferenceError: arguments is not defined 箭头函数中没有arguments
  //...args 剩余运算符（把除第一项外的，其它传递的实参信息都存储到args这个数组集合中
  console.log(args);
};
fn(obj, 1, 2, 3); //context:obj,args:[1,2,3]
fn(); //this:window args:[]
```

箭头函数中没有自己的 this，它里面用到的 this，都是自己所处上下文中 this（真实项目中，一但涉及 this 问题，箭头函数慎用）

```javascript
window.name = "window";
let fn = (n) => {
  console.log(this.name);
};
let obj = {
  name: "OBJ",
  fn: fn,
};
//fn所处的上下文中的this是window
fn(10); //this:window
fn.call(obj, 10); //this:window 不是预期的OBJ
document.body.onclick = fn; //this:window 不是预期的BODY
obj.fn(10); //this:window
```

```javascript
let obj = {
  name: "OBJ",
  fn: function () {
    //this:obj 普通函数是有自己的this
    let f = () => {
      console.log(this);
    };
    f(); //this:obj
    return f;
  },
};
let f = obj.fn();
f(); //this:obj
```

真实项目中的一个应用

> 需求：1s 中后把 obj 中的 name 改为'sun'

```javascript
let obj = {
  name: "obj",
  fn: function () {
    //es5
    //   setTimeout(function(){
    //       console.log(this)//window
    //       this.name='sun'//this不对
    //   },1000)
    let _this = this; //把需要的this提前用变量存起来
    setTimeout(function () {
      console.log(this); //window
      _this.name = "sun";
    }, 1000);

    //es6
    setTimeout(() => {
      console.log(this); //obj
      this.name = "sun";
    }, 1000);
  },
};
```

### 解构赋值

> 让左侧出现和右侧值相同的结构，以此快速获取到我们需要的内容
>
> 真实项目中最常用的就是对数组和对象的解构赋值

### "..."的作用

- 扩展运算符（多用在解构赋值中）
- 展开运算符（多用在传递实参中）
- 剩余运算符（多用在接收实参中）

```javascript
//解构赋值
let [n, ...m] = [1, 2, 3];
// n:1
// m:[2,3]

//传递实参
let arr=[1,2,3,4,5,6]
let min=Math.min(...arr)
//数组克隆(浅克隆)
let cloneArr=[...arr]
//对象克隆(浅克隆)
let obj={name:'sun',age:'22'}
let cloneObj={...obj,sex:'男'}

//接收实参
let fn=(n,...arr){
    //n:10 arr:[2,3,4,5,6]
}
fn(10,2,3,4,5,6)

```

### class 创建类

```javascript
//传统es3/es5中创建类的方法
function Fn() {
  this.x = 100;
}
Fn.prototype.getX = function () {
  console.log(this.x);
};
var f = new Fn();
f.getX();

Fn(); //也可以把它当做普通函数执行

//还可以把Fn当做普通对象设置键值对
Fn.queryX = function () {};
Fn.queryX();
```

```javascript
//ES6中类的创建
class Fn {
  //等价于之前的构造函数体
  constructor(n, m) {
    this.x = 100;
  }
  //给实例设置私有属性
  y = 200;
  //直接写的方法就是加在原型上的===Fn.prototype.getX
  getX() {
    console.log(this.x);
  }

  //前面设置static的：把当前Fn当做普通对象设置的键值对
  static queryX() {}
  static z = 300;
}
//也可以在外面单独这样写
Fn.prototype.y = 200;
Fn.z = 300;

let f = new Fn(1, 2);
f.getX();
Fn.queryX();

Fn(); // Uncaught TypeError: Class constructor Fn cannot be invoked without 'new'
//class 创建的类只能new执行，不能当做普通函数执行
```

### ES6 中的模板字符串

```javascript
//ES3
let year='2020',
    month='08',
    day='26';

let res=今天是"+year+"年+"+month+"月"+day+"日

let ID='box'
let html='<ul id="'+ID+'"></ul>'
```

```javascript
//es6模板字符串语法``
//${} //模板字符串中书写js表达式的方式(凡是有输出结果的都可以被称为js表达式)
let year = "2020",
  month = "08",
  day = "26";

let res = `今天是${year}年${month}月${day}日`;

let ID = "box";
let html = `<ul id=${ID}>
<li>....</li>
</ul>`;
```

### this 和面向对象的另一种深入理解

```javascript
function sum() {
  //arguments:内置的实参集合（箭头函数中没有），不是数组是类数组(它不是数组的实例，不能直接使用数组的方法 arguments.__proto__===Object.prototype)
  let total = null;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
let total = sum(1, 2, 3, 4);
```

```javascript
//args:存储传递的实参集合
//eval:把字符串转换为js表达式执行
let sum = (...args) => eval(args.join("+"));
let total = sum(1, 2, 3, 4);
```

```javascript
function sum() {
  //把arguments转换为数组：借助数组原型上的slice方法，只要让this指向arguments，就相当于把arguments转换为新数组
  let args = [].slice.call(arguments, 0);
  return eval(args.join("+"));
}
let total = sum(1, 2, 3, 4);
```

不仅仅是一个方法就可以这样调用，很多数组方法，类数组都能用

```javascript
function sum(){
    let total=null
    [].forEach.call(arguments,item=>{
        total+=item
    })
    return total
}
let total=sum(1,2,3,4)
```

#### UI 组件库

> 有结构、样式、功能的库，里面提供很多开发中常用的组件，开发中直接把组件调取过来即可，无需从头开发（可能需要二次开发）

#### JSON 格式的数据

> 我们基于 AJAX 等其他方式从服务器获取的数据结果一般都是：JSON 格式或者 XML 格式
>
> - JSON 格式的字符串
> - JSON 格式的对象

> 把 JSON 格式的字符串转换为对象：window.JSON.parse

> 把对象转换为 JSON 格式的字符串：JSON.stringify

### 关于 sort 排序

> sort 中传递一个函数，函数中有 a/b，a 为当前项的后一项，b 为当前项，如果当前函数返回的是一个小于零的数，让 a 和 b 的位置互换，如果返回大于等于零的值,位置保持不变
