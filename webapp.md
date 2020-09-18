## 移动端

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

- DPR 适配
  > 屏幕像素密度比
