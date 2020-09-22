## JS 高级

### 变量提升

> 浏览器为了能够让代码从上而下执行，首先会开辟一块内存(栈内存) => 作用域 或 执行上下文(context)
>
> - 1.执行代码 =>全局作用域
> - 2.存储变量以及基本数据类型的值

> 当浏览器开辟出供代码执行的栈内存后，代码并没有自上而下立即执行，而是继续做了一些事情：**把当前作用域中所有带 var/function 关键字的进行提前声明和定义=>变量提升机制**
>
> - 带 var 的只是提前声明(declare) var a; 如果只声明没有赋值，默认值是 undefined
> - 带 function 的不仅声明，还定义了(defined) "a=11"定义其实就是赋值，准确来说就是让变量和某个值进行关联
> - 函数表达式，由于是用 var 来创建一个变量，变量提升阶段只会声明变量，不会赋值。(真实项目中这种方式最常用，因为操作严谨)

> **变量提升关于条件判断的处理**

> 不管条件是否成立都要进行变量提升，但是函数有特殊性：在老版本浏览器中，确实不论条件是否成立，函数也是提前声明或者定义的，但是新版本浏览器中，为了兼容 ES6 严谨的语法规范，条件中的函数在变量提升阶段只能提前声明，不能提前定义

> 遇到引用类型值(对象和函数)
>
> - 1.开辟一块新的内存(堆内存 16 进制的内存地址)
> - 2.把内容存储在堆内存中(对象存储的是键值对,函数存储的是函数体中的代码字符串)
> - 3.让变量和地址关联在一起

> 自执行函数本身不进行变量提升(没名字)

**带 var 和不带 var 的区别**

```javascript
//=>在全局作用域下的区别
//不带var的：相当于给全局对象window设置了一个属性a
widow.a = 12;

a = 12;
console.log(a); //=>window.a

//带var的：是在全局作用域下声明了一个变量b（全局变量），但是在全局下声明的变量也同样相当于给window增加了一个对应的属性(只有全局作用域具备这个特点)

var b = 11;
console.log(b); //=>11
console.log(window.b); //=>11
```

### let、const 和 var 的区别

1. let 和 const 不存在变量提升机制
   > 创建变量的六种方式中：var/function 有变量提升，而 let/const/class/import 都不存在这个机制，但是在词法解析阶段也能确定当前变量是全局变量还是私有变量所以不能在 let 声明之前使用私有变量
2. var 允许重复声明，而不是 let 是不允许的

   > 在相同作用域中(或执行上下文中)

   - 如果使用 var/function 关键字声明变量并且重复声明，是不会有影响的(声明第一次之后，之后再遇到就不再重复声明了)
   - 但是使用 let/const 就不行，浏览器会效验当前作用域中是否已经存在这个变量了，如果已经存在了，则再次基于 let 等重复声明就会报错
   - 所谓重复是：不管之前通过什么办法，只要当前栈内存中存在了这个变量，我们使用 let/const 等重复再声明这个变量就是语法错误

   ```javascript
   //=>在浏览器开辟栈内存供代码自上而下执行之前，不仅有变量提升，还有很多其他操作=>"词法解析"/"词法检测"：就是检测当前即将要执行的代码是否会出现语法错误" SyntaxError"，如果出现错误，代码将不会再执行(第一行都不会执行)
   console.log(1);
   let a = 11;
   console.log(a);
   let a = 12; //=> Uncaught SyntaxError: Identifier 'a' has already been declared
   console.log(a);
   ```

3. 在全局作用域下用 var 声明的变量相当于给 window 设置了对应的属性，let 没有，只是个变量
4. let 能解决 typeof 检测时出现的暂时性死区问题(let 比 var 更严谨)

```javascript
//console.log(a)
//=> Uncaught ReferenceError: a is not defined

//console.log(typeof a)
//=>'undefined' 这是浏览器的bug，本应该报错因为没有a(暂时性死区)

console.log(typeof a);
//=>Uncaught ReferenceError: Cannot access 'a' before initialization

let a;
```

5. let 会产生私有的块级作用域，var 不会

### 闭包作用域

1. 创建函数

   - 开辟一个堆内存
   - 把函数体中的代码当做字符串存储进去
   - 把堆内存的地址赋值给函数名、变量名
   - **函数在哪创建，那么它执行的时候所需要查找的上级作用域就是谁**

