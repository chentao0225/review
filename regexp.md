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
 *2.一位0-9都可以，多位首位不能是0
 *3.小数部分可能没有，一但有后面必须有小数点+数字
 */
let reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;
```

2. 验证密码

```javascript
//数字、字母、下划线
//6~16位
let val = "abc123",
  reg = /^\w{6,16}$/;
console.log(reg.test(val))

//不用正则
function checkPwd(val){
    if(val.length>16||val.length<6){
        console.log('长度必须介于6-16位之间')
        return
    }
    let area=['1','a',...]//包含数字下划线字母
    for(let i=0;i<val.length;i++){
        let item=val[i]
        if(!area.includes(item)){
            alert("格式不正确")
            return
        }
    }
}
```

3. 验证真实姓名

```javascript
/*
 * 1.汉字 [\u4E00-\u9FA5]
 * 2. 名字长度2~10位
 * 3.可能有译名 ·汉字
 */
let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
```

4. 验证邮箱

```javascript
/*
 *1.开头是数字字母下划线（1到多位）
 *2.还可以是 -数字字母下划线或者.数字字母下划线，整体零到多次
 *3.邮箱的名字由"数字、字母、下划线、-、."几部分组成，但是-/.不能连续出现也不能作为开始
 *4. @后面紧跟着：数字、字母（1-多位）
 *5.@后面可以是：.com.cn | abc@a-b-c.com
 */
let reg = /^\w+((-\w+)|(\.\w+))*@[0-9a-zA-Z]+((-|\.)[0-9a-zA-Z]+)*\.[a-zA-Z0-9]+$/;
```

5. 身份证号码

```javascript
/*
 * 1.一共18位
 * 2.最后一位数可能是x
 *
 * 身份证前六位：省市县
 * 中间八位 年月日
 * 最后四位
 *   最后一位 x/数字
 *   倒数第二位 偶女 奇男
 *
 */
let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})\d(\d|X)$/;
```

**正则两种创建方式的区别**

```javascript
    //构造函数因为传递的是字符串，\需要写两个才代表斜杠
    let reg=/\d+/g
    reg=new RegExp("\\d+","g")
    //正则表达式中的部分内容是变量存储的值

    let str='sun'
    reg=/^@"+str+"@$/
    //两个斜杠中间包起来的都是元字符(如果正则中要包含某个变量的值，则不能使用字面量方式创建)
    console.log(reg.test("@sun@"))//false
    console.log(reg.test("@""strrrr@"))//true
    //这种情况只能使用构造函数方式(因为它传递的规制是字符串，只有这样才能进行字符串拼接)
    reg=new RegExp("^@"+str+"@$")
    console.log(reg.test("@sun@"))//true
```

**正则的捕获**

> 实现正则的捕获的方法
>
> - 正则 RegExp.prototype 上的方法
>   - exec
>   - test
> - 字符串 String.prototype 上支持正则表达式处理的方法
>   - replace
>   - match
>   - split
>   - ...

### 基于 exec 实现正则的捕获

> 1. 捕获到的结果是 null 或者一个数组
>
>    - 第一项：本次捕获到的内容
>    - 其余项：对应小分组本次单独捕获的内容
>    - index：当前捕获内容在字符串中的其实索引
>    - input：原始字符串
>
> 2. 没执行一次 exec，只能捕获一个符合正则规则的，但是默认情况下，执行一百遍，获取的结果永远都是第一个匹配到的，其余的捕获不到=>正则捕获的懒惰性:默认只捕获第一个

```javascript
let str = "sun2019yangfan2020qihang2021";
let reg = /\d+/;
console.log(reg.exec(str)); //["2019", index: 3, input: "sun2019yangfan2020qihang2021", groups: undefined]
console.log(reg.exec(str)); //["2019", index: 3, input: "sun2019yangfan2020qihang2021", groups: undefined]
//=>实现正则的前提是：当前正则要和字符串匹配，如果不匹配捕获的结果是null
reg = /^\d$/;
console.log(reg.test(str)); //false
console.log(reg.exec(str)); //null
```

懒惰性的解决办法

> 懒惰性捕获的原因：默认情况下 lastIndex 的值不会修改，每一次都是从字符串开始位置查找，所以找到的永远只是第一个
>
> 解决办法:全局修饰符 g

```javascript
let str = "sun2019yangfan2020qihang2021";

