// let str = "sun2019yangfan2020qihang2021";
// let reg = /\d+/;
// console.log(reg.exec(str)); //["2019", index: 3, input: "sun2019yangfan2020qihang2021", groups: undefined]
// console.log(reg.exec(str)); //["2019", index: 3, input: "sun2019yangfan2020qihang2021", groups: undefined]

// let str = "sun2019yangfan2020qihang2021";

// let reg = /\d+/;
// console.log(reg.lastIndex); //0
// //下面匹配捕获是从str索引零的位置开始找
// console.log(reg.exec(str)); //["2019".....]
// console.log(reg.lastIndex); //0
// //第一次匹配捕获完成，lastIndex没有改变，所以下一次exec依然是从字符串最开始找，找到的永远是第一个匹配到的

// reg = /\d+/g;
// console.log(reg.exec(str)); //["2019".....]
// console.log(reg.lastIndex); //7
// //设置全局匹配修饰符g后，第一次匹配完，lastIndex会自己修改
// console.log(reg.exec(str)); //["2020".....]
// console.log(reg.lastIndex); //18
// console.log(reg.exec(str)); //["2021".....]
// console.log(reg.lastIndex); //28
// console.log(reg.exec(str)); //null
// //当全局捕获后，再次捕获的结果是null，但是lastIndex又回归了初始值零，再次捕获又从第一个开始了
// console.log(reg.lastIndex); //0
// console.log(reg.exec(str)); //["2019".....]

// //----------------------------------
// let reg1 = /\d+/g;
// if (reg1.test(str)) {//验证一下：只有正则和字符串匹配是在捕获
//   console.log(reg1.lastIndex);//7
//   //基于test匹配验证后，lastIndex已经被修改为第一次匹配后的结果，所以下一次捕获不再从头开始了
//   console.log(reg1.exec(str));//["2020".....]
// }

// ~(function () {
//   function execAll(str = "") {
//     //进来后的第一件事，是验证当前正则是否设置了g，不设置则不能在进行循环捕获，否则会导致死循环
//     if (!this.global) return this.exec(str);
//     let arr = [],
//       res = this.exec(str);
//     while (res) {
//       arr.push(res[0]);
//       res = this.exec(str);
//     }
//     return arr.length === 0 ? null : arr;
//   }
//   RegExp.prototype.execAll = execAll;
// })();

// let reg = /\d+/g;
// console.log(reg.execAll("sun2019@2020sun"));

// let str = "130828199012042112";
// let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})\d(?:\d|X)$/;
// console.log(reg.exec(str));
// console.log(str.match(reg));
// // ["130828199012042112", "130828", "1990", "12", "04", "21", index: 0, input: "130828199012042112", groups: undefined]
// /*
//  *第一项：大正则匹配的结果
//  *其余项：每一个小分组单独匹配捕获的结果
//  *如果设置了分组(改变优先级),但是捕获的时候不需要单独捕获，可以基于?:来处理
//  */

// //既要捕获到{数字},也想单独的把数字也获取到，例如：第一次找到{0}还需要单独获取0
// let str = "{0}年{1}月{2}日";
// //不设置g只匹配一次，exec和match获取的结果一致（既有大正则匹配的信息，也有小分组匹配的信息）
// let reg = /\{(\d+)\}/;
// console.log(reg.exec(str));
// console.log(str.match(reg));
// //["{0}", "0", index: 0, input: "{0}年{1}月{2}日", groups: undefined]

// reg = /\{(\d+)\}/g;
// console.log(str.match(reg)); //["{0}", "{1}", "{2}"]
// //多次匹配的情况下，match只能把大正则匹配的内容获取到，小分组匹配的信息无法获取

// let arrBig = [],
//   arrSmall = [],
//   res = reg.exec(str);
// while (res) {
//   console.log(res);
//   let [big, small] = res;
//   arrBig.push(big);
//   arrSmall.push(small);
//   res = reg.exec(str);
// }
// console.log(arrBig, arrSmall); //["{0}", "{1}", "{2}"] ["0", "1", "2"]