2. 函数执行

   - 形成一个全新的"私有"作用域、栈内存/执行上下文 (执行一次形成一个，多个之间也不会产生相互影响)
   - 形参赋值 & 变量提升
   - 代码执行(把所属堆内存中的代码字符串拿出来一行行执行)
   - **遇到一个变量，首先看它是否为私有变量（形参和在私有作用域中声明的变量是私有变量）,是私有的就操作自己的，不是私有的则向上级作用域查找...一直找到全局作用域为止,如果没有找到可能会保错，找到了拿来用=> 作用域查找机制**
   - 私有变量和外界的变量没有必然关系，可以理解为被私有栈内存保护起来了，这种机制其实就是**闭包的保护机制**
     > 私有变量：在私有作用域中变量存储区存储的变量
     >
     > 1. 函数中带 var/let/const/function...的变量
     > 2. 形参变量也是私有变量

3. 关于堆栈内存释放问题 (以谷歌 webkit 内核为例)

   > 函数执行就会形成栈内存(从内存中分配的一块空间),如果内存都不能销毁释放，很容易就会导致栈内存溢出(内存溢出，电脑就卡死了),堆栈内存的释放问题是学习 JS 的核心知识之一

   - 堆内存释放问题

   - 打开浏览器形成的全局作用域是栈内存
   - 手动执行函数形成的私有作用域是栈内存
   - ES6 中的 let/const 形成的块级作用域也是栈内存

   - 全局栈内存：关掉页面的时候才会销毁
   - 私有栈内存：

     > 1. 一般情况下，函数只要执行完成，形成的私有栈内存就会被销毁释放掉(排除出现无限级递归,死循环)
     > 2. 如果栈内存中的某个东西(一般是堆地址)被私有作用域以外的事物给占用了，则当前私有栈内存不能立即被释放销毁(特点：私有作用域中的私有变量等信息也保留下来了)

     ```javascript
     //=>市面上认为的闭包：函数执行形成不能被释放的私有栈内存，这样的才是闭包
     function fn(){
         //...
     }
     fn()//=>函数执行形成栈内存，执行完成栈内存销毁
     function X(){
         return function(){//...}
     }
     let f=X()
     //=>f 占用了X形成的栈内存中的一个东西(返回值对应的堆),则X执行形成的栈内存不能被释放了
     ```

#### 闭包的两个作用

- 保护
- 保存

1. jQuery 前端经典的类库：提供了大量的方法供开发人员使用
   =>
   为了防止全局变量污染，JQ 中的方法和变量都需要用闭包保护起来

   > 导入 JQ 后，它里面有大量的方法，如果这些方法不保护起来，用户编写的方法很容易和 JQ 方法名字相同产生冲突，产生冲突可以理解为全局对象污染

   ```javascript
   //JQ源码
   (function (global, factory) {
     //...
     //typeof window!=="undefined"?window:this //=>验证当前所处环境的全局对象是window还是global等
     //factory( global );
   })(typeof window !== "undefined" ? window : this, function (
     window,
     noGlobal
   ) {
     var jQuery = function (selector, context) {
       //...
     };
     if (!noGlobal) {
       //=>通过给全局对象添加属性：jQuery和$，把私有的jQuery方法暴露到全局作用域下，供外面使用(等价于return jQuery)
       //=>外界需要使用函数中的私有内容，我们可以基于window.xxx和return xxx两种方式实现这个需求
       window.jQuery = window.$ = jQuery;
     }
   });
   //=>开始使用jquery
   jQuery(); //=>window.jQuery()
   $();
   ```

   在真实项目中，我们一般都要把自己写的内容放到一个闭包中，这样可以有效防止自己的代码和别人代码产生冲突(全局污染：真是项目中是要尽可能的减少对全局变量的使用的)；如果需要把自己写的东西给别人用，基于 `return` 和 `window.xxx` 等方式暴露给别人即可

   ```javascript
   var test = (function () {
     //... xxx写的代码
     return {
       name: "xxx",
     };
   })()(function () {
     //...yyy写的代码
     window.xxx = xxx;
   })();

   //... 这样写在某些角度上也是为了减少全局变量
   ```

