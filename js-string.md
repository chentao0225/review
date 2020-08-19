## 字符串中常用的方法

> 所有用 单引号、双引号、反引号、包起来的都是字符串

```
let str='yangfanqihang'
str.length//=>字符串长度
str[0]//=>获取索引为零字符(第一个)
str[str.length-1]//=>获取最后一个字符
str[1000]//=>undefined

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

```
let str='yangfanqihang'
console.log(str.charAt(0))//=>'y'
console.log(str[0])//=>'y'
console.log(str.charAt(1000))//=>''
console.log(str[1000])//undefined
console.log(str.charCodeAt(0))//=>121
console.log(String.fromCharCode(121))//=>'y'
```

`substr` / `substring` / `slice`

> 字符串的截取(在原来字符串中查找到自己想要的)  
>  substr(n,m):从索引 n 开始截取 m 个字符，m 不写截取到末尾  
>  substring(n,m):从索引 n 开始找到索引为 m 处(不含 m)  
>  slice(n,m):和 substring 一样，都是找到索引为 m 处，但是 slice 可以支持负数作为索引，其余两个方法是不可以的

```
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

```
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

```
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

```
//把|分隔符变为,分隔符
let str = "a|b|c|d";
let arr = str.split("|");
console.log(arr); //=>["a", "b", "c", "d"]
str = arr.join(",");
console.log(str); //=>'a,b,c,d'

```

`replace`

> replace(老字符,新字符):实现字符串的替换

```
let str = "a@b@c@d";
str = str.replace("@", "-");
console.log(str); //=>'a-b@c@d' 在不使用正则表达式的情况下执行一次replace只能替换一次字符

str = str.replace(/@/g, "-");
console.log(str); //=>'a-b-c-d'

```

`match`

`localCompare`

`trim` / `trimLeft` / `trimRight`
