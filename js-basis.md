# JS 基础

## 常用浏览器内核

- webkit
- gecko
- presto
- trident

## 浏览器常用输出方式

- 在控制台输出 console.log/dir/table...

  > dir:输出一个对象的详细键值对信息
  > table:把一个多维 JSON 数组在控制台按照表格的方式呈现出来

- 浏览器窗口弹窗 alert(弹窗)/confrim(选择性弹窗)/prompt(在 confrim 基础上多了个输入框)
  > 三种方式输出的结果都必先经过 toString 转换为字符串,都会阻断 JS 代码的执行，只有当窗口关掉，JS 才会继续执行
- document.write
  > 在页面中写入信息，输出的结果都是字符串

## 创建变量的方法

- var (ES3)
- function (ES3)
- let (ES6)
- const (ES6)
- import (ES6)
- class (ES6)

## 数据类型分类

- 基本数据类型

  - Number
  - String
  - Boolean
  - Null
  - Undefined

- 引用数据类型
  - Object
  - Function
- ES6 新增
  - Symbol

### 数据类型的区别

> 基本数据类型按值操作，引用数据类型操作的是堆内存的空间地址

### Number 数字类型

#### NaN

> not a number :不是一个数，但它属于数字类型

> NaN 和任何值(包括自己)都不相等：NaN!=NaN,所以不能用相等的方式判断是否为有效数字

#### isNaN

> 检测一个值是否是为非有效数字，如果不是有效数字返回 true,反之返回 false

```
console.log(isNaN(10))//=>false
console.log(isNaN('aa'))//=>true
console.log(isNaN('10'))//=>false
'10'.toString()//=>10在比较
```

> 在使用 isNaN 进行检测的时候，首先会检测的值是否为数字类型，如果不是，先基于 Number()这个方法，把值转为数字类型，然后在检测

#### 把其他类型值转换为数字类型

- Number([val])

  > 按照浏览器从底层机制，把其它数据类型转换为数字

  - 字符串:看是否包含非有效数字字符，包含结果就是 NaN，''=>0
  - 布尔: true=>1 false=>0
  - null：0
  - undefined：NaN
  - 引用数据类型都要先转换为字符串在转换为数字
    - {}/正则/函数等 => NaN
    - []=>''=>0
    - ['12']=>'12'=>12
    - ['12','23']=>'12,23'=>NaN

  * string to number
    > 把字符串转换为数字，只要字符串中包含任意一个非有效数字字符(第一个点除外)结果都是 NaN,空字符串会变成数字零
    ```
    console.log(Number('12.5))//=>12.5
    console.log(Number('12.5px'))//=>NaN
    console.log(Number('12.5.5'))//=>NaN
    console.log(Number(''))//=>0
    ```
  * boolean to number
    ```
    console.log(true)// =>1
    console.log(false)//=> 0
    console.log(isNaN(false))//=> false
    ```
  * null to number -> 0

  * undefined to number -> NaN

  * object to number

    > 把引用数据类型转换为数字，是先把它基于 toString 方法转换为字符串，然后转换为数字

    ```
    console.log(Number({name:'sun'}))//=>NaN
    console.log(Number({}))//=>NaN
    对象.toString()=>[object Object]=>NaN
    console.log(Number([]))//=>0
    console.log(Number([12]))//=>12
    console.log(Number([12,23]))//=>NaN
    [12,23].toString()=>'12,23'
    ```

- parseInt/parseFloat([val],[进制])

  > 遵循按照字符串从左至右查找的机制找有效字符串(所以传递的值一定是字符串，不是也会转换为字符串然后查找)  
  > 也是转换为数字的方法，对于字符串来说，他是从左到右依次查找有效数字字符，直到遇到非有效数字字符，停止查找（不管后面是否还有数字，都不找了），把找到的当做数字返回 (如果不是字符串会先把他变成字符串在从左至右查找)，如果没有找到有效数字字符，也返回 NaN

  ```
  console.log(parseInt('12.5px'))//=>12
  console.log(parseFloat('12.5px'))//=>12.5
  console.log(parseInt('width:12.5px'))//=>NaN
  console.log(parseFloat(true))//=>NaN
  console.log(parseInt(''))//=>NaN
  ```