let reg = /\d+/;
console.log(reg.lastIndex); //0
//下面匹配捕获是从str索引零的位置开始找
console.log(reg.exec(str)); //["2019".....]
console.log(reg.lastIndex); //0
//第一次匹配捕获完成，lastIndex没有改变，所以下一次exec依然是从字符串最开始找，找到的永远是第一个匹配到的

reg = /\d+/g;
console.log(reg.exec(str)); //["2019".....]
console.log(reg.lastIndex); //7
//设置全局匹配修饰符g后，第一次匹配完，lastIndex会自己修改
console.log(reg.exec(str)); //["2020".....]
console.log(reg.lastIndex); //18
console.log(reg.exec(str)); //["2021".....]
console.log(reg.lastIndex); //28
console.log(reg.exec(str)); //null
//当全局捕获后，再次捕获的结果是null，但是lastIndex又回归了初始值零，再次捕获又从第一个开始了
console.log(reg.lastIndex); //0
console.log(reg.exec(str)); //["2019".....]

//----------------------------------
let reg1 = /\d+/g;
if (reg1.test(str)) {
  //验证一下：只有正则和字符串匹配是在捕获
  console.log(reg1.lastIndex); //7
  //基于test匹配验证后，lastIndex已经被修改为第一次匹配后的结果，所以下一次捕获不再从头开始了
  console.log(reg1.exec(str)); //["2020".....]
}
```

自定义一个方法 execAll,执行一次可以把所有匹配的结果捕获到(前提正则一定要设置全局修饰符 g)

```javascript
~(function () {
  function execAll(str = "") {
    //进来后的第一件事，是验证当前正则是否设置了g，不设置则不能在进行循环捕获，否则会导致死循环
    if (!this.global) return this.exec(str);
    let arr = [],
      res = this.exec(str);
    while (res) {
      arr.push(res[0]);
      res = this.exec(str);
    }
    return arr.length === 0 ? null : arr;
  }
  RegExp.prototype.execAll = execAll;
})();

let reg = /\d+/g;
console.log(reg.execAll("sun2019@2020sun")); //["2019","2020"]
//字符串中的match方法，可以在执行一次的情况下，捕获到所有匹配的数据(前提：正则设置了修饰符g)
console.log("sun2019@2020sun".match(reg)); //["2019","2020"]
```

正则的分组捕获

```javascript
let str = "130828199012042112";
let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})\d(?:\d|X)$/;
console.log(reg.exec(str));
console.log(str.match(reg));
// ["130828199012042112", "130828", "1990", "12", "04", "21", index: 0, input: "130828199012042112", groups: undefined]
/*
 *第一项：大正则匹配的结果
 *其余项：每一个小分组单独匹配捕获的结果
 *如果设置了分组(改变优先级),但是捕获的时候不需要单独捕获，可以基于?:来处理
 */
```

```javascript
//既要捕获到{数字},也想单独的把数字也获取到，例如：第一次找到{0}还需要单独获取0
let str = "{0}年{1}月{2}日";
//不设置g只匹配一次，exec和match获取的结果一致（既有大正则匹配的信息，也有小分组匹配的信息）
let reg = /\{(\d+)\}/;
console.log(reg.exec(str));
console.log(str.match(reg));
//["{0}", "0", index: 0, input: "{0}年{1}月{2}日", groups: undefined]

reg = /\{(\d+)\}/g;
console.log(str.match(reg)); //["{0}", "{1}", "{2}"]
//多次匹配的情况下，match只能把大正则匹配的内容获取到，小分组匹配的信息无法获取

let arrBig = [],
  arrSmall = [],
  res = reg.exec(str);
