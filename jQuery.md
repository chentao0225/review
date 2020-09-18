## jQuery

> 一款原生 JS 封装的'操作 DOM'的类库：它里面封装了大量的方法(一版本中，这些方法兼容所有的浏览器),基于这些方法我们可以快速的进行 DOM 操作和项目开发

### 常用方法

- 获取 DOM 元素

  - 根据选择器类型快速获取需要的元素

    > \$([selector],[context])
    >
    > - 支持的选择器：大部分 css3 中支持、还支持一些自己独有的
    >   - eq(n) 获取集合中索引为 n 的
    >   - gt(n) 大于这个索引的
    >   - lt(n) 小于这个索引的

  - 节点之间关系的属性
    > 可以在设置对应的选择器进行二次筛选
    >
    > - children 获取对应的子元素
    > - find 获取对应的后代元素
    > - filter 同级筛选
    > - prev 上一个哥哥
    > - prevAll
    > - next
    > - nextAll
    > - siblings 获取所有的兄弟
    > - index 获取索引
    > - parent 获取父元素
    > - parents 获取所有的祖先元素

- DOM 的增删改

  > - append 追加到末尾
  > - html 等价于 innerHtml
  > - text 等价于 innerText
  > - insertBefore  
  >   a.insertBefore(b) 把 a 放到 b 的前面 (注意点：a,b 都是页面中已经存在的元素)
  > - insertAfter  
  >   a.insertAfter(b) 把 a 放到 b 的后面
  > - $(`'<div id="box">test</div>'`).insertBefore(a)  
  >需要把新增的元素放到a前面，需要把字符串用$()包起来，相当于创建了一个元素
  > - appendTo  
  >    a.appendTo(b) 在 b 末尾追加 a
  > - prependTo  
  >   a.prependTo(b)在 b 开头追加 a
  > - clone 克隆
  > - remove 删除  
  >   操作表单的内容
  > - val 获取内容
  > - val('aa') 设置内容

- 操作自定义属性

  > - attr('data-type') 获取自定义属性
  > - attr('data-type','b') 设置自定义属性值
  > - attr({'type':1,'name':'sun'}) 批量设置
  > - removeAttr() 移除自定义属性  
  >   表单元素操作内置或者自定义属性一般使用 prop 和 removeProp
  > - prop()
  > - removeProp()

- 操作 css 样式(盒子模型属性)

  > - css() 设置或批量设置样式(设置行内样式)
  > - addClass() 设置样式类
  > - removeClass() 移除
  > - hasClass() 验证是否存在某个样式类
  > - toggleClass() 之前有就移除，没有就新增
  > - offset() 当前元素距离 body 的左偏移和上偏移
  > - position() 当前元素距离父参照物的左偏移和上偏移
  > - innerWidth/innerHeight 等价于 clientWidth/Height
  > - outerWidth/outerHeight 等价于 offsetWidth/Height
  > - scrollTop() 可以获取/设置 scrollTop 的信息
  > - scrollLeft()

- 事件处理

  > - on([event type],[fucntion])
  > - off()
  > - bind()
  > - unbind()
  > - delegate()  
  >   快捷绑定  
  >   \$元素.click() .mouseover() .mouseout() ...常用事件的快捷绑定

- 动画处理

  > - animate([目标样式],[总时间],[运动方式],[运动完做的事情])
  > - stop/finish

- AJAX 请求处理

  > \$.ajax({url,method,async,dataType,success})

- 常用的工具方法

  > - each([数组、类数组、对象],function(index,item){})
  > - toArray() 转换为数组
  > - makeArray() 把类数组转换为数组
  > - type 数据类型检测

- animate:JQ 中实现的动画库
  > \$元素.animate(目标样式,运动时间,运动方式,运动完执行的函数)
  - stop:结束当前正在运行的动画,从现有的位置开始继续新的动画
  - finish:也是结束当前正在运行的动画,和 STOP 的区别是,FINSH 是结束后快速运动到动画的结束位置，在开启新的动画
  - 快捷动画
    - show/hide/toggle 显示/隐藏/显示隐藏的切换
    - fadeIn/fadeOut/fadeToggle 渐隐渐现
    - slideDown/slideUp/slideToggle 下拉和卷起