2. 基于 let、const、class 等创建变量，会把所在大括号（除对象大括号之外）当做一个全新的私有块级作用域

   - 函数执行会产生私有的栈内存(作用域/执行上下文)

   ```javascript
   if (1 === 1) {
     var a = 10;
   }
   console.log(a); //=> 10 a是全局作用域
   ```

   ```javascript
   if (1 === 1) {
     let a = 2;
     //=>let会有块级作用域(现在大括号就是一个私有作用域) a是私有变量
   }
   console.log(a); //=>Uncaught ReferenceError: a is not defined
   ```

> 从性能角度讲，真实项目中应该减少对闭包的使用(因为闭包会产生不释放的栈内存，过多的使用容易导致内存溢出或者降低性能)

### this

> 函数执行的主体(不是上下文):意思是谁把函数执行的，那么执行的主体就是谁

#### 如何确定 this 是谁

1. 给元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的 this 是当前操作元素本身
2. 当方法执行的时候，看方法前面是否有点，没有点 this 就是 window 或者 undefined(严格模式下是 undefined)；有点，点前面是谁 this 就是谁
3. 在构造函数模式执行中，函数体中的 this 是当前类的实例

```javascript
var name = "sun";
function fn() {
  console.log(this.name);
}
var obj = {
  name: "努力就有所获",
  fn: fn,
};
obj.fn(); //=>this->obj

fn(); //=>this->window（非严格模式下，严格模式下是undefined）
//=>相当于window.fn()
```

### 构造函数

```javascript
function Fn(a, b) {
  this.a = a;
  this.b = b;

  // return 100;//返回的还是实例
  // return {a:1}
  // 如果手动return的是一个基本值，对返回的实例无影响，如果手动返回的是一个引用数据类型的值，会把默认返回的实例个替换掉(所以在构造函数模式下，我们一般不手动写return，防止把返回的实例给替换掉)
}
Fn(1, 2); //普通函数执行
let f = new Fn(1, 2);
// new Fn() 执行和普通函数执行的联系
```

> new 这种执行方式叫做"构造函数执行模式",此时的 Fn 不仅仅是一个函数名，被称为'类'，而返回的结果是一个对象，称为'实例'，而函数体中出现的 this 都是这个实例

> 基本数据类型在 JS 中的特殊性

1. 一定是自己所属类的实例
2. 但是不一定是对象数据类型的

   > 字面量创建方式(也是 Number 类的实例，也可以调取内置的公有方法)  
   > 构造函数创建模式(创建出来的实例是对象类型的)

> 构造函数执行，因为也具备普通函数执行的特点

1. 和实例有关系的操作一定是 this.xx=xxx，因为 this 是当前类创造出来的实例
2. 私有变量和实例没有必然的联系

> new 的时候不论是否加小括号，都相当于把 Fn 执行了，也创建了对应的实例，只不过不加小括号是不能传递实参的

### 函数的三种角色

- 函数数据类型
  1.  普通函数
  2.  类(内置类 or 自定义类)
- 对象数据类型
  1.  {}普通对象 []数组对象 /^\$/正则对象 Date 日期对象 Math 数学函数对象 arguments 等类数组对象 HTMLCollection/NodeList 元素或者节点集合类数组对象...
  2.  实例也是对象数据类型的
  3.  类的 prototype 也是对象数据类型的(Function.prototype 除外，它是一个匿名空函数)
  4.  函数也是对象

---

- 函数有三种角色
  1. 普通函数
     - 形参、实参、arguments、return、箭头函数
     - 私有作用域(栈内存、执行上下文)
     - 形参赋值&变量提升
     - 作用域链
     - 栈内存的释放和不释放(闭包)
     - ...
  2. 构造函数(类)
     - 类和实例
     - prototype 和 \_\_proto\_\_原型和原型链
     - instanceof
     - constructor
     - hasOwnProperty
     - ...
  3. 普通对象
     - 它是由键值对组成的
     - ...

### 面向对象

> 标记语言：html5/css3
>
> 编程语言：编程思想
>
> - 面向过程 c
> - 面向对象 java php c#(ASP.NET) javascript

**单例设计模式**

> 把描述当前事物特征的信息进行分组归类(减少全局变量的污染)这就是 js 中的单例设计模式

```javascript
//person 不仅仅被叫做变量名(对象名),也被称为"命名空间"
let person = {
  name: "sun",
  age: 22,
};
```

> 真实项目中的单例模式是这样的

```javascript
function fn(){}
let person=(function(){
    let fn=function(){}
    return {
        name:'sun',
        fn:fn
    }
})()
person.name
person.fn()
...

```

**工场模式**