* ==
  > 进行比较的时候，可能要出现把其他类型值转换为数字

### String 字符串数据类型

> 所有用单引号、双引号、反引号(ES6 模板字符串)包起来的都是字符串

#### 其他类型值转换为字符串

- [val].toString()

  ```
  let a=12
  console.log(a.toString())//=>'12'
  console.log((NaN).toString()) //=>'NaN'
  null和undefined是禁止直接toString的
  (null).toString()//=>报错
  但是和undefined一样转换为字符串的结果就是'null'/'undefined'

  普通对象.toString()的结果是"[object Object]" =>?
  =>Object.prototype.toString方法不是转换为字符串，而是用来检测数据类型的
  ```

- 字符串拼接

  ```
  //四则运算法则中，除加法之外，其余都是数学计算，只有加法可能存在字符串拼接
  （一旦遇到字符串，则不是数学运算，而是字符串拼接）
  console.log('10'+10) //=>'1010'
  console.log('10'-10)//=>0
  console.log('10px'-10)//=>NaN

  10+[] -> 10+ ''-> '10'
  空数组变为数字，先要经历变为空字符串，遇到字符串，直接变为字符串拼接
  ```

### Boolean 布尔数据类型

> 只有两个值 true/false

#### 其他类型转为布尔类型

> 只有 0、NaN、''、null、undefined 五个值转换为 false，其余都转换为 true（没有任何特殊情况）

- Boolean([val])

  ```
  console.log(Boolean(0))//=>false
  console.log(Boolean(''))//=>false
  console.log(Boolean(' '))//=>true
  console.log(Boolean(null))//=>false
  console.log(Boolean(undefined))//=>false
  console.log(Boolean([]))//=>true
  console.log(Boolean([12]))//=>true
  console.log(Boolean(-1))//=>true
  ```

- !/!!

  > !:取反(先转为布尔，然后取反)  
  > !!:取反在取反，只相当于转换为布尔<=>Boolean

  ```
  console.log(!1)//=>false
  console.log(!!1)//=>true
  ```

- 条件判断

  > 如果条件只是一个值，不是==、===、!=、>=等这些比较，是要把这个值先转换为布尔类型，然后验证真假

  ```
  if(1) console.log('ceshi')//1=>true
  if('3px'+3) console.log('ceshi2')//'3px3'=>true
  if('3px'-2) console.log('ceshi3')//=>NaN-2=NaN=>false
  ```

### Null / Undefined

> null 和 undefined 都代表的是没有

- null:意料之中（一般都是开始不知道值，我们手动先设置为 null，后期再给予赋值操作）

  ```
  let num=null //=>let num=0
  一般最好用null作为初始的空值，因为零不是空值，他在栈内存中有自己的存储空间（占了位置）
  ```

- undefined ：意料之外(不是我能决定的)

  ```
  let num //创建一个变量没有赋值，默认值是undefined
  ```

### Object 对象数据类型

- 普通对象

> {[key]:[value],...}任何一个对象都是用零到多组键值对(属性名：属性值)组成的(并且属性名不能重复)  
> 一个对象的属性名只有数字或字符串(等基本类型值)

```
let person={name:'zs',age:22,msg:'测试',1:100}

//设置属性名属性值
//=> 属性名不能重复，如果属性名已经存在，不属于新增属于修改属性值
person.a='cs'
person.name='sun'
console.log(person.a)//=>'cs'
console.log(person.name)//=>'sun'

//删除属性
//=>真删除:把属性彻底删除
delete person[1]

//=>假删除:属性还在，值为空
person.a=null
console.log(person.a)//=>null

//获取属性名对应的属性值
=>对象.属性名
=>对象[属性名] 属性名是数字或者字符串格式的
=>如果当前属性名不存在，默认的属性值是undefined
=>如果属性名是数字，则不能使用点的方式获取属性值
console.log(person.name)//=>'zs'
console.log(person[age])//=>22
console.log(person.sex)//=>undefined

console.log(person[1])//=>100
//console.log(person.1)//SyntaxError:语法错误

```

