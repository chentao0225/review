## 移动端

### Native App
> ios和 android
  - ios:object-c / swift
  - android:java-native
1. 直接运行在操作系统中的(能够直接操作设备中的软件或者硬件，而且性能不错)
2. 不能跨平台，内容不能及时更新或者让用户及时的看到

### Hybrid混合APP开发
> 把webApp嵌入到Native App 的webview中  
> 壳子：把操作软硬件和一些需要高体验或者支付分享等功能交给native app开发  
> webview：就是不叫浏览器的浏览器，它也是基于webkit内核渲染页面的
- H5和APP的通信
1. JSBridge 
  > 原理：向webview中注入所有需要H5后期调取APP的方法(类似于window的全局对象)
2. 伪协议传输
  > 只用于ios，因为安卓是开源系统，不安全

- phoneGap/cordova/ionic/mui...就是让前端用来开发壳子的
- react native / flutter / uni-app ... 基于js编写功能，最后生成Native App的代码

### webApp
>HTML5+CSS3+javascript
1. H5运行在手机的浏览器中，而不是操作系统中(操作手机软硬件功能需要浏览器的支持，而且性能不好)
2. 跨平台开发(手机端的浏览器一般都是webkit内核的)、强制自动更新的，把内容及时传达给用户
### 响应式开发

> 让 H5 页面适配不同的设备

- 项目类型

  1. PC 端产品

     > 一般用于大型项目，大型项目都是 pc 和移动端各做一套产品
     >
     > 一般不需要做响应式开发，都是固定宽高的布局(100%还原设计稿)
     >
     > 有时候全屏的项目，需要把最外层容器的宽度设置为百分比布局

  2. 移动端产品

     > 不需要 pc 访问
     >
     > webApp:把开发的 H5 页面放到手机端浏览器、微信、等中运行=>'Hybrid 混合 App 开发'
     >
     > 小程序
     >
     > App:Ios、Android、前端(react native 、flutter、uni-app、iconic、phoneGap、cordova...)
     >
     > 需要做响应式布局开发，但是只需要适配移动端设备即可
     >
     > 手机尺寸(px):320、375、414、360、480、540...
     >
     > Pad 尺寸:768\*1024

  3. pc 端和移动端用同一套项目
     > 需要响应式布局处理
     >
     > 这种一般都是简单的企业展示站
     >
     > 技术栈：@media

- 响应式布局开发 "勇于探索，敢于尝试=>多思考"

  1. 媒体适配 @media

  ```
  /*
  * CSS中设定条件就是基于@meida完成的
  *    媒体设备 all/print/screen...
  *    媒体条件：否和某个条件写对应的样式
  *       max-width
  *       min-width
  *       width
  *       ......
  */
  /* 如果当前页面宽度<=500 */
  @media screen and (max-width: 500px) {
    .person {
        width: 200px;
    }
  }
  ```

  2. 群魔乱舞时代
     - 固定布局
       > <meta name="viewport" content="width=320px...">
     - 等比缩放布局
       > 按照固定的样式写一版(例如：320),然后根据设备的宽度,让其除以 320，计算出缩放的比例，最后让着整个 HTML 基于 transform:scale(比例) 进行缩放
  3. rem 响应式布局开发(等比缩放)

- viewport

  > <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
  >
  > 把 HTML5 页面放到手机上预览，默认情况下，不管手机设备有多宽，HTML 都是按照 980(或者 1024)宽度渲染的，这样页面会整体缩小（内容也都会缩小）
  >
  > 解决:viewport 视口(layout viewport 布局视口),设定页面渲染中一些规则
  >
  > - width=device-width：让当前页面渲染的宽度和设备宽度保持一致
  > - initial-scale=1.0：初始缩放比例 1:1
  > - maximum-scale=1.0：最大缩放比例 1:1
  > - minimum-scale=1.0：最小缩放比例 1:1
  > - user-scalable=no: 禁止用户手动缩放

