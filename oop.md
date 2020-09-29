## 面向对象(OOP)和 this 的综合复习

**什么是面向对象?**
>面向对象是一种编程思想，JS本身就是基于面向对象构建出来的(例如：JS中有很多的内置类，像Promise就是ES6中新增的一个内置类，我们可以基于new Promise来创建一个实例,来管理异步编程，我在项目中Promise也经常用，自己也研究过它的源码...)，我之前看过一点框架源码，我们平时用的vue/react/jquery也是基于面向对象构建出来的，他们都是类，平时开发的时候都是创建他们的实例来操作的；当然我直接在真实项目中，也封装过一些组件插件(例如：dialog、拖拽、...)，也是基于面向对象开发的，这样可以创造不同的实例，来管理私有的属性和公有的方法，很方便...
>
> JS中的面向对象，和其它编程语言还是有略微不同的，JS中类和实例是基于原型和原型链机制来处理的；而且JS中关于类的重载、重写、继承也和其它语言不太一样...
### 一、OOP 面向对象编程

> 在 JS 中面向类、实例进行程序设计，就是经典的面向对象编程
>
> - 类和实例的创建（构造函数模式）
> - `prototype` / `__proto__` （原型和原型链）
> - 函数的三种角色
> - 基于内置类原型扩展方法，实现链式写法
> - 借用内置类原型上的方法，实现一些特殊的需求（例如：把类数组转换为数组）
> - 细小的知识点：instaceof 、constructor 、hasOwnProperty...
> - 类的继承封装和多态
> - ....


**构造函数**

```javascript
function Fn(n, m) {
  let plus = n + m,
    minus = n - m;
  this.x = plus;
  this.y = minus;
  this.print = function () {
    console.log(this.x + this.y);
  };
}
let f1 = new Fn(30, 20);
f1.print();
console.log(f1.plus); //undefined
console.log(f1 instanceof Fn); //true
let f2 = new Fn();
console.log(f1.print === f2.print); //false

Fn(1, 2);
window.print(); //2
//普通函数执行
//1.形成私有的栈内存（私有的作用域scope）
//2.形参赋值&变量提升 n=1,m=2
//3.代码执行 this=>window
//4.没有return返回值
```

> 构造函数执行

1. 开辟一个新的私有作用域
2. 形参赋值&变量提升
3. 浏览器在当前作用域中创建一个实例对象@a,并且让 this 指向它
4. 代码执行
   - this => 当前类的实例@a
   - this.xxx=xxx 都是给当前实例@a 设置私有属性
   - 除此之外的私有变量等和@a 这个实例没有必然的关系
5. 即使我们不设置 return，浏览器也会默认把实例@a 返回，而外面的 f1 接收到的就是返回的实例，所以也说 f1 是 Fn 这个类的实例（如果手动返回的是引用类型值，会以用户返回的为主，也就是返回的不再是 Fn 的实例，如果返回的值是基本数据类型值，对原有的操作无影响）

**原型：`prototype` 和原型链：`__proto__`**

- 每一个函数都自带一个属性：prototype，它的属性值是一个对象
- prototype 这个对象中有一个默认的属性：constructor,存储函数本身
- 每一个对象都有一个属性:`__proto__`,属性值是所属类的`prototype`
  - 普通对象、数组、正则、日期等都是对象
  - 类的实例是对象（基本数据类型值虽然是所属类的实例，但不是对象）
  - protoype 原型属性值也是对象
  - 函数本身也是一个对象

```javascript
function Fn() {
  this.x = 2;
  this.y = 1;
  this.getX = function () {
    console.log(this.x);
  };
}
Fn.prototype.getX = function () {
  console.log(this.x);
};
Fn.prototype.getY = function () {
  console.log(this.y);
};

let f1 = new Fn();
let f2 = new Fn();

console.log(f1.getX === f2.getx); //false
console.log(f1.getY === f2.getY); //true
console.log(f1.__proto__.getY === f2.__proto__.getY); //true
console.log(f1.__proto__.getX === f2.getX); //false
console.log(f1.getX === Fn.prototype.getX); //false
console.log(f1.constructor); //Fn
console.log(Fn.prototype.__proto__.constructor); //Object

f1.getX(); //this->f1 ->2
f1.__proto__.getX(); //this->f1.__proto__ ->undefined
f2.getY(); //this->f2 ->1
Fn.prototype.getY(); //this->Fn.prototype->undefined
```

