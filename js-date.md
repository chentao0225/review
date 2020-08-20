## Date

### 日期对象的基本操作

```
let time=new Date()
获取当前客户端(本机电脑)本地时间
这个时间用户是可以自己修改的，所以不能作为重要的参考数据

Thu Aug 20 2020 10:08:03 GMT+0800 (中国标准时间)
获取的结果不是字符串是对象类型的属于日期对象(是Date这个类的实例对象)
typeof time; //=>'object'
```

### 日期对象方法

- getFullYear() 获取年
- getMonth() 获取月 结果是 0~11 代表的是 1 到 12 月
- getDate() 获取日
- getDay() 获取获取星期 结果是 0~6 代表周日到周六
- getHours() 获取时
- getMinutes() 获取分
- getSeconds() 获取秒
- getMilliseconds() 获取毫秒
- getTime() 获取当前日期距离 1970/1/1 00:00:00 这个日期之间的毫秒差
- getLocaleDateString() 获取年月日(字符串)
- getLocaleString() 获取完整的日期字符串

### 其他

> new Date()除了获取本地时间，还可以把一个时间格式字符串转为标准的时间格式

```
new Date('2020/8/20')
//=>Thu Aug 20 2020 00:00:00 GMT+0800 (中国标准时间)
/*
* 支持的格式
*    YYYY/MM/DD
*    YYYY/MM/DD hh:mm:ss
*    YYYY-MM-DD IE不支持
*/
```
