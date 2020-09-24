## 字符串中常用的方法

> 所有用 单引号、双引号、反引号、包起来的都是字符串

```javascript
let str = "yangfanqihang";
str.length; //=>字符串长度
str[0]; //=>获取索引为零字符(第一个)
str[str.length - 1]; //=>获取最后一个字符
str[1000]; //=>undefined

//循环输出字符串中的每一个字符
for (let i = 0; i < str.length; i++) {
  let char = str[i];
  console.log(char);
}
```

`charAt` / `charCodeAt`

> charAt:根据索引获取指定位置的字符  
> charCodeAt:获取指定字符的 ASCII 码值(Unicod 编码值)  
> @params  
>  n[number] 获取字符指定索引  
> @return  
>  返回查找到的字符  
>  找不到返回的是空字符串不是 undefined 或者对应的编码值

```javascript
let str = "yangfanqihang";
console.log(str.charAt(0)); //=>'y'
console.log(str[0]); //=>'y'
console.log(str.charAt(1000)); //=>''
console.log(str[1000]); //undefined
console.log(str.charCodeAt(0)); //=>121
console.log(String.fromCharCode(121)); //=>'y'
```

`substr` / `substring` / `slice`

> 字符串的截取(在原来字符串中查找到自己想要的)  
>  substr(n,m):从索引 n 开始截取 m 个字符，m 不写截取到末尾  
>  substring(n,m):从索引 n 开始找到索引为 m 处(不含 m)  
>  slice(n,m):和 substring 一样，都是找到索引为 m 处，但是 slice 可以支持负数作为索引，其余两个方法是不可以的

```javascript
let str = "yangfanqihang";
console.log(str.substr(2, 6)); //=>'ngfanq'
console.log(str.substring(2, 6)); //=>'ngfa'
console.log(str.substr(2)); //=>'ngfanqihang' 截到末尾
console.log(str.substring(2, 1000)); //=>'ngfanqihang' 超过索引也只截取到末尾

console.log(str.substring(0, 6)); //=>'yangfa'
console.log(str.slice(0, 6)); //=>'yangfa'
console.log(str.substring(-6, -2)); //=>'' 不支持负数索引
console.log(str.slice(-6, -2)); //=>'qiha' 支持负数索引=>快速查找负数所有可以按照str.length+负索引的方式找 slice(13-6,13-2)=>slice(7,11)
```

`indexOf` / `lastIndexOf` / `includes`

> indexOf/lastIndexOf 查找某个字符第一次/最后一次出现位置的索引 没有找的返回-1  
> includes:查看是否包含某个字符

```javascript
let str = "yangfanqihang";
console.log(str.indexOf("n")); //=>2
console.log(str.lastIndexOf("n")); //=>11
console.log(str.indexOf("@")); //=>-1

console.log(str.indexOf("fan")); //=>4 验证整体第一个次出现的位置，返后的索引是第一个字符所在的位置索引
console.log(str.indexOf("fang")); //=>-1

console.log(str.indexOf("n", 5)); //=>6  查找字符串索引5及以后的字符串中，n第一次出现的位置索引
console.log(str.includes("@")); //=>false
```

`toUpperCase` / `toLowerCase`

> 字符串中的字母大小写转换  
> toUpperCase():转大写  
> toLowerCase():转小写

```javascript
let str = "YangFanQiHang";
str = str.toUpperCase();
console.log(str); //=> 'YANGFANQIHANG'
str = str.toLowerCase();
console.log(str); //=> 'yangfanqihang'

//实现首字母大写
str = str.substr(0, 1).toUpperCase() + str.substr(1);
console.log(str); //=> Yangfanqihang
```

`split`

> split:把字符串按照指定的分隔符拆分成数组(和数组中的 join 对应)

```javascript
//把|分隔符变为,分隔符
let str = "a|b|c|d";
let arr = str.split("|");
console.log(arr); //=>["a", "b", "c", "d"]
str = arr.join(",");
console.log(str); //=>'a,b,c,d'
```

`replace`

> replace(老字符,新字符):实现字符串的替换

```javascript
let str = "a@b@c@d";
str = str.replace("@", "-");
console.log(str); //=>'a-b@c@d' 在不使用正则表达式的情况下执行一次replace只能替换一次字符

str = str.replace(/@/g, "-");
console.log(str); //=>'a-b-c-d'
```

