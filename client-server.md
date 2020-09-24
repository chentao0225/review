### 客户端和服务器端

> 客户端：可以向服务器发请求，并接受返回的内容进行处理
> 服务器端：能够接受客户端请求，并且把相关资源信息返回给客户端的

**经典面试题：从用户在浏览器地址栏输入网址，到看整个页面，中间都发生了哪些事情？**

1. URL 地址解析
2. DNS 域名解析
3. 和服务器建立 TCP 连接(三次握手)
4. 把客户端信息传递给服务器(发送 HTTP 请求)
5. 服务器得到并处理请求(HTTP 响应内容)
   - 根据端口号找到对应的项目
   - 根据请求资源的路径名称找到资源文件
   - 读取资源文件中的内容
   - 把内容返回
6. 客户端渲染服务器返回的内容
7. 和服务器端断开 TCP 连接(四次挥手)

> FileZilla:FTP 上传工具，通过这个工具，通过 FTP 传输协议,可以把本地的文件上传到服务器中
>
> 服务器通网后，会有两个 IP 地址
>
> - 内网 IP:局域网内访问
> - 外网 IP：外部用户可以基于外网 IP 访问到服务器

### URI/URL/URN

- URI(Uniform Resource Identifier)：统一资源标识符，URL 和 URN 是 URI 的子集
- URL(Uniform Resource Locator)：统一资源定位符，根据这个地址能找到对应的资源
- URN(Uniform Resource Name)：统一资源名称，一般指国际上通用的(标准的)一些名字(例如：国际统一发版的编号)

### 一个完整的 URL 所包含的内容