> 批量化生产：把实现某个功能的代码进行封装，后期在想实现这个功能，直接执行函数即可

> - 低耦合：减少页面中冗余的代码
> - 高内聚：提高代码的重复使用率

```javascript
function createPerson(name,age){
    let person={}
    person.name=name
    person.age=age
    return person
}
let a=createPerson('sun',22)
a.name
a.age
...

```

**构造原型模式(正统面向对象编程)**

> 自己能够创造出自定义类和对应实例，构建起一套完整的面向对象模型

### 原型及原型链模式

1. 每一个函数数据类型的值，都有一个天生自带的属性：prototype(原型),这个属性的属性值是一个对象("用来存储实例公用属性和方法")

   - 普通的对象
   - 类(自定义类和内置类)

2. 在 prototype 这个对象中，有一个天生自带的属性：constructor，这个属性存储的是当前函数本身
   ```
   Fn.prototype.constructor===Fn
   ```
3. 每一个对象数据类型的值，也有一个天生自带的属性`__proto__`，这个属性指向"所属类的原型 prototype"
   - 普通对象、数组、正则、Math、日期、类数组
   - 实例也是对象数据类型的值
   - 函数的原型 prototype 属性的值也是对象类型的
   - 函数也是对象数据类型的值

**原型链查找机制**

> 1. 先找自己私有的属性，有则调取使用，没有继续找
> 2. 基于`__proto__`找到所属类原型上的方法(Fn.prototype)，如果还没有则继续基于`__proto__`往上找...一直找到 Object.prototype 为止

**hasOwnProperty**

> 检测某一个属性名是否为当前对象的私有属性
>
> `in`：检测这个属性是否属于某个对象(不管是私有属性还是公有属性，只要是它的属性结果就是 true)  
> 自己堆中有的就是私有属性,基于`__proto__`查找的就是公有属性(**proto**在 IE 浏览器中(EDGE 除外)给保护起来了,不让在代码中操作它 值为 undefined)

```javascript
let arr = [1, 2, 3];
console.log("0" in arr); //=>true
console.log("splice" in arr); //=>true
console.log(arr.hasOwnProperty("0")); //=>true
console.log(arr.hasOwnProperty("sort")); //=>false //sort是它的公有属性不是私有属性

console.log(Array.prototype.hasOwnProperty("hasOwnProperty")); //=>false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); //=>true
```

**自定义 hasPubProperty**

> 检测某个属性是否为对象的公有属性
>
> 方法：是它的属性，但不是私有的

```javascript
Object.prototype.hasPubProperty = function (property) {
  if (!["string", "number", "boolean"].includes(typeof property)) return false;
  let n = property in this,
    m = this.hasOwnProperty(property);
  return n && !m;
};
console.log(Array.prototype.hasPubProperty("push")); //false
console.log([].hasPubProperty("push")); //true
```

**重构类的原型**

> 让某个类的原型指向新的堆内存地址(重定向指向)
>
> - 问题 1：重定向后的空间不一定有 constructor 属性(只有浏览器默认给 prototype 开辟的堆内存中才存在 constructor)，这样导致类和原型机制不完整；所以需要我们手动在给新的原型空间设置 constructor 属性
> - 问题 2：在重新指向之前，我们需要确保原有原型的堆内存中没有设置属性和方法，因为重定向后，原有的属性和方法就没啥用了(如果需要克隆到新的原型堆内存中，我们还需要额外的处理)=>但是内置类的原型，由于担心这样的改变会让内置的方法都消失，所以禁止了我们给内置类原型的空间重定向，例如：Array.prototype={...}这样都没有用,如果想加方法 Array.prototype.xxx=function(){...}可以这样处理

```javascript
//批量给原型设置属性方法：设置别名
let proto=Fn.prototype
proto.getA=function(){}
proto.getB=function(){}
proto.getC=function(){}
...
//批量给原型设置属性方法：重构类的原型
Fn.prototype={
    constructor:Fn,
    getA:function(){},
    getB:function(){}
}
```

先开个胃

```javascript
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}
var c = fun(0).fun(1);
c.fun(2);
c.fun(3);
```

### this

> 每一个函数（普通函数、构造函数、内置类）都是 Function 这个内置类的实例，所以：函数.`__proto__===Function.prototype`，函数可以直接调取 Function 原型上的方法

> `Function.prototype=>function anonymous`()是个匿名函数

