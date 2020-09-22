### 什么是 AJAX

> async javascript and xml:异步的 js 和 xml

- 此处的异步指的是：局部刷新(对应的是全局刷新)
- XML：可扩展的标记语言，用自己自定义的标签来存储数据(在很早以前，我们基于 AJAX 和服务器进行交互的数据格式一般都以 xml 格式为主，因为它能清晰展示出对应的数据和结构层级；但是到后面，流行了一种新的数据格式 JSON，它不仅比 XML 更清晰展示数据的结构,而且同样的数据存储，JSON 更加轻量，也方便解析和相关的操作，所以现在前后端的数据交互都已 JSON 格式为主)

### AJAX 的基础操作

```javascript
//1.创建ajax实例
let xhr = new XMLHttpRequest(); //=>IE低版本浏览器中用的是new ActiveXObject()

//2.打开url(配置发送请求的信息)
/**
    method:http请求方式
    url：请求地址(API接口地址)
    async:设置同步或者异步,默认是true异步,false同步
    user-name:传递给服务器的用户名
    user-pass:传递给服务器的密码
*/
xhr.open("GET", "./json/xxx.json", true);
//3.监听ajax状态，在状态为x的时候，获取服务器响应的内容
//ajax状态码：0 1 2 3 4
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && /^(2|3)\d{2}$/.test(xhr.status)) {
    let result = xhr.responseText;
  }
};
//4. 发送请求
//send中放的是请求主体内容
xhr.send(null);

//=> AJAX任务(发送一个请求给服务器，从服务器获取到对应的内容)从send后开始，到xhr.readyState===4的时候算任务结束
```

### HTTP 的请求方式

- GET 系列请求
  - get
  - delete 一般应用于告诉服务器，从服务器上删除点东西
  - head 只想获取响应头内容，告诉服务器响应主体内容不要了
  - options 试探性请求，发个请求给服务器，看看服务器能不能接收到，能不能返回
- POST 系列请求
  - post
  - put 和 delete 对应，一般是想让服务器把我传递的信息存储到服务器上(一般应用于文件和大型数据内容)

=> 真实项目中用对应的请求方式，会使请求变的更加明确(语义化),不遵循这些方式也可以,最起码浏览器在语法上是允许的；但是这些是开发者们相互约定俗成的规范；

> GET 系列一般用于从服务器获取信息，POST 系列一般用于给服务器推送信息，但是不论 GET 和 POST 都可以把信息传递给服务器，也能从服务器获取到结果，只不过是谁多谁少的问题

- GET:给的少，拿得多
- POST:给的多，拿得少

客户端怎么把信息传递给服务器?

- 问号传参 xhr.open('GET','/getdata?xxx=xxx&xxx=xxx')
- 设置请求头 xhr.setRequestHeader([key],[value])
- 设置请求主体 xhr.send(请求主体信息)

服务器怎么把信息返回给客户端?

- 通过响应头
- 通过响应主体 (大部分信息都是基于响应主体返回的)

GET 系列和 POST 系列的本质区别:

> GET 系列传递给服务器信息的方式一般采用:问号传参
> POST 系列传递给服务器信息的方式一般采用：设置请求主体

1. GET 传递给服务器的内容比 POST 少
   > 因为 URL 有最长大小限制(IE 浏览器谷歌浏览器一般限制 2KB，其余浏览器一般限制 4~8kb,超过长度的部分自动被浏览器截取了)

```javascript
xhr.open("GET", "/list?name=sun&year=22&xxx=xxx...");
xhr.send("..."); //请求主体中传递的内容理论上没有大小限制，但是真实项目中，为了保证传输的速度，会自己限制一些
```

2. GET 会产生缓存(缓存不是自己可控制的)
   > 因为请求的地址(尤其是问号传递的信息一样),浏览器有时候会认为你要和上次请求的数据一样，拿的是上一次信息；这种缓存不期望有,期望的缓存是自己可控制的；所以真实项目中，如果一个地址，GET 请求多次，要去除这个缓存

```javascript
//=>解决办法设置随机数
xhr.open('GET','/list?name=sun&_='+Math.random());
...
xhr.open('GET','/list?name=sun&_='+Math.random());
```

3. GET 相比较 POST 来说不安全
   > GET 是基于问号传参传递给服务器内容,有一种技术叫做 url 劫持，这样别人可以获取或者篡改传递的信息;而 POST 基于请求主体传递信息，不容易被劫持；

### AJAX 的状态码

> xhr.readyState 获取状态码

- UNSEND 0 :未发送(创建一个 XHR，初始状态是 0)
- OPENED 1 :已经打开(执行了 xhr.open)
- HEADERS_RECEIVED 2 :响应头信息已经返回给客户端(发送请求后,服务器会依次返回响应头和响应主体的信息)
- LOADING 3 :等待服务器返回响应内容
- DONE 4 :响应主体信息已经返回给客户端

**常用属性和方法**

- xhr.timeout
  > 设置 AJAX 等待时间，超过这个时间算 AJAX 延迟
- 获取响应主体信息
  > 一般用 responseText,因为服务器返回的信息一般都是 JSON 格式的字符串，如果返回的是 XML 格式，我们用 responseXML...
  - xhr.responseXML
  - xhr.response 不限制类型
  - xhr.responseType
- xhr.withCredentials

  > 默认 false，在跨域请求中是否允许携带证书(携带 cookie)

- xhr.getResponseHeader([attr])

  > 获取响应头信息
  >
  > xhr.getResponseHeader('Date')
  >
  > 获取的服务器时间是标准的日期格式对象(GMT 格林尼治时间)
  >
  > new Date(time)能把格林尼治时间转换为北京时间

- xhr.about()
  > 中断 ajax 请求
- xhr.getAllResponseHeaders()
  > 获取所有的响应头信息
- xhr.open()
- xhr.overrideMimeType()
  > 重写 Mime 类型
- xhr.send()
- xhr.setRequestHeader()
  > 设置请求头：设置的请求头信息值不能是中文，可以使用 encodeURIComponent 编码

**API**

> Application Programing Interface 凡是可被别人调用，并且给予反馈结果的都可以被称之为 API 接口

### Promise

> ES6 语法规范中新增加的内置类，用来处理 JS 中异步编程，而我们所谓的 promise 设计模式，就是基于 promise 对异步操作进行管理

**异步编程中的"回调地狱"**

- AJAX 的串行
  > 只有第一个请求成功才能执行第二个，第二个成功才能执行第三个...最后一个请求成功后拿到了每一次请求的所有数据
- AJAX 的并行
  > 三个请求可以同时发送，但是需要等到所有请求都成功才会做一件事