- rem 响应式布局开发

  1. 拿到设计稿后（现在设计稿一般是 750PX 的），我们设定一个初始的 REM 和 PX 的换算比例（一般设置为 1REM=100PX，为了方便后期换算）
  2. 测量出设计稿中元素的尺寸（PS 测出来的是 PX 单位），在编写样式的时候全部转换为 REM 的单位（除以 100 即可） =>100%还原设计稿
  3. 编写一段 JS，获取当前设备的宽度，让其除以设计稿的宽度 750，再乘以初始的换算比例 100，计算出当前设备下，1REM 应该等于多少像素（只要改变 HTML 的 FONT-SIZE 就可以）；这样 HTML 字体大小一改，之前所有以 REM 为单位的元素都会跟着自动缩放...

```javascript
function computedREM() {
  let HTML = document.documentElement,
    winW = HTML.clientWidth;
  HTML.style.fontSize = (winW / 750) * 100 + "px";
}
computedREM();
window.addEventListener("resize", computedREM);
```

> 现在真实项目中，主体响应式布局以 REM 为主，部分效果实现可以基于 FLEX 来做，需要样式微调增还是要基于@media 来完成的...

```javascript
//横屏
let evt = "onorientationchange" in window ? "orientationchange" : "resize";
function computed() {
  let HTML = document.documentElement,
    deviceW = HTML.clientWidth,
    designW = 750, //设计图宽度
    ratio = (deviceW / designW) * 100;
  if (deviceW >= designW) ratio = 100;
  HTML.style.fontSize = ratio + "px";
}
computed();
window.addEventListener(evt, computed);
```

- DPR 适配
  > 屏幕像素密度比

**移动端手机端联调**

1. 在本地建立 web 服务器，让手机和电脑保持在同一个局域网中，这样在手机端就可以访问电脑中的项目了(pc 端关掉防火墙)
2. 安装 Hbuilder,这样也可以联调
3. 把项目部署到服务器(测试)上，然后进行测试

**zepto 和 jquery 的区别?**

> zepto 专门为移动端开发准备的，所以没有考虑 pc 端 IE 兼容的问题，所以 zepto 比 jquery 小的多；而且还有一方面，也导致 zepto 比 jquery 小：zepto 只实现了 jquery 中最常用的方法(例如 slideDown/slideUp/slideToggle 等快捷动画,在 zepto 中都没有):
>
> 1. JQ 中设置样式和实现动画的时候，不支持 CSS3 中某些样式属性的设置，例如：transform，但是 ZP 中支持了这样的处理
> 2. ZP 中单独提供了一些移动端常用的事件方法:tap/singleTap/doubleTap/longTap/swipe/swipeLeft/swipeRight/swipeUp/swipeDown/pinchIn/pinchOut...，而这些 JQ 中都没有

**移动端能用 click 事件吗?**

> PC 端 click 是点击事件，移动端的 click 是单击事件(所以在移动端使用 click 会存在 300ms 延迟的问题，在第一次触发后，会等待 300ms，看是否有第二次触发，存在则为双击，不存在才是单击)

**移动端常用的事件库**

- zepto
- fastclick:解决移动端 click 的 300ms 延迟问题的
- hammerjs:国际通用的移动端手势事件库

**移动端键盘事件和 PC 端的区别**

> 移动端是虚拟键盘，所以对于 keydown/keyup/keypress 兼容很差，想实现类似的需求，需要用 input 事件完成(input 事件：移动端文本框内容输入事件)
>
> addEventListener('input',function(ev){})

**touches vs changedTouches**

> changedTouches:存储每根手指的操作信息(它是一个集合，对于 touch 单手指事假来说，集合中只有一项),changedTouches 存储的是手指发生改变操作的信息，但是最开始按下的时候和 touches 一样的,但是它可以在手指离开的事件中获取到手指离开瞬间的信息,而 touches 在离开的时候则没有，真实项目中一般都是 changedTouches