![原型和原型链](/assets/原型和原型链.png)

**函数三种角色**

- 普通函数（闭包作用域、作用域链）
- 构造函数（类、实例、原型、原型链）
- 普通对象（键值对）

三种角色之间没有必然的联系

```javascript
//js中运算符的优先级
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

![函数的三种角色](/assets/函数三种角色.png)

**基于内置类原型扩展方法，实现链式写法**

```javascript
let arr=[1,2,2,1,3,2,1]
arr.sort((a,b)=>a-b)
//arr是Array数组类的实例，所以可以调取Array.prototype上的方法，sort方法中的this是arr,当前要排序的数组实例(底层理解：sort是内置方法，它可以实现排序，arr.sort(...)本意：arr先基于__proto__找到Array.prototype上的sort方法，并且把sort方法执行，方法中的this是arr，sort方法在执行的时候，会把this对应的数组进行排序处理)


//slice执行的时候，方法中this是谁，就相当于把谁克隆成一份全新的数组出来
Array.prototype.slice=function(){
    let newArr=[]
    for(let i=0;i<this.length;i++){
        newArr.push(this[i])
    }
    return newArr
}

let newArr=arr.slice(0)
newArr=Array.prototype.slice.call(arr,0)


function fn(){
    //arguments类数组集合（实参集合）:不是Array的实例，它就是一个对象而已，不能直接使用数组中的方法(=>把类数组转换为数组)
    let arr=Array.prototype.slice.call(arguments,0)
    arr=[].slice.call(arguments,0)

    //借用数组原型上的forEach方法，实现给类数组进行循环(内置方法中的this是谁，其实当前方法就在操作谁)
    [].forEach.call(arguments,item=>{
        //...
    })
}
fn(1,2,3,4,5)
```

内置方法很多，但是不一定完全够用，很多时候需要自己像内置类的原型上扩展方法来实现一些需求

```javascript
~(function () {
  function unique() {
    //注意：this是谁就给谁去重
    let temp = {};
    for (let i = 0; i < this.length; i++) {
      let item = this[i];

      if (typeof temp[item] !== undefined) {
        this[i] = this[this.length - 1];
        this.length--;
        i--;
        continue;
      }
      temp[item] = item;
    }
    temp = null;
    //注意：返回的结果如果还是数组，则继续可以调取Array.prototype上的其他方法，实现"链式写法"
    return this;
  }
  Array.prototype.myUnique = unique;
})();

let arr = [1, 2, 2, 3, 1, 1, 3, 3, 2];
arr.myUnique().reverse().push("a");
//Array.prototype.myUnique.call(arr)
```

### 二、this 问题

> this 函数执行的主体：谁执行的
>
> this 是谁和函数在哪执行和在哪定义都没有关系，想要分清执行主体，记住以下规律

- 给元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的 this 是当前元素本身
- 方法执行，看方法名前面是否有点，有点，点前面谁，this 就是谁；没有点 this 是 window(JS 在严格模式下，没有点 this 是 undefined)
  - "use strict" 开启严格模式
  - 自执行函数、回调函数等方法中 this 一般是 window
- 在构造函数执行过程中，构造函数中的 this 是当前类的实例
- 使用 call、apply、bind 可以改变函数中的 this 指向
- ES6 箭头函数中没有自己的 this，所用的 this 是继承上下文中的

```javascript
function fn(n, m) {
  this.total = n + m;
}
let obj = { name: "obj" };
fn(1, 2); //this:window

// obj.fn(1,2) //报错：obj中没有fn属性
document.body.onclick = fn; //点击后fn中的this是body
document.body.onclick = function () {
  //this:body
  fn(1, 2); //this:window
};

