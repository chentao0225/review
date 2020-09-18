## DOM

> DOM：document object model 文档对象模型，提供系列的属性和方法，让我们能在 js 中操作页面中的元素

### 获取元素的属性和方法

```javascript
document
  .getElementById([id])
  [context].getElementsByTagName([tagName])
  [context].getElementsByclassName([className]); //在IE6~8中不兼容
document
  .getElementsByName([name]) //在IE浏览器中只对表单元素的name有作用

  //在IE6~8中不兼容
  [context].querySelector([selector])
  [context].querySelectorAll([selector]);

//--------------
document;
document.documentElement;
document.head;
document.body;
childNodes; //所有子节点
children; //所有元素子节点
//ie6~8会把注释节点当做元素节点获取到
parentNode;
firstChild / firstElementChild;
lastChild / lastElementChild;
previousSibling / previousElementSibling;
nextSibling / nextElementSibling;
//所有带Element的,在IE6~8中不兼容
//...
```

### DOM 的增删改操作

```javascript
document.createElement([tagName])
document.createTextNode([textContent])
//字符串拼接(模板字符串)，基于innerHTML、innerText存放到容器中

[parent].appendChild([newElement])
[parent].insertBefore([newElement],[element])

[element].cloneNode([true/false])
[parent].removeChild([element])

//设置自定义属性
[element].xxx=xxx
delete [element].xxx

[element].setAttribute('xxx',xxx)
[element].getAttribute('xxx'
[element].removeAttribut('xxx')
```

### 获取元素样式和操作样式

```javascript
//修改元素样式
[element].style.xxx = xxx[element].className = xxx; //修改和设置它的行内样式 //设置样式类
//获取元素的样式
console.log([element].style.xxx); //获取的是当前元素写在行内上的样式，如果有这个样式，但是没有写在行内上，则获取不到
```

### 盒子模型属性

> 基于一些属性和方法，让我们能够获取到当前元素的样式信息，例如：clientWidth、offsetWidth 等
>
> - client
>   - width/height
>   - top/left
> - offset
>   - width/height
>   - top/left
>   - parent
> - scroll
>   - width/height
>   - top/left
>
> 方法：window.getComputedStyle([element],[伪类])/ [element].currentStyle

```javascript
let box = document.getElementById("box");
//获取盒子可视区域的宽高(内容加左右padding)
/**
 * 内容溢出与否对他无影响
 * 获取的结果是没有单位的
 * 获取的结果是整数，会四舍五入
 */
box.clientWidth;
box.clientHeight;

//获取当前页面的一屏幕区域的宽高
let winW = document.documentElement.clientWidth || docuemnt.body.clientWidth;
let winH = document.documentElement.clientHeight || docuemnt.body.clientHeight;
//获取盒子左边框和上边框的大小
box.clientLeft;
box.clientTop;
```

```javascript
let box = document.getElementById("box");

//在client的基础上加上border==盒子本身的宽高
box.offsetWidth;
box.offsetHeight;

/**
 * 在没有内容溢出的情况下，获取的结果是client是一样的
 * 在有内容溢出的情况下，获取的结果约等于真实内容的宽高(上/左padding+真实内容的高度、宽度)
 * 1.不同浏览器获取的结果不尽相同
 * 2.设置的overflow属性值对最后的结果也会产生一定的影响
 */
box.scrollWidth;
box.scrollHeight;

//获取整个页面的真实高度
document.documentElement.scrollHeight || document.body.scrollHeight;
```

```javascript
let box = document.getElementById("box");
/**
 * 竖向滚动条卷去的高度
 * 横向滚动条卷去的宽度
 * 1.边界值
 * min:0
 * max:整个的高度scrollHeight - 一屏幕高度clientHeight
 */
box.scrollTop;
box.scrollLeft;
//13个盒子模型属性，只有这两个是"可读写"的属性(既可以获取也可以设置对应的值),其余的都是"只读"属性(不能设置值，只能获取)
box.scrollTop = 0;
```

```javascript
let box = document.getElementById("box");
box.offsetParent//获取它的父参照物(不一定是父元素)
//父参照物和它的父元素没有必然的联系，父参照物查找：同一个平面中，最外层元素是所有后代元素的父参照物，而基于position：relative/absolute/fixed可以让元素脱离文档流(一个新的平面),从而改变元素的父参照物
document.body.offsetParent=null

box.offsetTop:距离其父参照物的上偏移
box.offsetLeft:距离其父参照物的左偏移(当前元素的外边框到其父参照物的里边框)
```