// let str = "sun2019@2020sun";
// let reg = /\d+/g;
// console.log(str.match(reg)); //["2019", "2020"]

// //在量词元字符后面设置'?'取消捕获时候的贪婪性(按照正则匹配的最短结果来获取)
// reg = /\d+?/g;
// console.log(str.match(reg)); //["2", "0", "1", "9", "2", "0", "2", "0"]

// let str = "{0}年{1}月{2}日";
// let reg = /\{(\d+)\}/g;

// console.log(reg.test(str)); //true
// console.log(RegExp.$1); //'0'
// console.log(reg.test(str)); //true
// console.log(RegExp.$1); //'1'
// console.log(reg.test(str)); //true
// console.log(RegExp.$1); //'2'
// console.log(reg.test(str)); //false
// console.log(RegExp.$1); //'2'存储的是上一次捕获的结果

// //RegExp.$1~RegExp.$9：获取当前本次正则匹配后，第一个到第九个分组的信息

// let str = "sun@2019|sun@2020";
// //把sun替换为'test'
// //不用正则,执行一次只能替换一个
// str = str.replace("sun", "test").replace("sun", "test");
// console.log(str); //test@2019|test@2020
// //使用正则会简单一些
// str = str.replace(/sun/g, "test");
// console.log(str);

// let str = "sun@2019|sun@2020";
// //把sun替换为suntest

// str = str.replace("sun", "suntest").replace("sun", "suntest");
// console.log(str); // suntesttest@2019|sun@2020
// //每次替换都是从字符串第一个位置开始找的(类似于正则捕获的懒惰性)

// //基于正则g可以实现
// str = str.replace(/sun/g, "suntest");
// console.log(str); // suntesttesttest@2019|suntest@2020

// let time = "2020-8-27";
// //变为2020年08月27日
// let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

// //可以这样实现
// // time = time.replace(reg, "$1年$2月$3日");
// // console.log(time); //2020年8月27日

// //还可以这样处理 [str].replace([reg],[function])
// /**
//  * 1.首先那reg和time进行匹配捕获，能匹配到几次就会把传递的函数执行几次(而且是匹配一次就执行一次)
//  * 2.不仅把方法执行，而且replace还给方法传递了实参信息(和exec捕获的内容一致的信息:大正则匹配的内容，小分组匹配的内容...index,input)
//  * 3.在函数中我们返回的是啥，就把当前大正则匹配的内容替换成啥
//  */
// time = time.replace(reg, (...args) => {
//   //   console.log(args); //["2020-8-27", "2020", "8", "27", 0, "2020-8-27"]
//   let [, $1, $2, $3] = args;
//   $2.length < 2 ? ($2 = "0" + $2) : null;
//   $3.length < 2 ? ($3 = "0" + $3) : null;
//   return $1 + "年" + $2 + "月" + $3 + "日";
// });
// console.log(time); // 2020年08月27日

// let str = "good good study,day day up!";

// let reg = /\b([a-zA-Z])[a-zA-Z]*\b/g;
// str = str.replace(reg, (...args) => {
//   let [content, $1] = args;
//   $1 = $1.toUpperCase();
//   content = content.substring(1);
//   return $1 + content;
// });
// console.log(str); //Good Good Study,Day Day Up!

// //去重思维
// let str = "sagorigbqopiogwago";
// //1.先去重
// let obj = {};
// for (let i = 0; i < str.length; i++) {
//   let item = str[i];
//   if (typeof obj[item] !== "undefined") {
//     obj[item]++;
//     continue;
//   }
//   obj[item] = 1;
// }
// //2.找出出现次数最多的值
// let max = 1,
//   res = [];
// for (const key in obj) {
//   if (obj.hasOwnProperty(key)) {
//     const item = obj[key];
//     item > max ? (max = item) : null;
//   }
// }
// //3.根据出现次数最多的值，找到对应字母
// for (const key in obj) {
//   if (obj.hasOwnProperty(key)) {
//     const item = obj[key];
//     item === max ? res.push(key) : null;
//   }
// }
// console.log(`出现最多的字符：${res}，出现了${max}次`); //出现最多的字符：g,o，出现了4次

