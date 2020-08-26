## 正则表达式

> regular expression:RegExp
>
> 用来处理字符串的规则
>
> - 只能处理字符串
> - 它是一个规则：可以验证字符串是否符合某个规则(test)，也可以把字符串符合规则的内容捕获到(exec/match...)

```javascript
let str = "good good study,day day up!";
//=>学正则就是用来指定规则
let reg = /\d+/; //=>是否包含数字
reg.test(str); //=>false

str = "2020-08-26";
reg.exec(str); //=>['2020',index:0,inputs:'原始字符串']
```

### 编写正则表达式

创建方式有两种

```javascript
//字面量创建方式(两个斜杠之间包起来的，都是用来描述规则的元字符)
let reg1 = /\d+/;

//=>构造函数模式创建 两个参数：元字符字符串，修饰符字符串
let reg2 = new RegExp("\\d+");
```

### 正则表达式由两部分组成

- 元字符
- 修饰符

```javascript
/*常用元字符*/
//1.量词元字符：设置出现的次数

* 零到多次
+ 一到多次
? 零次或一次
{n} 出现n次
{n,} 出现n到多次
{n,m} 出现n到m次

//2.特殊元字符：单个或者组合在一起代表特殊的含义

\ 转义字符(普通->特殊->普通)
. 除\n(换行符)以外的任意字符
^ 以哪一个元字符作为开始
$ 以哪一个元字符作为结束
\n 换行符
\d 0~9之间的一个数字
\D 非0~9之间的一个数字(大写和小写的意思是相反的)
\w 数字、字母、下划线中的任意一个字符
\s 一个空白字符(包含空格、制表符、换页符等)
\t 一个制表符(一个Tab键：四个空格)
\b 匹配一个单词的边界
x|y x或者y中的一个字符
[xyz] x或者y或者z中的一个字符
[^xy] 除了x/y以外的任意字符
[a-z] 指定a-z这个范围中的任意字符 [0-9a-zA-Z_]===\w
[^a-z] 除了a-z这个范围中的任意字符 上一个的取反'非'
() 正则中的分组符号
(?:) 只匹配不捕获
(?=) 正向预查
(?!) 负向预查

//3.普通元字符：代表本身含义的
/sun/ 此正则匹配的就是'sun'

```

```javascript
//正则表达式常用的修饰符：i m g
i =>ignoreCase 忽略单词大小写匹配
m =>multiline 可以进行多行匹配
g =>global 全局匹配

/A/.test('lalala')//false
/A/i.test('lalala')//true

```

**元字符详细解析**

`^ $`

```javascript
let reg = /^\d/;
console.log(reg.test("sun")); //false
console.log(reg.test("2020sun")); //true
console.log(reg.test("sun2020")); //false
```

```javascript
let reg = /\d$/;
console.log(reg.test("sun")); //false
console.log(reg.test("2020sun")); //false
console.log(reg.test("sun2020")); //true
```

```javascript
let reg = /^\d/;
console.log(reg.test("sun")); //false
console.log(reg.test("2020sun")); //true
console.log(reg.test("sun2020")); //false
```

```javascript
//^/$两个都不加：字符串中包含符合规则的内容
let reg = /\d+/;

//^/$两个都加：字符串只能是和规则一致的内容
let reg2 = /^\d+$/;

//验证手机号(11位,第一个数字是1)

let regPhone = /^1\d{10}$/;
```

`\`

```javascript
//.不是小数点，是除\n外的任意字符
let reg = /^2.3$/;
console.log(reg.test("2.3")); //true
console.log(reg.test("2@3")); //true
console.log(reg.test("23")); //false
//基于转义符，让其只能代表小数点
reg = /^2\.3$/;
console.log(reg.test("2.3")); //true
console.log(reg.test("23")); //false

let str = "\\d";
reg = /^\d$/; //\d代表0-9的数字
console.log(reg.test(str)); //false
reg = /^\\d$/; //把特殊字符转换为普通的
console.log(reg.test(str)); //true
```

`x | y`

```javascript
let reg = /^18|29$/;
console.log(reg.test("18")); //true
console.log(reg.test("29")); //true
console.log(reg.test("129")); //true
console.log(reg.test("189")); //true
console.log(reg.test("182")); //true
//->直接x|y会存在很乱的优先级问题，一般我们写的时候都伴随着小括号进行分组，因为小括号改变处理的优先级=>小括号：分组

reg = /(18|29)$/;
console.log(reg.test("18")); //true
console.log(reg.test("29")); //true
console.log(reg.test("129")); //false
console.log(reg.test("189")); //false
//只能是18或者29中的一个了
```

`[]`

```javascript
//1.中括号中出现的字符一般都代表本身的含义
let reg = /^[@+]$/;
console.log(reg.test("@")); //true
console.log(reg.test("+")); //true
console.log(reg.test("@@")); //false
console.log(reg.test("@+")); //false

reg = /^[\d]$/; //=>\d在中括号中还是0-9
console.log(reg.test("d")); //false
console.log(reg.test("\\")); //false
console.log(reg.test("9")); //true
//2.中括号中不存在多位数

reg = /^[19]$/;
console.log(reg.test("1")); //true
console.log(reg.test("9")); //true
console.log(reg.test("19")); //false

reg = /^[10-29]$/; //1或者0-2或者9
console.log(reg.test("1")); //true
console.log(reg.test("9")); //true
console.log(reg.test("0")); //true
console.log(reg.test("2")); //true
console.log(reg.test("10")); //false
```

**常用的正则表达式**

1. 验证是否为有效数字

```javascript
/*
 *规则分析
 *1.可能出现+-号，也可能不出现
 *
 */
```