while (res) {
  console.log(res);
  let [big, small] = res;
  arrBig.push(big);
  arrSmall.push(small);
  res = reg.exec(str);
}
console.log(arrBig, arrSmall); //["{0}", "{1}", "{2}"] ["0", "1", "2"]
```

分组的第三个作用：分组引用

```javascript
let str = "book";
let reg = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/;
//分组引用就是通过\数字 让其代表和对应分组出现一模一样的内容
console.log(reg.test("book")); //true
console.log(reg.test("deep")); //true
console.log(reg.test("some")); //false
```

**正则捕获的贪婪性**

> 默认情况下，正则捕获的时候，是按照当前正则所匹配的最长结果来获取的

```javascript
let str = "sun2019@2020sun";
let reg = /\d+/g;
console.log(str.match(reg)); //["2019", "2020"]

//在量词元字符后面设置'?'取消捕获时候的贪婪性(按照正则匹配的最短结果来获取)
reg = /\d+?/g;
console.log(str.match(reg)); //["2", "0", "1", "9", "2", "0", "2", "0"]
```

问号在正则中的五大作用：

- 问号左边是非量词元字符：本身代表量词元字符，出现零到一次
- 问号左边是量词元字符：取消捕获时候的贪婪性
- (?:) 只匹配不捕获
- (?=) 正向预查
- (?!) 负向预查

**其他正则捕获的方法**

1. test 也能捕获(本意是匹配)

```javascript
let str = "{0}年{1}月{2}日";
let reg = /\{(\d+)\}/g;

console.log(reg.test(str)); //true
console.log(RegExp.$1); //'0'
console.log(reg.test(str)); //true
console.log(RegExp.$1); //'1'
console.log(reg.test(str)); //true
console.log(RegExp.$1); //'2'
console.log(reg.test(str)); //false
console.log(RegExp.$1); //'2'存储的是上一次捕获的结果

//RegExp.$1~RegExp.$9：获取当前本次正则匹配后，第一个到第九个分组的信息
```

2. replace 字符串中实现替换的方法（一般都是伴随正则一起使用的）

```javascript
let str = "sun@2019|sun@2020";
//把sun替换为'test'
//不用正则,执行一次只能替换一个
str = str.replace("sun", "test").replace("sun", "test");
console.log(str); //test@2019|test@2020
//使用正则会简单一些
str = str.replace(/sun/g, "test");
console.log(str);
```

```javascript
let str = "sun@2019|sun@2020";
//把sun替换为suntest

str = str.replace("sun", "suntest").replace("sun", "suntest");
console.log(str); // suntesttest@2019|sun@2020
//每次替换都是从字符串第一个位置开始找的(类似于正则捕获的懒惰性)

//基于正则g可以实现
str = str.replace(/sun/g, "suntest");
console.log(str); // suntesttesttest@2019|suntest@2020
```

### 案例

1. 把时间字符串进行处理

```javascript
let time = "2020-8-27";
//变为2020年08月27日
let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

//可以这样实现
// time = time.replace(reg, "$1年$2月$3日");
// console.log(time); //2020年8月27日

//还可以这样处理 [str].replace([reg],[function])
/**
 * 1.首先那reg和time进行匹配捕获，能匹配到几次就会把传递的函数执行几次(而且是匹配一次就执行一次)
 * 2.不仅把方法执行，而且replace还给方法传递了实参信息(和exec捕获的内容一致的信息:大正则匹配的内容，小分组匹配的内容...index,input)
 * 3.在函数中我们返回的是啥，就把当前大正则匹配的内容替换成啥
 */
time = time.replace(reg, (...args) => {
  //   console.log(args); //["2020-8-27", "2020", "8", "27", 0, "2020-8-27"]
  let [, $1, $2, $3] = args;
  $2.length < 2 ? ($2 = "0" + $2) : null;
  $3.length < 2 ? ($3 = "0" + $3) : null;
  return $1 + "年" + $2 + "月" + $3 + "日";
});
console.log(time); // 2020年08月27日
```

2. 单词首字母大写

```javascript
let str = "good good study,day day up!";