// //排序思维
// let str = "sagorigbqopiogwago";
// //1.先排序
// str = str
//   .split("")
//   .sort((a, b) => a.localeCompare(b))
//   .join("");
// //2.正则捕获连续出现的字符后在排序
// let arr = str.match(/([a-zA-z])\1+/g).sort((a, b) => b.length - a.length);
// //3.找出结果
// let max = arr[0].length, res = [];
// for (let i = 0; i < arr.length; i++) {
//   let item = arr[i];
//   if (item.length < max) break;
//   res.push(item.substr(0, 1));
// }

// console.log(`出现最多的字符：${res}，出现了${max}次`); //出现最多的字符：g,o，出现了4次

// //从最大到最小去试找
// let str = "sagorigbqopiogwago";
// //1.先排序
// str = str
//   .split("")
//   .sort((a, b) => a.localeCompare(b))
//   .join("");
// let max = null,
//   res = [],
//   flag = false;
// //2.利用正则去字符串中捕获
// for (let i = str.length; i > 0; i--) {
//   let reg = new RegExp("([a-zA-Z])\\1{" + (i - 1) + "}", "g");
//   str.replace(reg, (content, $1) => {
//     res.push($1);
//     max = i;
//     flag = true;
//   });
//   if (flag) break;
// }

// console.log(`出现最多的字符：${res}，出现了${max}次`); //出现最多的字符：g,o，出现了4次

// ~(function () {
//   /**
//    * formatTime时间字符串的格式处理
//    * @params
//    *      templete:[string] 日期格式模板
//    *      模板规制：{0}->年  {1~5}->月日时分秒
//    * @return
//    *      [string]格式化后的时间字符串
//    */

//   function formatTime(templete = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
//     let arr = this.match(/\d+/g);
//     return templete.replace(/\{(\d)\}/g, (...[, $1]) => {
//       let time = arr[$1] || "00";
//       return time.length < 2 ? "0" + time : time;
//     });
//   }
//   /**
//    * 获取URL地址问号后面的参数信息(也可能包含HASH值)
//    * @params
//    * @return
//    *    [object] 把所有问号参数信息以键值对的方式存储起来并且返回
//    */
//   function queryURLParams() {
//     let obj = {};
//     this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[, $1, $2]) => {
//       obj[$1] = $2;
//     });
//     this.replace(/#([^?=&#]+)/g, (...[, $1]) => {
//       obj["HASH"] = $1;
//     });
//     return obj;
//   }

//   /**
//    * millimeter:实现大数字的千分符处理
//    * @params
//    * @return
//    *    [string] 千分符后的字符串
//    */
//   function millimeter() {
//     return this.replace(/\d{1,3}(?=(\d{3})+$)/g, (content) => content + ",");
//   }

//   ["formatTime", "queryURLParams", "millimeter"].forEach((item) => {
//     String.prototype[item] = eval(item);
//   });
// })();

// let time = "2020-8-27 22:05:41";
// console.log(time.formatTime()); //2020年08月27日 22时05分41秒
// console.log(time.formatTime("{3}:{4}:{5}")); //22:05:41
// let time1 = "2020-8-27";
// console.log(time1.formatTime("{0}/{1}/{2} {3}:{4}:{5}")); //2020/08/27 00:00:00

// let url = "https://www.baidu.com/s?ie=UTF-8&wd=regexp#search";
// console.log(url.queryURLParams()); //{ie: "UTF-8", wd: "regexp", HASH: "search"}

// let num = "12344563";
// console.log(num.millimeter()); //12,344,563
// num = "1234353465776";
// console.log(num.millimeter()); //1,234,353,465,776
