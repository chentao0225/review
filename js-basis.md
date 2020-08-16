# JS 基础

### 创建变量的方法

- var (ES3)
- function (ES3)
- let (ES6)
- const (ES6)
- import (ES6)
- class (ES6)
-

### 数据类型分类

- 基本数据类型
  - Number
  - String
  - Boolean
  - Null
  - Undefined
  - Symbol
- 引用数据类型
  - Object
  - Function

## Number

### NaN

> not a number :不是一个数，但它属于数字类型

NaN 和任何值(包括自己)都不相等：NaN!=NaN,所以不能用相等的方式判断是否为有效数字

### isNaN

> 检测一个值是否是为非有效数字，如果不是有效数字返回 true,反之返回 false

```
console.log(isNaN(10))//=>false
console.log(isNaN('aa'))//=>true
console.log(isNaN('10'))//=>false
'10'.toString()//=>10在比较
```

在使用 isNaN 进行检测的时候，首先会检测的值是否为数字类型，如果不是，先基于 Number()这个方法，把值转为数字类型，然后在检测

### 把其他类型值转换为数字类型

- Number([val]):通过浏览器渲染规则

  - string to number
    把字符串转换为数字，只要字符串中包含任意一个非有效数字字符(第一个点除外)结果都是 NaN,空字符串会变成数字零
    ```
    console.log(Number('12.5))//=>12.5
    console.log(Number('12.5px'))//=>NaN
    console.log(Number('12.5.5'))//=>NaN
    console.log(Number(''))//=>0
    ```
  - boolean to number
    ```
    console.log(true)// =>1
    console.log(false)//=> 0
    console.log(isNaN(false))//=> false
    ```
  - null -> 0 undefined->NaN

  - object to number
    把引用数据类型转换为数字，是先把它基于 toString 方法转换为字符串，然后转换为数字
    ```
    console.log(Number({name:'sun'}))//=>NaN
    console.log(Number({}))//=>NaN
    对象.toString()=>[object Object]=>NaN
    console.log(Number([]))//=>0
    console.log(Number([12]))//=>12
    console.log(Number([12,23]))//=>NaN
    [12,23].toString()=>'12,23'
    ```

- parseInt/parseFloat([val],[进制])：也是转换为数字的方法，对于字符串来说，他是从左到右依次查找有效数字字符，知道遇到非有效数字字符，停止查找（不管后面是否还有数字，都不找了），把找到的当做数字返回 (如果不是字符串会先把他变成字符串在从左至右查找)

```
console.log(parseInt('12.5px'))//=>12
console.log(parseFloat('12.5px'))//=>12.5
console.log(parseInt('width:12.5px'))//=>NaN
console.log(parseFloat(true))//=>NaN
```

- == 进行比较的时候，可能要出现把其他类型值转换为数字
