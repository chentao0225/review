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

**变量提升关于条件判断的处理**

> 不管条件是否成立都要进行变量提升，但是函数有特殊性：在老版本浏览器中，确实不论条件是否成立，函数也是提前声明或者定义的，但是新版本浏览器中，为了兼容 ES6 严谨的语法规范，条件中的函数在变量提升阶段只能提前声明，不能提前定义

> 遇到引用类型值(对象和函数)
>
> - 1.开辟一块新的内存(堆内存 16 进制的内存地址)
> - 2.把内容存储在堆内存中(对象存储的是键值对,函数存储的是函数体中的代码字符串)
> - 3.让变量和地址关联在一起

> 自执行函数本身不进行变量提升(没名字)

**带 var 和不带 var 的区别**

```
//=>在全局作用域下的区别
//不带var的：相当于给全局对象window设置了一个属性a
 widow.a=12

 a=12
 console.log(a)//=>window.a

 //带var的：是在全局作用域下声明了一个变量b（全局变量），但是在全局下声明的变量也同样相当于给window增加了一个对应的属性(只有全局作用域具备这个特点)

 var b=11
 console.log(b)//=>11
 console.log(window.b)//=>11
```

### let、const 和 var 的区别

1. let 和 const 不存在变量提升机制
   > 创建变量的六种方式中：var/function 有变量提升，而 let/const/class/import 都不存在这个机制，但是在词法解析阶段也能确定当前变量是全局变量还是私有变量所以不能在 let 声明之前使用私有变量
2. var 允许重复声明，而不是 let 是不允许的

   > 在相同作用域中(或执行上下文中)

   - 如果使用 var/function 关键字声明变量并且重复声明，是不会有影响的(声明第一次之后，之后再遇到就不再重复声明了)
   - 但是使用 let/const 就不行，浏览器会效验当前作用域中是否已经存在这个变量了，如果已经存在了，则再次基于 let 等重复声明就会报错
   - 所谓重复是：不管之前通过什么办法，只要当前栈内存中存在了这个变量，我们使用 let/const 等重复再声明这个变量就是语法错误

   ```
   //=>在浏览器开辟栈内存供代码自上而下执行之前，不仅有变量提升，还有很多其他操作=>"词法解析"/"词法检测"：就是检测当前即将要执行的代码是否会出现语法错误" SyntaxError"，如果出现错误，代码将不会再执行(第一行都不会执行)
   console.log(1)
   let a=11
   console.log(a)
   let a=12 //=> Uncaught SyntaxError: Identifier 'a' has already been declared
   console.log(a)
   ```

3. 在全局作用域下用 var 声明的变量相当于给 window 设置了对应的属性，let 没有，只是个变量
4. let 能解决 typeof 检测时出现的暂时性死区问题(let 比 var 更严谨)

```
    //console.log(a)
    //=> Uncaught ReferenceError: a is not defined

    //console.log(typeof a)
    //=>'undefined' 这是浏览器的bug，本应该报错因为没有a(暂时性死区)

    console.log(typeof a)
    //=>Uncaught ReferenceError: Cannot access 'a' before initialization

    let a
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

     ```
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

   ```
   //JQ源码
   (function(global,factory){
       //...
       //typeof window!=="undefined"?window:this //=>验证当前所处环境的全局对象是window还是global等
       //factory( global );
   })(typeof window !== "undefined" ? window : this,function(window,noGlobal){
       var jQuery = function( selector, context ) {
           //...
       }
       if(!noGlobal){
           //=>通过给全局对象添加属性：jQuery和$，把私有的jQuery方法暴露到全局作用域下，供外面使用(等价于return jQuery)
           //=>外界需要使用函数中的私有内容，我们可以基于window.xxx和return xxx两种方式实现这个需求
           window.jQuery=window.$=jQuery
       }
   })
   //=>开始使用jquery
   jQuery()//=>window.jQuery()
   $()

   ```

   在真实项目中，我们一般都要把自己写的内容放到一个闭包中，这样可以有效防止自己的代码和别人代码产生冲突(全局污染：真是项目中是要尽可能的减少对全局变量的使用的)；如果需要把自己写的东西给别人用，基于 `return` 和 `window.xxx` 等方式暴露给别人即可

   ```
   var test=(function(){
       //... xxx写的代码
       return {
           name:'xxx'
       }
   })()

   (function(){
       //...yyy写的代码
       window.xxx=xxx
   })()

   //... 这样写在某些角度上也是为了减少全局变量
   ```

2) 基于 let、const、class 等创建变量，会把所在大括号（除对象大括号之外）当做一个全新的私有块级作用域

   - 函数执行会产生私有的栈内存(作用域/执行上下文)

   ```
       if(1===1){
           var a=10;
       }
       console.log(a)//=> 10 a是全局作用域
   ```

   ```
   if(1===1){
       let a=2;
       //=>let会有块级作用域(现在大括号就是一个私有作用域) a是私有变量
   }
   console.log(a)//=>Uncaught ReferenceError: a is not defined
   ```

> 从性能角度讲，真实项目中应该减少对闭包的使用(因为闭包会产生不释放的栈内存，过多的使用容易导致内存溢出或者降低性能)

### this

> 函数执行的主体(不是上下文):意思是谁把函数执行的，那么执行的主体就是谁

#### 如何确定 this 是谁

1. 给元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的 this 是当前操作元素本身
2. 当方法执行的时候，看方法前面是否有点，没有点 this 就是 window 或者 undefined(严格模式下是 undefined)；有点，点前面是谁 this 就是谁
3. 在构造函数模式执行中，函数体中的 this 是当前类的实例

```
var name='sun'
function fn(){
    console.log(this.name)
}
var obj={
    name:"努力就有所获",
    fn:fn
}
obj.fn()//=>this->obj

fn()//=>this->window（非严格模式下，严格模式下是undefined）
//=>相当于window.fn()

```

### 面向对象

> 标记语言：html5/css3
>
> 编程语言：编程思想
>
> - 面向过程 c
> - 面向对象 java php c#(ASP.NET) javascript

**单例设计模式**

> 把描述当前事物特征的信息进行分组归类(减少全局变量的污染)这就是 js 中的单例设计模式

```
//person 不仅仅被叫做变量名(对象名),也被称为"命名空间"
let person={
    name:'sun',
    age:22
}
```

> 真实项目中的单例模式是这样的

```
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

```
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
3. 没一个对象数据类型的值，也有一个天生自带的属性`__proto__`，这个属性指向"所属类的原型 prototype"
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

```
let arr=[1,2,3]
console.log('0' in arr)//=>true
console.log('splice' in arr)//=>true
console.log(arr.hasOwnProperty('0'))//=>true
console.log(arr.hasOwnProperty('sort'))//=>false //sort是它的公有属性不是私有属性

console.log(Array.prototype.hasOwnProperty('hasOwnProperty'))//=>false
console.log(Object.prototype.hasOwnProperty('hasOwnProperty'))//=>true

```

**自定义 hasPubProperty**

> 检测某个属性是否为对象的公有属性
>
> 方法：是它的属性，但不是私有的

```
Object.prototype.hasPubProperty=function(property){
    if(!['string','number','boolean'].includes(typeof property))return false
    let n=property in this,
        m=this.hasOwnProperty(property)
    return n&&!m
}
console.log(Array.prototype.hasPubProperty('push'))//false
console.log([].hasPubProperty('push'))//true
```
