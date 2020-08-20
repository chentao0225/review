### Math

> 数学函数:但是不是一个函数，它是一个对象，对象中存储了很多操作数字的属性方法，因此被称为数学函数

```
console.log(typeof Math)//=>'object'
```

#### Math 中常用的属性和方法

1.Math.abs([number value])

> 获取绝对值(绝对值永远是正数或者零)
> 传递的不是数字类型的值：先基于 Number()转换为数字再处理

```
console.log(Math.abs(-12.5))//=>12.5
console.log(Math.abs(12))//=>12
console.log(Math.abs(0))//=>0
console.log(Math.abs('-1'))//=>1
console.log(Math.abs('-1px'))//=>NaN
console.log(Math.abs(true))//=>1

```

2.Math.ceil / floor([number value])

> 把一个数向上取整/向下取整

```
 console.log(Math.ceil(12))//=>12
 console.log(Math.ceil(12.1))//=>13
 console.log(Math.ceil(12.8))//=>13
 console.log(Math.ceil(-12.1))//=>-12
 console.log(Math.ceil(-12.9))//=>-12

 console.log(Math.floor(12))//=>12
 console.log(Math.floor(12.1))//=>12
 console.log(Math.floor(12.8))//=>12
 console.log(Math.floor(-12.1))//=>-13
 console.log(Math.floor(-12.9))//=>-13

```

3.Math.round([number value])

> 四舍五入

```
console.log(Math.round(12))//=>12
console.log(Math.round(12.3))//=>12
console.log(Math.round(12.5))//=>13 正数中 .5属于入
console.log(Math.round(12.9))//=>13
console.log(Math.round(-12.1))//=>-12
console.log(Math.round(-12.5))//=>-12  负数中 .5属于舍
console.log(Math.round(-12.9))//=>-13
```

4.Math.max / min([number value])

> 获取一堆数中的最大值和最小值

```
console.log(Math.max(1,3,5,7,98,6))//=>98
console.log(Math.min(1,3,5,7,98,6))//=>1
//思考题：如何基于Math.max/min获取数组中的最大值最小值?
console.log(Math.max([1,3,5,7,98,6]))//=>NaN 此处是只传一个值，是一个数组,和内置的语法要求不同
```

5.Math.sqrt([number value])/ pow([number value,...])

> sqrt：给一个数开平发
> pow:计算一个数的多少次幂

```
console.log(Math.sqrt(9))//=>3 符合N*N=M 这样的M才能整开平方
console.log(Math.sqrt(-9))//=>NaN 负数开不了平方
console.log(Math.pow(2,10))//=>1024
```

6.Math.random([number value])

> 获取 0~1 之间的随机小数

```
console.log(Math.random())
```

#### 扩展：获取[n~m]之间的随机整数

> 包含 n 也包含 m
> n<m
> Math.round(Math.random()\*(m-n)+n)

```
//获取1-10之间的随机整数
Math.round(Math.random()*(10-1)+1)

```