`match`

> 可以在执行一次的情况下，捕获到所有匹配的数据(前提：正则也得设置 g 才行)

`localeCompare`

> 字符串比较  
> 当 引用字符串 在 比较字符串 前面时返回 -1  
> 当 引用字符串 在 比较字符串 后面时返回 1  
> 相同位置时返回 0

```javascript
"a".localeCompare("b"); //-1
```

> `trim` / `trimLeft` / `trimRight`
> 去除首尾空格、去除开头空格、去重尾部空格

`String.fromCharCode`

> 返回指定的 ASCII 码对应的字符串

> 请求的地址中如果出现非有效 unicode 编码内容，现代版浏览器会默认的进行编码

> 1.  基于 encodeURI 编码，可以基于 decodeURI 解码，一般用 encodeURI 编码的是整个 URL，这样整个 URL 中的特殊字符都会自动编译
> 2.  encodeURIComponent/decodeURIComponent 它相对于 encodeURI 来说，不用于给整个 URL 编码，而是给 URL 部分信息进行编码(一般都是问号传参的值编码)
>     客户端和服务器端进行信息传输的时候，如果需要把请求的地址和信息编码，则基于以上两种方式处理，服务器端也存在这些方法，这样就可以统一编码解码了
> 3.  客户端还存在一种方式，针对于中文的编码方式 escape/unescape，这种方式一般只应用于客户端页面之间自己的处理，例如：从列表跳转到详情，可以把传递的中文信息基于这个编码，详情页获取编码后的信息在解码，再比如我在客户端种的 cookie 信息，如果信息是中文，我们也基于这种方法编码...

### 格式化时间字符串

#### 方案一

```javascript
//2020年8月20日11:28:46
let addZero = (val) => (val.length < 2 ? "0" + val : val);

let str = "2020-8-20 11:28:46";

let arr = str.split(" ");
let arrLeft = arr[0].split("-");
let arrRight = arr[1].split(":");

let res =
  arrLeft[0] +
  "年" +
  addZero(arrLeft[1]) +
  "月" +
  arrLeft[2] +
  "日 " +
  arrRight[0] +
  "时" +
  arrRight[1] +
  "分" +
  arrRight[2] +
  "秒";
console.log(res); //=> '2020年08月20日 11时28分46秒'
```

#### 方案二

```javascript
let str = "2020-8-20 11:28:46";
let addZero = (val) => (val.length < 2 ? "0" + val : val);
let arr = str.split(/(?: |-|:)/g);
let res =
  arr[0] +
  "年" +
  addZero(arr[1]) +
  "月" +
  addZero(arr[2]) +
  "日 " +
  addZero(arr[3]) +
  "时" +
  addZero(arr[4]) +
  "分" +
  addZero(arr[5]) +
  "秒";
console.log(res); //=> '2020年08月20日 11时28分46秒'
```

#### 方案三

```javascript
let str = "2020-8-20 11:28:46";
let addZero = (val) => (val.length < 2 ? "0" + val : val);
let res =
  str
    .replace("-", "年")
    .replace("-", "日")
    .replace(":", "时")
    .replace(":", "分") + "秒";
console.log(res); //=>'2020年08月20日 11时28分46秒'
```

#### 方案四

```javascript
let str = "2020-8-20 11:28:46";
let addZero = (val) => (val.length < 2 ? "0" + val : val);

let n = str.indexOf("-");
let m = str.lastIndexOf("-");
let x = str.lastIndexOf(" ");
let y = str.indexOf(":");
let z = str.lastIndexOf(":");

let year = str.substring(0, n);
let month = str.substring(n + 1, m);
let date = str.substring(m + 1, x);
let hours = str.substring(x + 1, y);
let minutes = str.substring(y + 1, z);
let seconds = str.substring(z + 1);

let res =
  year +
  "年" +
  addZero(month) +
  "月" +
  addZero(date) +
  "日 " +
  addZero(hours) +
  "时" +
  addZero(minutes) +
  "分" +
  addZero(seconds) +
  "秒";
console.log(res); //=>'2020年08月20日 11时28分46秒'
```