let reg = /\b([a-zA-Z])[a-zA-Z]*\b/g;
str = str.replace(reg, (...args) => {
  let [content, $1] = args;
  $1 = $1.toUpperCase();
  content = content.substring(1);
  return $1 + content;
});
console.log(str); //Good Good Study,Day Day Up!
```

3. 验证一个字符串哪个字符出现的次数最多，多少次?

```javascript
//去重思维
let str = "sagorigbqopiogwago";
//1.先去重
let obj = {};
for (let i = 0; i < str.length; i++) {
  let item = str[i];
  if (typeof obj[item] !== "undefined") {
    obj[item]++;
    continue;
  }
  obj[item] = 1;
}
//2.找出出现次数最多的值
let max = 1,
  res = [];
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    const item = obj[key];
    item > max ? (max = item) : null;
  }
}
//3.根据出现次数最多的值，找到对应字母
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    const item = obj[key];
    item === max ? res.push(key) : null;
  }
}
console.log(`出现最多的字符：${res}，出现了${max}次`); //出现最多的字符：g,o，出现了4次
```

```javascript
//排序思维
let str = "sagorigbqopiogwago";
//1.先排序
str = str
  .split("")
  .sort((a, b) => a.localeCompare(b))
  .join("");
//2.正则捕获连续出现的字符后在排序
let arr = str.match(/([a-zA-z])\1+/g).sort((a, b) => b.length - a.length);
//3.找出结果
let max = arr[0].length,
  res = [];
for (let i = 0; i < arr.length; i++) {
  let item = arr[i];
  if (item.length < max) break;
  res.push(item.substr(0, 1));
}

console.log(`出现最多的字符：${res}，出现了${max}次`); //出现最多的字符：g,o，出现了4次
```

```javascript
//从最大到最小去试找
let str = "sagorigbqopiogwago";
//1.先排序
str = str
  .split("")
  .sort((a, b) => a.localeCompare(b))
  .join("");
let max = null,
  res = [],
  flag = false;
//2.利用正则去字符串中捕获
for (let i = str.length; i > 0; i--) {
  let reg = new RegExp("([a-zA-Z])\\1{" + (i - 1) + "}", "g");
  str.replace(reg, (content, $1) => {
    res.push($1);
    max = i;
    flag = true;
  });
  if (flag) break;
}

console.log(`出现最多的字符：${res}，出现了${max}次`); //出现最多的字符：g,o，出现了4次
```

### 处理字符串方法

`formatTime` / `queryURLParams` / `millimeter`

```javascript
~(function () {
  /**
   * formatTime时间字符串的格式处理
   * @params
   *      templete:[string] 日期格式模板
   *      模板规制：{0}->年  {1~5}->月日时分秒
   * @return
   *      [string]格式化后的时间字符串
   */

  function formatTime(templete = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
    let arr = this.match(/\d+/g);
    return templete.replace(/\{(\d)\}/g, (...[, $1]) => {
      let time = arr[$1] || "00";
      return time.length < 2 ? "0" + time : time;
    });
  }
  /**
   * 获取URL地址问号后面的参数信息(也可能包含HASH值)
   * @params
   * @return
   *    [object] 把所有问号参数信息以键值对的方式存储起来并且返回
   */
  function queryURLParams() {
    let obj = {};
    this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[, $1, $2]) => {
      obj[$1] = $2;
    });
    this.replace(/#([^?=&#]+)/g, (...[, $1]) => {
      obj["HASH"] = $1;
    });
    return obj;
  }

  /**
   * millimeter:实现大数字的千分符处理
   * @params
   * @return
   *    [string] 千分符后的字符串
   */
  function millimeter() {
    return this.replace(/\d{1,3}(?=(\d{3})+$)/g, (content) => content + ",");
  }

  ["formatTime", "queryURLParams", "millimeter"].forEach((item) => {
    String.prototype[item] = eval(item);
  });
})();

let time = "2020-8-27 22:05:41";
console.log(time.formatTime()); //2020年08月27日 22时05分41秒
console.log(time.formatTime("{3}:{4}:{5}")); //22:05:41
let time1 = "2020-8-27";
console.log(time1.formatTime("{0}/{1}/{2} {3}:{4}:{5}")); //2020/08/27 00:00:00

let url = "https://www.baidu.com/s?ie=UTF-8&wd=regexp#search";
console.log(url.queryURLParams()); //{ie: "UTF-8", wd: "regexp", HASH: "search"}

let num = "12344563";
console.log(num.millimeter()); //12,344,563
num = "1234353465776";
console.log(num.millimeter()); //1,234,353,465,776
```
