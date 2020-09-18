## CSS3

> CSS 常用的单位：
>
> - px 像素（固定单位）
> - em 相对单位，相对于父元素的字体大小设定的单位
> - rem （root em）相对于当前页面根元素（HTML）的字体大小设定的
> - %
> - deg
> - s / ms

### 属性

- CSS3 中的变形属性：transform，改变元素的样式

  > 优势：开启了硬件加速，比传统的样式改变性能流畅一些
  >
  > 特点：基于 transform 变形的元素，相当于脱离了文档流，对其余元素的位置不会产生影响

  - scale(N) 缩放
  - translate(X,Y) 位移
    > translate3d(X,Y,Z)/translateX/translateY/translateZ
  - rotate(Ndeg) 旋转 N 度
    > rotateX/rotateY
  - skew(Ndeg) 倾斜 N 度
  - matrix 矩阵变形
    > matrix3d

- CSS3 中的过渡动画:transition

  > 给元素设置过渡效果，当元素的样式在某种情况下发生改变了，不是立即改变，而是按照指定的效果慢慢的去改变，从而实现动画效果

  - transition-property：设置过渡的样式属性（哪些样式改变会执行过渡效果）
    > 默认是 all，元素所有的样式改变都会执行过渡效果
  - transition-druation：动画运行的时间 ms/s
  - transition-timing-function：运行的方式
    > linear 默认值“匀速运动”、ease、ease-in、ease-out、ease-in-out、cubic-bezier
  - transition-delay：设置延迟时间，默认值 0s“立即执行”

- CSS3 中的帧动画：animation

  1. 制作运动的轨迹（每一帧元素的样式） @keyframes

  ```javascript
      @keyframes 动画名{
        0%或者from{ 第一帧的样式 }
          ...
          50%{ 中间某帧的样式 }
          ...
          100%或者to{ 最后一帧的样式 }
      }
  ```

  2. 播放动画（按照轨迹运动） animation

     - animation-name：动画名
     - animation-duration：播放的时间
     - animation-timing-function：运动方式，默认 ease

     - animation-delay：延迟时间，默认 0s
     - animation-iteration-count：播放次数，默认 1，infinite 无限次播放
     - animation-fill-mode：控制运动状态
     - forwards：animation 动画
       > 元素运动完，默认会返回第一帧所在的位置，如果设置了这个属性，则运动完停留在最后一帧的位置
     - backwards：在动画设置延迟时间的情况下，我们让元素在第一帧位置等待运行
     - both：同时具备以上两个特点

## HTML5

- Drag 事件
  > 可以把一个元素从当前位置拖拽到指定的容器中
  - dragstart
  - drag
  - dragend
  - dragover 拖动元素到指定的目标区域上
  - drop 可以把拖动元素放到目标区域中了

> 使用

1. 给要拖拽的元素设置可被拖拽属性
   > draggable='true'
2. 在拖拽开始的时候，记录一些信息

- dataTransfer(DataTransfer):setData/getData/clearData
  > 设置的内容最后都会变成字符串 setData(类型标识,对应的值)