- 协议(http://)
  > 传输协议就是，能够把客户端和服务器端通信的信息，进行传输的工具(类似于快递小哥)
  - http 超文本传输协议，除了传递文本，还可以传递媒体资源文件(或者流文件)及 XML 格式数据
  - https 更加安全的 http，一般涉及支付的网站都采用 https 协议(s:ssl 加密传输)
  - ftp 文件传输协议(一般应用于本地资源上传到服务器端)
- 域名(www.baidu.com)
  > 一个让用户方便记忆的名字(不通过域名，直接用服务器的外网 IP 也能访问到服务器,但是外网 IP 很难被记住)
  - 顶级域名 qq.com
  - 一级域名 www.qq.com
  - 二级域名 sports.qq.com
  - 三级域名 kbs.sports.qq.com
  - .com 国际域名
  - .cn 中文域名
  - .com.cn
  - .edu 教育
  - .gov 政府
  - .io 博客
  - .org 官方组织
  - .net 系统类
- 端口号(:80)
  > 端口号的取值范围 0~65535，用端口号来区分同一台服务器上不同的项目
  - http 默认端口号：80
  - https 默认端口号：443
  - ftp 默认端口号：21
  - 如果项目采用的就是默认端口号，我们在书写地址的时候，不用加端口号，浏览器在发送请求的时候会帮我们默认给加上
- 请求资源路径名称(/stu/index.html)

  - 默认的路径或者名称(xxx.com/stu/不指定资源名，服务器会找默认的资源，一般默认资源名是 default.html、index.html...当然这些可以在服务器端自己配置)
  - 注意伪 URL 地址的处理(URL 重写技术是为了增加 SEO 搜索引擎优化的，动态的网址一般不能被搜索引擎收录，所以我们要把动态的网址静态化，此时需要的是重写 URL)
    > https://item.jd.hk/2688449.html => https://item.jd.hk/index.php?id=2688449

- 问号传参信息(?from=wx&lx=1)
  - 客户端想把信息传递给服务器，有很多的方式
    - URL 地址问号传参
    - 请求报文传输(请求头和请求主体)
  - 也可以不同页面之间的信息交互，例如：从列表到详情
- HASH 值(#xxx)
  - 也能充当信息传输的方式
  - 锚点定位
  - 基于 HASH 实现路由管控(不同的 HASH 值，展示不同的组件和模块)

### DNS 服务器域名解析

> DNS 服务器：域名解析服务器，在服务器上储存着 域名<=>服务器外网 IP 等相关记录
> 而我们发送请求时候所谓的 DNS 解析，其实就是根据域名，在 DNS 服务器上查找到对应的服务器的外网 IP

**DNS 优化**

- DNS 缓存(一般浏览器会在第一次解析后，默认建立缓存，时间很短，只有一分钟左右)
- 减少 DNS 解析次数(一个网站中我们需要发送请求的域名和服务器尽可能少即可)
- DNS 预获取(dns-prefetch)
  > 在页面加载开始的时候，就把当前页面中需要访问其它域名(服务器)的信息进行提前 DNS 解析，以后加载到具体内容部分可以不用解析了

### HTTP 报文

- 请求报文
  > 所有经过传输协议，客户端传递给服务器端的内容，都被称为请求报文
  - 起始行
  - 请求头(请求首部)
  - 请求主体
- 响应报文：所有经过传输协议，服务器返回给客户端的内容，都被称为响应报文
  - HTTP 状态码
  - 响应头
  - 响应主体
- HTTP 报文：请求报文+响应报文

怎么查看

> 谷歌浏览器 F12=>Network(所有客户端和服务器端的交互信息在这里都可以看到)=>点击某一条信息，在右侧可以看到所有的 HTTP 报文信息

### HTTP 状态码

> 1~5 开头，三位数字

- 200 ok: 成功
- 201 created
  > 一般应用于告诉服务器创建一个新文件，最后服务器创建成功后返回的状态码
- 204 no content
  > 对于某些请求(例如：put 或者 delete)，服务器不想处理，可以返回空内容，并且用 204 状态码告知
- 301 Moved Permanently: 永久重定向(永久转移)
- 302 Moved Temporarily
  > 临时转移，很早以前基本上用 302 来做，但是现在主要是用 307 来处理这个事情，307 的意思就是临时重定向 Temporary Redirect =>主要用于：服务器的负载均衡等
- 304 Not Modified: 设置 HTTP 的协商缓存
- 400 Bad Request: 传递给服务器的参数错误
- 401 Unauthorized: 无权限访问
- 404 Not Found: 请求地址错误
- 500 Internal Server Error: 未知服务器错误
- 503 Service Unavailable: 服务器超负荷

> 遇到 link、img、audio、video 等是异步去加载资源信息(浏览器分配一个新的线程去加载，主线程继续向下渲染页面)，如果遇到的是 script 或者@import，则让主线程去加载资源信息(同步)，加载完成信息后，再去继续渲染页面

### 浏览器渲染页机制和原理

1. 解析 HTML，生成 DOM 树，解析 CSS，生成 CSSOM 树
2. 将 DOM 树和 CSSOM 结合,生成渲染树(Render Tree)
3. Layout(回流): 根据生成的渲染树，计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流
4. Painting(重绘): 根据渲染树以及回流得到的几何信息，得到节点的绝对像素
5. Display:将像素发送给 GPU，展示在页面上

#### DOM 的重绘和回流 Repaint&Reflow

- 重绘：元素样式的改变(但宽高、大小、位置等不变)
  > 如 outline，visibility，color，background-color 等
- 回流：元素的大小或者位置发生了变化(当页面布局和几何信息发生变化的时候)，触发了重新布局，导致渲染树重新计算布局和渲染
  > 如添加或删除可见的 DOM 元素；元素的位置发生变化；元素的尺寸发生变化；内容发生变化(比如文本变化或图片被另一个不同尺寸的图片所替代)；页面一开始渲染的时候(这个无法避免)；因为回流是根据视口的大小来计算元素的位置和大小的，所以浏览器的窗口尺寸变化也会引发回流...
  > 注意：回流一定会触发重绘，而重绘不一定会回流

#### 减少 DOM 的回流

- 放弃传统的操作 dom 的时代，基于 vue、react 开始数据影响视图模式
  > mvvm / mvc / virtual dom / dom diff ...
- 分离读写操作(现代浏览器都有渲染队列的机制)

  > offsetTop/offsetLeft/offsetWidth/offsetHeight/clientTop/clientLeft/clientWidth/clientHeight/
  >
  > scrollTop/scrollLeft/scrollWidth/scrollHeight/getComputedStyle/currentStyle...会刷新渲染队列

  - 渲染队列
    > 发现某一行要修改元素的样式，不立即渲染，而是看看下一行，如果下一行也能会改变样式，则把修改样式的操作放到'渲染队列中'...一直到不再是修改样式的操作后，整体渲染一次，引发一次回流

- 样式集中改变
  > div.style.cssText='width:20px;height:20px;'
- 缓存布局信息
  ```javascript
  div.style.left = div.offsetLeft + 1 + "px";
  //改为
  let curLeft = div.offsetLeft;
  div.style.left = curLeft + 1 + "px";
  ```
- 元素的批量修改
  - 模板字符串
    ```javascript
    for (let i = 0; i < 10; i++) {
      let span = document.createElement("span");
      span.innerHTML = i;
      box.appendChild(span);
    }
    let str = ``;
    for (let i = 0; i < 10; i++) {
      str += `<span>${i}</span>`;
    }
    box.innerHTML = str;
    ```
  - 文档碎片：createDocumentFragment
    ```javascript
    let frg = document.createDocumentFragment();
    for (let i = 0; i < 10; i++) {
      let span = document.createElement("span");
      span.innerHTML = i;
      frg.appendChild(span);
    }
    box.appendChild(frg);
    frg = null;
    ```
- 动画效果应用到 position 属性为 absolute 或者 fixed 的元素上(脱离文档流)
- CSS3 硬件加速(GPU 加速)
  > 比起考虑减少回流重绘，更期望是，根本不要回流重绘；
  >
  > transform/opacity/filters...这些属性会触发硬件加速，不会引发回流和重绘
  >
  > 可能引发的坑：过多使用会占用大量内存，性能消耗严重、有时候会导致字体模糊等
- 牺牲平滑度换取速度
  > 每次 1 像素移动一个动画，但是如果此动画使用了 100%的 CPU，动画就会看上去是跳动的，因为浏览器正在与更新回流做斗争。每次移动 3 像素可能看起来平滑度低了，但它不会导致 CPU 在较慢的机器中抖动
- 避免 table 布局和使用 css 的 javscript 表达式
