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