> call / apply / bind  
> 原型上提供的三个公有属性方法  
> 每一个函数都可以调用这个方法执行  
> 这些方法都是用来改变函数中的 this 指向的

```javascript
function fn(){}
fn.call()
//=>fn函数基于原型链找到Function.prototype的call方法，并且让其执行（执行的是call方法：方法中的this是fn）

fn.call.call()
//=>fn.call就是Function.prototype上的call方法，也是一个函数，只要是函数就能用原型上的方法，所以可以继续调用call来执行

Function.prototype.call=function $1(){...}

fn.call=>$1
fn.call()=>$1()//=>this:fn
fn.call.call()=>$1.call()=>//继续让call执行，this:$1

//实例.方法（）：都是找到原型上的内置方法，让内置方法先执行（只不过执行的时候做了一些事情会对实例产生改变，而这也是这些内置方法的作用），内置方法中的this一般都是当前操作的实例

```

`call方法`

> 语法：函数.call([context],[params],...)
>
> 函数基于原型链找到 Function.prototype.call 这个方法，并且把它执行，在 call 方法执行的时候完成了一些功能
>
> - 让函数执行
> - 把函数中的 this 指向改为第一个传递给 call 的实参
> - 把传递给 call 其余的实参，当做参数信息传递给当前函数
>
> 如果执行 call 一个实参都没有传递，非严格模式下是 this 是 window,严格模式下指向的是 undefined

```javascript
window.name = "window";
let obj = { name: "obj" };
function fn(n, m) {
  console.log(this.name);
}
fn(10, 20); //=>this：window 严格模式下是undefined
fn.call(obj); //=>this:obj
fn.call(obj, 1, 2); //=>this:obj n=1,m=2
fn.call(1, 2); //=>this:1 n=2 m=undefined

fn.call(); //=>this:window 严格下是undefined
fn.call(null); //this:window
//严格下是null (第一个参数传递的是null、undefined、不传,在非严格模式下this指向window，严格模式下传递的是谁this就是谁，不传this是undefined)
```

基于原生 js 实现 call 方法

```javascript
~(function () {
  function myCall(context) {
    context = typeof context !== "object" ? window : context;
    if (context === null) context = window;
    context.fn = this;
    let args = [...arguments];
    args.shift();
    let res = context.fn(...args);
    delete context.fn;
    return res;
  }
  Function.prototype.myCall = myCall;
})();
```

`apply`

> 和 call 方法一样，都是把函数执行，并且改变里面的 this 关键字的，唯一的区别就是传递给函数参数的方式不同
>
> - call 是一个个传参
> - apply 是按照数组传参

```javascript
let obj = { name: "sun" };
let fn = function (n, m) {
  console.log(this.name);
};
//=>让fn方法执行，让方法中的this变为obj，并且传递10、20
fn.call(obj, 10, 20);
fn.apply(obj, [10, 20]);
```

`bind`

> 和 call、apply 一样，也是用来改变函数中的 this 关键字的，只不过基于 bind 改变 this，当前方法并没有被执行，类似于预先改变 this

```javascript
let obj = { name: "sun" };
let fn = function (n, m) {
  console.log(this.name);
};
document.body.onclick = fn; //=>当事件触发，fn中的this:body

document.body.onclick = fn.call(obj); //=>点击body，让fn中的this指向obj

document.body.onclick = function () {
  //this:body
  fn.call(obj);
};
document.body.onclick = fn.bind(obj);
//=>bind的好处是：通过bind方法只是预先把fn中的this修改为obj此时fn并没有执行，当点击事件触发才会执行fn（call、apply都是改变this的同时立即把方法执行）
//=>在IE6-8中不支持bind方法 预先作啥事的思想被称为'柯理化函数'
```

`Object.create`

> 创建一个空对象 obj，并且让空对象 obj 作为参数所属构造函数的实例

`Object.defineProperty`

> 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

`Object.keys`

> 获取对象中所有的属性名，以数组的方式返回

`Object.assign`

> 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

### 函数的防抖和节流

- 函数防抖(debounce):不是某个事件触发就去执行函数，而是在指定的时间间隔内，执行一次，减少函数执行的次数