- 数组是特殊的对象数据类型

  > 数组是特殊的对象

  - 1.我们中括号中设置的是属性值，它的属性名是默认生成的数字，从零开始递增，而且这个数字代表每一项的位置，称为‘索引’=>从零开始，连续递增，代表每一项位置的数字属性名
  - 2.天生默认一个属性名 length,存储数组的长度

  ```

  let ary=[1,'a',true,{}]
  console.log(ary.length)//=>4
  console.log(ary['length'])//=>4
  console.log(ary[1])//=>'a'
  //第一项索引为0 最后一项索引为ary.length-1
  console.log(ary[0])//=>1
  console.log(ary[ary.length])//=>{}
  //向数组末尾追加内容
  ary[ary.length]=100
  console.log(ary)//=>[1,'a',true,{},100]
  ```

### 函数 function

> 函数就是一个方法或者一个功能体，函数就是把实现某个功能的的代码放到一起进行封装，以后想要操作实现这个功能，只需要把函数执行即可=>'封装':减少页面中的冗余代码，提高代码重复使用率(低耦合高内聚)

> 生活中洗衣机就是一个函数，生产洗衣机就是封装一个函数(把实现某些功能的代码封装进来)，生产的时候，不知道用户洗衣服的时候放什么水、衣服、洗衣液、我们需要提供出入口(提供的入口在函数中叫做形参，执行的时候放的具体东西函数中叫做实参)，洗完衣服需要能拿出来，洗衣机提供了一个出口(在函数中叫做返回值：把函数处理的结果能够返回给外面用)

- 创建函数

  > 函数在堆内存中存储的是函数体中的代码，但是是按照字符串存储的

  ```
  //=>ES5老方式
  function [函数名]([形参变量1],...){
  //函数体：基于JS完成需要实现的功能
  return [处理后的结果]
  }

  ```

  - 匿名函数

    > 函数表达式:把一个匿名函数本身作为值赋值给其他东西，这种函数一般不手动触发，而且靠其他程序驱动触发执行(例如：触发某个时间的时候把它执行等)

    ```
      document.body.onclick=function(){}
      setTimeout(function(){},1000)//设置定时器，1000ms后执行匿名函数
    ```

    > 自执行函数:创建完一个匿名函数，紧接着就把当前函数加小括号执行

    ```
      (function(n){}(100))
    ```

  - 箭头函数 (ES6)
    > 如果函数体中只有一行,可以省略大括号和 return  
    > 形参默认值：当没有给形参传递实参色时候,执行默认值  
    > 箭头函数中没有 arguments，但是可以使用剩余运算符(...)获取到传递的实参集合(它是数组)  
    > 箭头函数中的 this 某些场景也是方便我们操作的
    ```
      let sum = (n,m) =>{
        return n+m
      }
      let test = (n = 0,m = 0) => n + m
    ```

- 形参
  > 创建函数的时候设置了形参变量，但是如果执行的时候并没有传递对应的实参值，那么形参变量默认的值是：undefined
- 返回值
  > 函数执行的时候，函数体内部创建的变量我们是无法获取和操作，如果要想获取内部的信息，我们需要基于 return 返回机制，把信息返回才可以  
  > return 返回的一定是值  
  > 没有写 return 函数默认返回值是 undefined  
  > 函数体中遇到 return，后面代码则不再执行了
- 执行函数
  > 每一次函数执行的目的都是把函数体中的代码(先从字符串变为代码)执行=>形成一个全新的私有栈内存
  ```
   [函数名]([实参1],...)
  ```

* 实参
  > 函数执行时传入的具体值
* arguments
  > 函数内置的实参集合
  - 类数组集合，集合中存储着所有函数执行时，传递的实参信息
  - 不论是否设置形参,arguments 都存在
  - 不论是否传递实参,arguments 也都存在
    > arguments.callee:存储的是当前函数本身(一般不用的，JS 严格模式下禁止使用这个属性)

## JS 中的数据类型检测

- typeof [val]:用来检测数据类型的运算符
  - 基于 typeof 检测出来的结果
    - 1.首先是一个字符串
    - 2.字符串中包含对应的类型
  - 局限性
    - 1.typeof null =>'object' 但是 null 并不是对象
    - 2.基于 typeof 无法细分出当前值是否是普通对象还是数组对象，因为只要是对象数据类型，返回的结果都是‘object'
