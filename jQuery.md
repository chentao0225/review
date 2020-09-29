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

  > \$.ajax([url],[options])  
  > \$.ajax([options])  
  > \$.get/post/getJSON/getScript()

  - 配置项信息
    - url：请求的API接口地址
    - method：HTTP请求方式，默认GET
    - data
      >传递给服务器的信息，默认为null(可以是字符串，可以是对象，而且如果get系列请求，JQ会自动把信息拼接到URL的末尾，基于问号传参传递给服务器；如果是post请求，JQ会基于请求主体，把信息传递给服务器)
    - dataType
      >预设服务器返回的结果格式(服务器返回的一般都是JSON格式的字符串，如果我们设置了dataType,JQ会根据设置的类型，把服务器返回的结果处理为对应的格式)，支持的内容text/json/xml/html/script/jsonp(跨域)=>不影响服务器返回的结果，只是把服务器返回的结果进行二次处理
    - async：是否为异步操作，默认为true，代表异步操作
    - cache
      >缓存处理，只对get系列请求有作用，默认是true不处理缓存，当设置为false后，JQ帮我们在url的末尾设置一个随机数
    - contentType
      >设置传递给服务器内容的格式类型默认是"application/x-www.form-urlencoded"  
      >客户端传递给服务器信息的格式(类型一般都是字符串)  
      >常用的:
        - form-data表单数据：JSON格式'{"name":'soleil'}'
        - x-www-form-urlencoded：name=soleil&lx=1
        - raw：纯文本格式
    - headers：设置请求头信息，是一个对象
    - timeout：设置超时时间
    - success：回调函数，当数据请求成功执行，方法中的参数就是从服务器获取的结果
    - error：回调函数，数据请求失败执行，方法中的参数是错误信息
    ```javascript
      $.ajax({
        url:"xxxx",
        method:"post",
        data:{
          name:"xxx",
          lx:"xx"
        },
        dataType:'json',
        async:true,
        cache:false,
        headers:{},
        success:(result,status,xhr)=>{
          //xhr:jq处理过的ajax实例
          console.log(result,status,xhr)
        }
      })

    ```

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