```javascript
/**
 * offset:获取当前元素距离body的左/上偏移(不论其父参照物是谁)
 * @params
 *      element: 当前操作的元素
 * @return
 *      [object] 包含上/左偏移的信息 =>{top:xxx,left:xxx}
 */
function offset(element) {
  let par = element.offsetParent,
    l = element.offsetLeft,
    t = element.offsetTop;
  while (par && par.tagName !== "body") {
    if (!/MSIE 8\.0/.test(navigator.userAgent)) {
      l += par.clientLeft;
      t += par.clientTop;
    }
    l += par.offsetLeft;
    t += par.offsetTop;
    par = par.offsetParent;
  }
  return {
    top: t,
    left: l,
  };
}
```

### getComputedStyle

> 获取当前元素所有经过浏览器计算过的样式
>
> - 只要元素在页面中呈现出来，那么所有的样式都是经过浏览器计算的
> - 哪怕你没有设置和见过的样式也都计算了
>
> 在 IE6-8 浏览器中不兼容，需要基于 currentStyle 来获取

```javascript
let styleObj = window.getComputedStyle([element], null);
styleObj["backgroundColor"];
styleObj.display;

//=>IE6-8
styleObj = [element].currentStyle;
```

### 事件

> 事件是元素天生自带的默认操作行为  
> =>不论我们是否给其绑定了方法，当我们操作的时候，也会把对应的时间触发
>
> 事件绑定是给元素的某个行为绑定一个方法  
> =>目的是当事件行为触发的时候，可以做一些事情

**常用的事件行为**

- [鼠标事件]
  - click 点击(移动端 click 被识别为单击)
  - dblclick 双击
  - mousedown 鼠标按下
  - mouseup 鼠标抬起
  - mousemove 鼠标移动
  - mouseover 鼠标滑过
  - mouseout 鼠标滑出
  - mouseenter 鼠标进入
  - mouseleave 鼠标离开
  - mousewhell 鼠标滚轮滚动
- [键盘事件]
  - keydown 按下某个键
  - keyup 抬起某个键
  - keypress 除 Shift/Fn/CapsLock 键以外，其他键按住(连续触发)
- [移动端手指事件]
  - 单手指事件模型 Touch
    - touchstart 手指按下
    - touchmove 手指移动
    - touchend 手指松开
    - touchcancel 操作取消(一般应用于非正常状态下操作结束)
  - 多手指事件模型 Gesture
    - gesturestart
    - gesturechange / gestureupdate
    - gestureend
    - gesturecancel
- [表单元素常用事件]
  - focus 获取焦点
  - blur 失去焦点
  - change 内容改变
- [音视频常用事件]
  - canplay 可以播放(资源没有加载完，播放中可能会卡顿)
  - canplaythrough 可以播放(资源已经加载完，播放中不会卡顿)
  - play 开始播放
  - playing 播放中
  - pause 暂停播放
- [其他常用事件]
  - load 资源加载完
  - unload 资源卸载
  - beforeunload 当前页面关闭之前
  - error 资源加载失败
  - scroll 滚动事件
  - readystatechange AJAX 请求状态改变事件
  - contextmenu 鼠标右键触发

**DOM0 事件绑定 VS DOM2 事件绑定**

- DOM0
  > 元素.on 事件行为=function(){}
  >
  > DOM0 事件绑定的原理：给元素的私有属性赋值，当事件触发，浏览器会帮我们把赋的值执行，但是这样也导致'只能给当前元素某一个事件行为绑定一个方法'
- DOM2
  > 元素.addEventListener(事件行为,function(){},true/false)
  >
  > IE6~8 中：元素.attachEvent('on 事件行为',function(){})
  >
  > DOM2 事件绑定的原理：基于原型链查找机制，找到 EventTarget.prototype 上的方法并且执行，此方法执行，会把给当前元素某个事件行为绑定的所有方法，存放到浏览器默认的事件池中(绑定几个方法，会向事件池存储几个),当事件行为触发，会把事件池中存储的对应方法依次按照顺序执行
  >
  > DOM2 事件绑定的时候，一般采用实名函数=>目的：这样可以基于实名函数去移除事件绑定
  >
  > 移除事件绑定：从事件池中移除，所以需要指定好事件类型、方法等信息(要和绑定的时候一样才可以移除)  
  > 元素.removeEventListener('click',fn,false)
  >
  > 基于 addEventListener 向事件池增加方法，存在去重的机制'同一个元素，同一个事件类型，在事件池中只能存储一遍这个方法，不能重复存储'

> DOM0 中能做事件绑定的事件行为，DOM2 都支持；DOM2 里面一些事件，DOM0 不一定能处理绑定，例如：transitionend、DOMcontentLoaded...

**window.load vs \$(document).ready()**

1. \$(document).ready()采用的是 DOM2 事件绑定，监听的是 DOMContentLoaded 这个事件，所以只要 DOM 结构加载完成就会被触发执行，而且同一个页面中可以使用多次(绑定不同的方法，因为基于 DOM2 事件池绑定机制完成的)