```javascript
/**
 * debounce:函数防抖
 * @params
 *      fn:要执行的函数
 *      wait:间隔等待的时间
 *      immediate:在开始边界触发还是结束边界触发执行(true：在开始边界)
 * @return
 *      可被调用的函数
 */
function debounce(fn, wait, immediate) {
  let result = null,
    timeout = null;
  return function (...args) {
    let context = this,
      now = immediate && !timeout;
    clearTimeout(timeout); //在设置新的定时器之前，把之前的定时器清除，因为防抖的目的是等待时间内，只执行一次
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) result = fn.call(context, ...args);
    }, wait);
    if (now) result = fn.call(context, ...args);
    return result;
  };
}
```

- 函数节流(throttle):为了缩减执行的频率，但不像防抖一样，一定时间内只能执行一次，而是一定时间内能执行多次

```javascript
/**
 * throttle:函数节流
 *  @params
 *    fn:需要执行的函数
 *    wait:设置间隔时间
 *  @return
 *    返回可被调用的函数
 */

function throttle(fn, wait) {
  let timeout = null,
    result = null,
    previous = 0; //上一次执行的时间点
  return function (...args) {
    let now = new Date(),
      context = this;

    let remaining = wait - (now - previous);
    //remaining小于等于0，表示上次执行至此所间隔时间已超过一个时间间隔
    if (remaining <= 0) {
      clearTimeout(timeout);
      previous = now;
      timeout = null;
      result = fn.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = new Date();
        timeout = null;
        result = fn.apply(context, args);
      }, remaining);
    }
    return result;
  };
}
```

### 定时器动画

> 浏览器中的定时器有两种，设置一个定时器，规定在等待时间之后执行某个方法

设置定时器

- setTimeout

  > 执行一次

- setInterval
  > 一直会执行下去(每间隔这么长时间都会执行)

> 设置定时器会有一个返回值：是一个数字，代表当前是第几个定时器

清除定时器

> 清除第几个定时器

- clearTimeout(数字)
- clearInterval(数字)

- window.requestAnimationFrame()
  > JS 中比定时器动画更好的方式（HTML5 中提供的）

封装一个简易的动画库

```javascript
/**
 * animate:动画库
 * @params
 *    curEle:当前要运动的元素
 *    target:目标样式值
 *    duration:总时间
 *    callback:回调函数,动画完成后做什么事
 */
function animate(curEle, target = {}, duration = 1000, callback) {
  //准备T/B/C/D
  let time = 0,
    begin = {},
    change = {};
  for (let key in target) {
    begin[key] = parseFloat(getComputedStyle(curEle)[key]);
    change[key] = target[key] = begin[key];
  }
  let timer = setInterval(() => {
    time += 16.7;
    if (time >= duration) {
      clearInterval(timer);
      timer = null;
      for (let key in target) {
        curEle["style"][key] = target[key] + "px";
      }
      typeof callback === "function" ? callback() : null;
      return;
    }
    for (let key in target) {
      let cur = (time / duration) * change[key] + begin[key];
      curEle["style"][key] = cur + "px";
    }
  }, 16.7);
}
```

## 插件组件封装思想

> 1. 基于面向对象的方式来处理
>    - 调取一次插件当于创建插件的一个实例
>    - 这样私有的可以设置，公有的方法也可以设置
> 2. 要保证的几个事
>    - 灵活且功能强大(适配更多的应用场景)
>    - 容错性和可扩展性强
>    - 追求极致的性能和优秀的代码管理方式
>    - 开源精神

**细节知识点**

> 1.  封装公共方法的时候，如果需要传递的参数过多(超过两个就可以理解为多了),则不要定义为形参，让用户依次传递，这样会受到顺序、传或者不传等因素的影响，管理起来很复杂:可以把需要传递的值统一放到一个对象中(一般都是 options),这样传递的信息可传可不传，顺序也随便，最后把传递的信息覆盖默认的信息即可，方便管理，也方便进行二次扩展
>
> 2.  后期把需要用到的信息都挂载到当前类的实例中，这样后面不管在哪个方法中用这些信息，只要能获取到实例，直接通过实例获取即可
>
> 3.  插件中需要使用的工具类方法，一般放到类的私有属性上(普通对象)

### 回调函数

> 把一个函数当做实参传递给另外一个函数，在另外一个函数执行的过程中，把传递过来的函数执行，这种机制就是回调函数
>
> 真实场景应用
>
> - AJAX 异步请求成功做什么事
> - 浏览器内置的一些方法支持回调函数
> - 插件组件封装中的钩子函数(生命周期函数)

### 重写字符串内置方法 replace

