### 前端性能优化

#### 1. 减少 HTTP 的请求次数和传输报文的大小

- css sprite(雪碧图、图片精灵)技术
- 使用字体图标(icon font)或者 SVG 等矢量图
  - 减少 HTTP 请求次数或者减少请求内容的大小
  - 渲染更快：因为是基于代码渲染的，而对于位图(png/jpg/gif)是需要先把图片编码再渲染
  - 不容易失帧变形
  - 也可以使用 webp 格式图片，这种格式要小一些(但是需要服务器端支持这种格式的请求处理)
- 图片懒加载(延迟加载)技术
  - 第一次加载页面的时候不去请求真实的图片，提高第一次渲染页面的速度
  - 当页面加载完，把出现在用户视野区域中的图片做真实加载，没有出现的先不加载(节约流量，也能减少对服务器的请求压力)
  - 对于数据我们也可能分批加载(不要一次请求过多的数据，例如分页技术)
- 音视频文件取消预加载(preload='none'),这样可以增加第一次渲染页面的速度，当需要播放的时候再加载
- 客户端和服务器端的数据传输尽可能基于 JSON 格式完成，XML 格式比 JSON 格式要大一些(还可以基于二进制编码或者文件流格式，这种格式比文件传输好很多)
- 把页面中的 css/js 图片等文件进行合并压缩
  - 争取 css 和 js 都只导入一个(webpack 可以实现自动合并压缩)
  - 压缩:基于 webpack 可以压缩、对于图片自己找工具下压缩、还可以使用服务器的 gzip 压缩
- 图片地图：对于多次调取使用的图片(尤其是背景图)，我们尽可能把它提取成公共的样式，而不是每一次重新设置 background
- 图片 base64(用 base64 码代表图片，减少 http 请求，增加浏览器渲染的速度，所以真实项目中，尤其是移动端，如果图片加载缓慢，可能 base64 一下就好了;但是 base64 会导致文件中的代码超级恶心，不利于维护和开发，所以少使用；webpack 中可以配置图片的 base64)

#### 2. 设置各种缓存、预处理和长连接机制

- 把不经常更改的静态资源做缓存处理(一般做的是 304 或者 ETAG 等协商缓存)
- 建立 Cache-Control 和 Expires HTTP 的强缓存
- DNS 缓存或者预处理(DNS prefetch)，减少 DNS 的查找
- 设置本地的离线存储(manifest)或者把一些不经常更改的数据做本地存储(webstorage、indexdb)等
- 有钱就做 CDN(地域分布式服务器)，还有一个财大气粗的方式：加服务器
- 建立 Connection：keep-alive TCP 长连接
- 使用 http2 版本协议(现在用的一般都是 http1.1)
  - 可以多条 TCP 通道共存=>管道化链接
- 一个项目分为不同的域(不同的服务器),例如:资源 web 服务器、数据服务器、图片服务器、视频服务器等，这样合理利用服务器资源，但是导致过多的 DNS 解析

#### 3. 代码方面的性能优化

- 减少对闭包的使用(因为过多使用闭包会产生很多不销毁的内存，处理不好的话，会导致内存溢出'栈溢出')，减少闭包的嵌套(减少作用域的查找层级)
- 对于动画来说:能用 css 解决的不用 js(能用 transform 处理的，不用传统 css 样式，因为 transform 开启硬件加速,不会引发回流，再或者使用定位的元素也会好很多，因为定位的元素脱离文档流，不会对其它元素的位置造成影响)，能用 requestAnimationFrame 解决的不用定时器
  - requestAnimationFrame 还有一个好处，当页面处于休眠无访问状态，动画会自己暂停，知道恢复访问才开始，而定时器是不论什么状态，只要页面不关，就一直处理
- 避免使用 iframe(因为 iframe 会嵌入其他页面，这样父页面渲染的时候，还要同时把子页面也渲染了，渲染进度会变慢)
- 减少直接对 DOM 操作(原因是减少 DOM 的回流和重绘...)，当代项目基本上都是基于 mvvm/mvc 数据驱动视图渲染的，对 DOM 的操作框架本身完成，性能要好很多
- 低耦合高内聚(基于封装的方式:方法封装、插件、组件、框架、类库等封装，减少页面中冗余代码，提高代码使用率)
- 尽可能使用事件委托
- 避免出现死循环或者嵌套循环(嵌套循环会成倍增加循环的次数)
- 项目中尽可能使用异步编程来模拟出多线程的效果，避免主线程阻塞(异步操作基于 promise 设计模式来管理)
- js 中不要使用 with
- 避免使用 css 表达式
- 函数的防抖和节流
- 减少使用 eval(主要原因是防止压缩代码的时候，由于符号书写不合规，导致代码混乱)
- 减少 filter 滤镜的使用
- 尽可能减少选择器的层级(选择器是从右向左解析) .box a{} 和 a{}=>性能更好
- 尽可能减少 table 布局
- 手动回收堆栈内存(赋值为 null)

js 前端代码优化的 108 条建议
雅虎 css 代码优化的 36 条建议

webpack 的性能优化
安全优化