fn.call(); //this:window 不传或者传递null/undefined都是
fn.call(obj, 1, 2); //this:obj
fn.apply(obj, [1, 2]); //this:obj apply要求传递的参数是数组
document.body.onclick = fn.bind(obj, 1, 2);
//bind是预处理this,此时fn还没有执行，只是把this改为了obj，点击body的时候才执行=>"柯理化函数"(预处理机制)
```

构造函数中的 this

```javascript
function Fn() {
  this.x = 1;
  this.y = 2;
}
Fn.prototype.sum = function () {
  console.log(this.x + this.y);
};
let f = new Fn(); //Fn中的this：f 当前类的实例
f.sum(); //this:f
Fn.prototype.sum(); //this:Fn.prototype
f.__proto__.sum(); //this:f.__proto__
```

```javascript
//ES6的写法
class Fn {
  constructor() {
    //this:当前Fn类实例
    this.x = 1;
    thix.y = 2;
  }
  //直接写的方法是放到原型上的
  sum() {
    console.log(this.x + this.y);
  }
  //static 修饰的都是把Fn当做普通对象来设置键值对
  static unique() {}
}
Fn.prototype.name = "sun";
Fn.age = 10;
let f = new Fn();
Fn.unique();
//Fn()//Uncaught TypeError: Class constructor Fn cannot be invoked without 'new'
```

箭头函数中 this

```javascript
windom.name = "window";
let obj = {
  name: "obj",
  fn: () => {
    console.log(this.name);
  },
};
obj.fn(); //this:window
obj.fn.call(obj); //this:window
//-------------------------------
//需求点击body 1s后给body添加一个属性count为1
document.body.onclick = function () {
  //this:body
  let _this = this;
  /*
  setTimeout(function(){
      //this:window
      _this.count=1
  },1000)*/

  setTimeout(() => {
    //this:没有自己的this，继承上下文中的也就是body
    this.count = 1;
  }, 1000);
};
```

关于 this 这块的问题:

- 重写 Function.prototype 中内置 call/apply 方法（bind 可以自己先研究）
- fn.call.call.call(fn2) ...这道阿里面试题
- 获取数组中的最大值和最小值：Math.min.apply(Math,arr)...

### 类

1. 封装
   > 低耦合高内聚
2. 多态
   > 重载和重写
      > 重载：方法名相同，形参个数或类型不一样(JS中不存在真正意义上的重载，JS中重载指的是同一个方法，根据传参不同，实现出不同的效果)
      > 重写：在类的继承中，子类可以重写父类中的方法
3. 继承
   > 子类继承父类中的属性和方法(目的是让子类的实例能够调取父类中的属性和方法)
   - 原型继承
      >让父类中的属性和方法在子类实例的原型上
      >
      特点：
          1. 不像其它语言中的继承一样(其它语言的继承一般是拷贝继承，也就是子类继承父类，会把父类中的属性和方法拷贝一份到子类中，供子类的实例调取使用)，它是把父类的原型放到子类实例的原型链上，实例想调取这些方法，是基于`__proto__`原型链查找机制完成的
          2. 子类可以重写父类上的方法(这样会导致父类其它的实例也受到影响)
          3. 父类中私有或者公有的属性方法，最后都会变为子类中公有的属性和方法
   - call继承
      >child方法中把parent当做普通函数执行，让parent中的this指向child的实例，相当于给child的实例设置了很多私有属性或者方法
      特点:
        1. 只能继承父类私有的属性或者方法(因为把parent当做普通函数执行，和其原型上的属性和方法没有关系)
        2. 父类私有的变为子类私有的
   - 寄生组合继承
     > call继承+类似于原生继承
     特点：
      >父类私有和公有的分别是子类实例的私有和公有属性方法(推荐)
   - ES6继承
     > class child extents parent{}   
     > 子类只要继承父类，可以不写constructor,一但写了，则在constructor中的第一句话必须是super()  
     > 不写constructor,浏览器会自己默认创建constructor(...args){super(...args)}  
     > super() 把父类当做普通方法执行，给方法传递参数，让方法中的this是子类的实例