1. 正则在字符串中匹配几次，我们传递的回调函数就会被执行几次(前提：正则设置了 global 修饰符)
2. 每一次执行回调函数，都把当前正则匹配的信息(既有大正则,也有小分组的)传递给回调函数
3. 还要接受回调函数的返回值,返回的是啥内容，就要把当前字符串中正则匹配这一部分内容替换成啥

```javascript
~(function () {
  //处理字符串
  function handleString(str, val1, val2) {
    let index = str.indexOf(val1);
    return str.substring(0, index) + val2 + str.substring(index + val1.length);
  }
  function _replace(reg, callback) {
    let _this = this.substring(0),
      isGlobal = reg.global,
      arr = reg.exec(this);

    while (arr) {
      //捕获到的结果是数组(执行回调函数，把捕获的结果传递给它);还要接受回调函数执行的返回值，用返回值替换字符串中当前正则匹配的内容
      if (typeof callback === "function") {
        let res = callback.apply(null, arr);
        _this = handleString(_this, arr[0], res);
      }
      arr = reg.exec(this);
      //不设置global的情况执行一次
      if (!isGlobal) break;
    }
    return _this;
  }

  String.prototype._replace = _replace;
})();

let str = "{0}年{1}月{2}日",
  arr = ["2020", "09", "22"];
str = str._replace(/\{(\d)\}/g, function (content, group1) {
  return "@#" + arr[group1];
});
console.log(str); //=>@#2020年@#09月@#22日
```

### 自定义 each 方法

> 遍历数组、类数组、对象中的每一项  
> @params  
>  obj:需要迭代的数组、类数组、普通对象  
>  callback:回调函数(每遍历数组中的某一项，就会把回调函数执行一次；而且需要把当前遍历的内容和索引[属性值和属性名]传给回调函数；接收回调函数的返回结果，如果是 false，则结束当前的循环，如果是其他值，让返回的值替换数组中的当前项，如果没有返回值，则什么都不处理...)  
>  context:传递的第三个参数，可以改变回调函数中的 this 指向，不传默认是 window  
> @return  
>  返回一个新的数组或者对象(原来的数组或者对象不变)

```javascript
//自定义检测数据方法
let _obj = {
    isNumber: "Number",
    isBoolean: "Boolean",
    isString: "String",
    isNull: "Null",
    isUndefined: "Undefined",
    isSymbol: "Symbol",
    isObject: "Object",
    isArray: "Array",
    isRegExp: "RegExp",
    isDate: "Date",
    isFunction: "Function",
    isWindow: "Window",
  },
  _toString = _obj.toString,
  _type = {};

for (let key in _obj) {
  if (!_obj.hasOwnProperty(key)) break;
  _type[key] = (function () {
    let reg = new RegExp("^\\[object " + _obj[key] + "\\]$");
    return function anonymous(val) {
      return reg.test(_toString.call(val));
    };
  })();
}

function _each(obj, callback, context = window) {
  let isLikeArray =
    _type.isArray(obj) || ("length" in obj && _type.isNumber(obj.length));
  typeof callback !== "function" ? (callback = Function.prototype) : null;
  //数组或者类数组
  if (isLikeArray) {
    let arr = [...obj];
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i],
        result = callback.call(context, item, i);
      if (result === false) break;
      if (typeof result === "undefined") continue;
      arr[i] = result;
    }
    return arr;
  }
  //对象的处理
  let _obj = { ...obj };
  for (let key in _obj) {
    if (!_obj.hasOwnProperty(key)) break;
    let value = _obj[key],
      result = callback.call(context, value, key);
    if (result === false) break;
    if (typeof result === "undefined") continue;
    _obj[key] = result;
  }
  return _obj;
}

let obj = {
  name: "sun",
  age: 22,
};
let obj2 = _each(
  obj,
  function (value, key) {
    console.log(this); //=>document
    console.log(value, key); //=> sun name 22 age
    if (key === "name") {
      return "soleil";
    }
  },
  document
);
console.log(obj, obj2);
//{name: "sun", age: 22} {name: "soleil", age: 22}

function func() {
  let arr = _each(arguments, (item, index) => {
    console.log(item, index); //=>10 0, 20 1, 30 2
    if (index >= 2) return false;
    return item * 10;
  });
  console.log(arguments, arr);
  //=>Arguments(4) [10, 20, 30, 40, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  //=>[100, 200, 30, 40]
}

func(10, 20, 30, 40);
```