2. window.onload 必须等待所有资源都加载完成才会被触发执行，采用 DOM0 事件绑定，同一个页面只能绑定一次(一个方法),想绑定多个也需要改为 window.addEventListener('load',function(){})DOM2 绑定方式

**事件对象**

> 给元素的事件行为绑定方法，当事件行为触发方法会被执行，不仅被执行，而且还会把当前操作的相关信息传递给这个函数=>'事件对象'
>
> 如果是鼠标操作，获取的是 MouseEvent 类的实例=>鼠标事件对象
>
> 鼠标事件对象 -> Event.prototype -> UIEvent.prototype -> Event.prototype -> Object.prototype
>
> 如果是键盘操作，获取的是 keyboardEvent 类的实例=>键盘事件对象  
> 除了以上还有：普通事件对象(Event)、手指事件对象(TouchEvent)等

- 鼠标事件对象
  > clientX/clientY：当前鼠标触发点距离当前窗口左上角的 X/Y 轴坐标
  >
  > pageX/pageY：触发点距离当前页面左上角的 X/Y 轴坐标
  >
  > type：触发事件的类型
  >
  > target：事件源(操作的是哪个元素，哪个元素就是事件源),在不兼容的浏览器中可以使用 srcElement 获取,也代表的是事件源
  >
  > preventDefault():用来阻止默认行为的方法，不兼容的浏览器中用 returnValue=false 也可以阻止默认行为
  >
  > stopPropagation():阻止冒泡传播，不兼容的浏览器中用 cancelBubble=true 也可以阻止默认行为

> 事件对象和函数以及给谁绑定的事件没啥必然关系，它存储的是当前本次操作的相关信息，操作一次只能有一份信息，所以在哪个方法中获取的信息都是一样的；第二次操作，存储的信息会把上一次操作存储的信息替换掉...

每一次事件触发，浏览器都会这样处理一下

1. 捕获到当前操作的行为(把操作信息获取到),通过创建 MouseEvent 等类的实例，得到事件对象 e
2. 通知所有绑定的方法(符合执行条件的)开始执行，并且把 e 当实参传递给每一个方法，所以在每个方法中得到的事件对象其实是一个
3. 后面再重新触发这个事件行为，会重新获取本次操作的信息，用新的信息替换老的信息，然后继续之前的步骤...

阻止 A 标签默认行为

> A 标签有两个默认行为:1.页面跳转 2.锚点定位

1. href='javascript:;'
2. 给 A 标签绑定一个方法 return false
3. 给 A 标签绑定一个方法 e.preventDefault()

- 键盘事件对象
  > code & key: 存储的都是按键，code 更细致
  >
  > keyCode & which：存储的是键盘按键对应的码值
  >
  > - 方向键：37 38 39 40 =>左上右下
  > - 空格：32
  > - 回车：13
  > - 回退：8
  > - 删除：46
  > - shift：16
  > - ctrl：17
  > - alt:18
  >   ...

**事件传播机制**

1. 捕获阶段
   > 从最外层向最里层事件源依次进行查找(目的:是为冒泡阶段事先计算好传播的层级路径) =>CAPTURING_PHASE:1
2. 目标阶段
   > 当前元素的相关事件行为触发=>AT_TARGET:2
3. 冒泡阶段
   > 触发当前元素的某一个事件行为，不仅它的这个行为被触发了，而且它所有的祖先元素(一直到 window)相关的事件行为都会被依次触发(从内到外的顺序)=>BUBBLING_PHASE:3 (Event.prototype)
   > stopPropagation()阻止冒泡传播

> DOM0 绑定的方法，只能在目标阶段和冒泡阶段触发执行
>
> DOM2 绑定的方法，可以控制在捕获阶段执行

```javascript
addEventListener('click',functinon(){
  //false代表在冒泡阶段执行此方法
  //true代表在捕获阶段执行此方法
},true)

```

**mouseover vs mouseenter**

1. 盒子中有后代元素的，尽可能用 mouseenter
   > 默认阻止了事件冒泡传播
2. 需要基于冒泡传播干什么事情，只能用 mouseover

**事件委托**

1. 基于事件的冒泡传播机制完成
2. 如果一个容器中很多元素都要在触发某一事件的时候做一些事情（原始方案：给元素每一个都单独进行事件绑定），我们只需要给当前容器的这个事件行为绑定方法，这样不论是触发后代中哪一个元素的相关事件行为，由于冒泡传播机制，当前容器绑定的方法也都要被触发执行
3. 想知道点击的是谁（根据是谁做不同的事情），只需要基于事件对象中的 ev.target 事件源获取即可

> 基于事件委托实现，整体性能要比一个个的绑定方法高出 50%左右
>
> 如果多元素触发，业务逻辑属于一体的，基于事件委托来处理更加好
>
> 某些业务场景只能基于事件委托处理
