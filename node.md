## Node

> 应用 node 环境做的一些事情=>基于 v8 引擎(webkit 内核)渲染和解析 JS
>
> 它不是后台语言，它是一个工具或者环境，用来解析 JS 的工具或者环境=>说它是后台语言，主要原因是：一般会把 node 安装在服务器中，在服务器编写一些 JS 代码，通过 NODE 执行这些代码，实现服务器应该干的一些活

**I/O**

> I:input 输入
> O:output 输出
> I/O 一般指对文件的读写操作

JS 在客户端浏览器中运行，能否对客户端本地的文件进行读写操作?

> 不能，因为要保护客户端的信息安全
> input:type='file' 文件上传这种除外，但是这种也需要用户手动选择后才可以

JS 在服务器端运行(基于 node 运行)，能否对服务器端的文件进行操作？

> 可以  
> node 赋予了 JS 进行 I/O 操作的能力(内置模块：fs)

### window & global

1. 在客户端浏览器中运行 JS，JS 全局对象是：window(提供了很多内置的属性和方法)

   - window.alert()
   - window.confirm()
   - window.prompt()
   - window.open()
   - window.location.href
   - window.navigator.userAgent
   - window.name
   - window.getComputedStyle()
   - window.setTimeout()
   - window.setInterval()
   - window.requestAnimationFrame()
   - window.eval()
   - window.JSON.parse()
   - window.JSON.stringify()

2. 在 node 中运行 js，全局对象是：global
   - process：node 中的进程管理的属性
     - process.nextTick() 下一个任务
     - process.env 配置全局环境变量
   - Buffer
   - setImmediate 立即执行(类似于 setTimeout(func,0))
3. 在 REPL 命令中输出的 this 是 global，但是在 xxx.js 中输出的 this 是当前模块本身

### NPM

1. 模块管理(安装和卸载)
   > 安装在全局坏境下和安装在当前项目中

- 安装在全局:npm install xxx --global (npm i -g xx)
- 安装在本地项目中：npm i xxx
  - 把模块设置为开发依赖(开发中)：npm i xxx --save-dev
  - 把模块设置为生产依赖(部署到服务器)：npm i xxx --save
- 安装在全局和本地的区别
  - 安装在全局后对任何项目都有作用(也可能导致版本冲突)，但是只能基于命令的方式管理，不能基于 CommonJS 中的 require 导入使用(通俗说：就是不能导入到文件中基于代码来处理)
    - npm root -g 查看全局安装到的目录
    - 之所以可以使用命令，是因为在全局目录下生成了一个 xxx.cmd 的文件
  - 安装在本地默认不能基于命令管理，但是可以导入到文件中基于代码操作,只对当前项目有用
- 在本地安装模块之前，最好先：npm init-y ，生成 package.json 模块配置文件

  - 把安装的模块生成配置清单，存放在 package.json 中，后期需要部署项目的时候，只需要执行 npm i 就可以把所有的依赖项重新安装一遍"跑环境"
    - npm i 是把开发和生产依赖都安装一遍
    - npm i --production 只安装生产依赖的模块
  - 在 package.json 中，可以基于 scripts 选项配置本地可执行的脚本命令 npm run xxx
    ```
        "scripts":{
            //aaa是命令，指要做的事情
            "aaa":"node test1.js"
        }
    ```
  - 在配置可执行脚本命令的时候，基于 process 的环境变量区分开发还是生产环境

    ```
        "script":{
            /=>set NODE_EVN=dev 设置全局环境变量(MAC下用 export NODE_EVN=dev)
            "serve":"set NODE_EVN=dev&&node test1.js",
            "build":"set NODE_EVN=pro&&node test1.js"

        }
    ```

### CommonJS 模块管理机制

> AMD：require.js
> CMD：sea.js
> CommonJS：node.js
> ES6 Module
> 这些模块化思想，规定了在 JS 中我们的模块该如何的创建、如何的导入以及如何导出

- 内置模块：NODE 中自带的
  - http/https 创建和管理服务的模块
  - fs 给予 JS 进行 I/O 操作的
  - url 解析 URL 地址的
  - path 管理路径的
  - ...
- 第三方模块：基于 npm 安装，别人写好供我们用的
  - mime
  - qs
  - express
  - express-session
  - body-parser
  - ...
- 自定义模块：自己写的模块

### Node 中的模块管理

1. 在 node 环境下，每创建一个 js，都相当于创建了一个新的模块；模块中的方法也都是模块的私有方法，不同模块之间的同名方法不会有任何的冲突；
2. module.exports 就是 node 天生自带的用来导出模块中方法的方式

```
module.exports={
    //=>这些属性方法就是需要暴露给外面调取使用的
    xxx:xxx
}
```

3. require 是 node 提供用来导入模块的方法

```
let [模块名]=require([模块的地址])
//=>例如：
//1)可以省略.js后缀名
//2)如果是调取自己定义的模块，则需要加/(根目录)./(当前目录)../(上级目录)这三个中的某一个
//3)不加上述地址，则先找第三方模块(安装在自己本地的)，如果没有安装，则找node中的内置模块，如果再没有，则报错
let A=require('./A')
let qs=require('qs')
```

4. 导入模块是同步的(没导入完成，后面的事情是不处理的)；每一次导入模块都是把导入的模块中的 JS 代码从上到下执行一遍(只执行一遍)；

### fs 内置模块

> 提供大量的属性和方法，让 js 在 node 环境中执行的时候，可以操作服务器上的资源文件，也就是给予了 I/O 操作的能力

- readdir / readdirSync
  > 同步或者异步读取指定目录下的文件目录  
  > fs.readdir([path],[callback(err,result)])  
  > fs.readdir([path])
- readFile / readFileSync
  > 同步或者异步读取某一个文件中的内容  
  > fs.readFileSync([path],[,encoding]):不设置编码格式，默认得到的是 Buffer 文件流(编码)格式的数据，设置 UTF8，得到的是字符串(例如：JSON 格式、HTML 或者 CSS 等格式)；但是对于富媒体资源(例如：图片、音视频等)我们读取和传输的过程中就是基于 Buffer 文件流格式操作的，所以不要设置 UTF8 读取  
  > fs.readFile([path],[,encodeing],[callback(err,result)])
- writeFile / writeFileSync
  > 向某个文件中写入内容(如果文件不存在，它会默认创建一个文件再写入，而且写入方式是覆盖式写入"把之前文件中的内容全部覆盖")  
  > 文件不存在可以，但是需要保证路径的正确性  
  > fs.writeFileSync([path],[string/buffer content],[encoding])  
  > 异步操作的方式可以监听其成功或者失败  
  > fs.writeFile([path],[content],[encoding],[callback])
- mkdir
  > 创建目录  
  > fs.mkdir([path],[callback])
- rmdir
  > 删除目录(但是一定要保证目录中不再有文件，否则不让删除)  
  > fs.rmdir([path],[callback])
- appendFile / appendFileSync
  > 追加写入内容  
  > fs.appendFile([path],[content],[ecoding])
- copyFile / copyFileSync
  > 把某个文件及里面的内容拷贝到新的目录中(替换型拷贝：原来目录中存在这个文件，新拷贝的会替换原来的)  
  > fs.copyFile([curpath],[tarpath],[callback])
- unlink

  > 删除文件  
  > fs.unlink([path],[callback])

- `__dirname`
  > 获取当前模块所在的绝对路径

### path 内置模块

- path.resolve()
  > 获取当前 node 执行时所在的绝对目录(一般认为执行的目录就是项目根目录)  
  > 如果传递了一个相对目录，也是以获取的绝对目录为依托，再查找对应的目录