- instanceof:用来检测当前实例是否属于某个类
- constructor:基于构造函数检测数据类型(也是基于类的方式)
- Object.prototype.toString.call()：检测数据类型的最好方法

## JS 中的操作语句

### 判断

> 条件成立做什么?不成立做什么?

- if/else if /else

  ```

  if(条件){
  条件成立执行
  }else if(条件 2){
  条件 2 成立执行
  }else{
  以上条件都不成立
  }

  ```

- 三元运算符:条件?条件成立处理的事情:不成立处理的事情

  - 1. 如果处理的事情比较多，可以用括号包起来，每一件事情用逗号分隔
  - 2. 如果不需要处理事情，可以使用 null/undefined 占位

  ```

  let a=10
  a>=10?console.log("true"):console.log('false')

  ```

- switch case :一个变量在不同值情况下的不同操作

  - 1.每一种 case 情况结束后最好都加上 break
  - 2.default 等价于 else,以上都不成立执行的操作
  - 3.不加 break，当前条件成立执行完成后，后面条件无论是否成立都要执行，直到遇到 break 为止(不加 break 可以实现变量在某些值的情况下做相同的事情)
  - 4.每一种 case 情况的比较用的都是==="绝对相等"

  ```

  let a = 10;
  switch (a) {
  case 1:
  console.log("1");
  break;
  case 5:
  console.log("5");
  break;
  case 10:
  console.log("10");
  break;
  default:
  console.log("null");
  }

  ```

#### == vs ===

> ==:相等(如果左右两边数据值不同，是默认先转换为相同的类型，然后比较)  
> '5'==5 =>true  
> ===:绝对相等(如果类型不一样，肯定不相等，不会默认转换数据类型)  
> '5'===5 => false  
> 项目中为了保证业务的严谨，推荐使用===

### 循环

> 重复做某些事情就是循环  
> 循环步骤

- 1.创建循环初始值
- 2.设置循环执行的条件
- 3.条件成立执行循环体中的内容
- 4.当前循环结束执行步长累计操作

  - for 循环
  - for in 循环
    > 用来循环遍历对象中的键值对的(continue 和 break 同样适用)
    > 对象中有几组键值对，循环就执行几次（除非 break 结束）
    > key 变量存储的值：当前对象的属性名
    > for in 在遍历的时候，优先循环数字属性名（从小到大）
    ```
      for(let key in obj){}
    ```
  - for of 循环(ES6 新增)
  - while 循环
  - do-while 循环

> 循环体中的两个关键字

- continue:结束当前这轮循环(continue),继续执行下一轮循环
- break:强制结束整个循环(break 后面代码也不再执行),而且整个循环直接结束

### 数学运算

> JS 中的加减乘除本应是数学运算（如果遇到的值不是数字类型，也需要基于 Number()方法把其转换为数字，再运算）；但是 JS 中加法有特殊情况：相加过程中遇到字符串直接变为字符串拼接

- 细节知识

```
  let i='10'
  i=i+1 => '10'+1 => '101'
  i+=1 => '10'+1 => '101'
  i++ => i=11
```

> `i++`是纯粹的数学运算
> `i++`和`++i` 都是数学运算中的累加 1，区别是计算的顺序

## 基础知识练习题

```
  1. !(!"Number(undefined)")

  2. isNaN(parseInt(new Date())) + Number([1]) + typeof undefined

  3. Boolean(Number('')) + ! isNaN(Number(null)) + Boolean("parseInt([])") + typeof !(null)

  4. parseFloat("1.6px") + parseInt("1.2px") + typeof parseInt(null)

  5. isNaN(Number(!!Number(parseInt("0.8"))))

  6. console.log(1+'2'+'2')

  7. !typeof parseFloat("0")

  8. Number("")

  9. typeof "parseInt(null)" + 12 + !!Number(NaN)

  10. !typeof (isNaN("")) + parseInt(NaN)

  11. typeof !parseInt(null) + !isNan(null)

```

## 自定义属性编程思想

> 前期把一些值存储到元素的自定义属性中，后期需要用到的时候，直接从属性上获取这些值即可
