### git 版本控制系统

> 版本控制系统：  
> 1.记录历史版本信息(记录每一次修改的记录)  
> 2.方便团队相互之间协作开发

> 常用的版本控制系统

> - cvs / svn :集中式版本控制系统
> - git :分布式版本控制系统

#### git 工作原理

- 工作区：用来写代码的区域
- 暂存区：临时存储用的
- 历史区：生成历史版本

工作区 -> 暂存区 -> 历史区

#### git 的全局配置

> 第一次安装完成 git 后，我们在全局环境下配置基本信息

```
git config -l //查看配置信息
git config --global -l //查看全局配置信息

//配置全局信息：用户名和邮箱
git config --global user.name 'xxx'
git config --global user.email 'xxx@xx.xx'

```

#### 创建仓库完成版本控制

> 创建本地 git 仓库

```
git init
//=>会生成一个隐藏文件夹
// .git (这个文件不能删，因为暂存区和历史区还有一些其他的信息都在这里，删了就不是一个完整的git仓库)
```

> 在本地编写完成代码后(在工作区)，把一些文件提交到暂存区

```
git add xxx
// 把某个文件或者文件夹提交到暂存区
git add .
// 把当前仓库中所有最新修改的文件都提交到暂存区
git add -A

git status
//查看当前文件状态(红色代表在工作区，绿色代表在暂存区，看不见东西证明所有修改的信息都已经提交到历史区)

```

> 把暂存区内容提交到历史区

```
git commit -m '描述信息'

git log //查看历史版本信息(历史记录)
git reflog //包含回滚的信息

```

### git 和 github

> github 官网：https://www.github.com

> 一个网站（一个开源的源代码管理平台），用户注册后，可以在自己账户下创建仓库，用来管理项目的源代码（源代码是基于 git 传到仓库中）  
> 我们所熟知的插件、类库、框架等都在这个平台上有托管，我们可以下载观看和研究源码等

1. Settings 用户设置

   - Profile 修改自己的基本信息
   - Account 可以修改用户名
   - Security 可以修改自己的密码
   - Emails 邮箱(必须进行邮箱验证)

2. 创建仓库

   > new repository -> 填写信息 -> Create repository

   - public 公共仓库作为开源项目
   - privite 私有仓库作为内部团队协作管理的项目
     > Settings -> 删除仓库 Delete this repository -> Collaborators 设置协作开发的人员  
     > Code 可以查看历史版本信息和分支信息

3. 把本地仓库提交到远程仓库

> 建立本地仓库和远程仓库的连接

```

git remote -v //查看本地仓库和哪些远程仓库保持连接
git remote add origin [git远程仓库地址]

git remote rm origin //删除关联信息

```

4. 提交到远程仓库
   > 提交前最好先拉取

```
git pull origin master

```

> 把本地代码提交到远程仓库 (需要输入 github 的用户名和密码)

```
git push origin master

```

5. 其他

> 把远程仓库克隆到本地

```
git clone [远程仓库git地址] [别名：可以不设置，默认为仓库名]
```

> 真实项目开发流程

1.  组长或者负责人先创建中央仓库(增加协作者)
2.  小组成员基于 'git clone' 把远程仓库及默认的内容克隆到本地一分（解决了三个事情：初始化一个本地仓库'git init'、和对应的远程仓库也保持了关联'git remote add'、把远程仓库默认内容拉取到本地'git pull'）
3.  每个组员写完自己的程序后，基于'git add/git commit'把自己修改的内容存放到历史区，然后通过'git pull/git push'把本地信息和远程仓库信息保持同步即可（可能涉及冲突的处理）

### npm

> node package manger: node 模块管理工具，根据 npm 我们可以快速的安装、卸载所需要的资源文件

#### 安装

> 去 NODE 官网：https://nodejs.org/zh-cn/ 下载 NODE（长期支持版），安装 NODE 后，NPM 也就跟着安装了  
> 检测是否安装成功

```
node -v
npm -v
```

#### 基于 npm 进行模块管理

> https://www.npmjs.com/ 基于 npm 是从 npmjs.com 平台上下载安装

```
 npm install xxx //把安装在当前项目中(node_modules)
 npm install xxx -g //把模块安装在全局环境中
 npm i xxx@1.0.0 //安装指定版本的模块
 npm view xxx versions > xxx.version.json //查看某个模块的版本信息(输出到指定json文件中)

```

> 什么情况下会把模块安装在全局?

- 可以使用'命令'对任何项目进行操作
- `npm root -g` 查看全局安装的目录
- 因为在安装目录下生成了 `xxx.cmd`的文件，所以可以使用 xxx 的命令进行操作

> 安装在本地项目中的模块

- 可以在项目中导入进来使用
- 但是默认不能基于命令来操作(因为没有.cmd 文件)
- 但是可以基于`package.json`中的`scripts`,配置一些 npm 可以执行的命令，配置后通过`npm run xxx`执行

> package.json

- dependencies
  > 生产依赖模块(开发和项目部署的时候都需要)
- devDependencies
  > 开发一拉模块(只有在开发的时候需要)
- scripts
  > 配置本地可执行命令的

> 基本操作

```
npm init -y
//初始化当前项目配置依赖清单(项目文件夹的名字不能出现中文、大写字母和特殊符号)
//=>创建成功后在当前项目中生成package.json的清单文件

npm i xxx --save //把模块保存在清单生产依赖中

npm i xxx --save-dev //把模块保存在清单开发依赖中

npm install //跑环境，按照清单安装所需的模块

npm uninstall xxx
npm uninstall xxx -g
//卸载安装过的模块

```

> 一个项目的开始

- 创建项目文件夹
- 把新创建的文件夹作为一个新的仓库进行代码管理
- 初始化模块配置清单 pageage.json：`npm init -y`
- 安装所需要的模块：`npm i xxx`
- 正常开发
- 开发中:可能需要在本地配置命令去完成一些功能（例如 LESS 文件编译，此时需要配置 npm 可执行的命令）
  ```
     //package.json
     "scripts":{
        "less":"lessc css/index.less css/index.min.css -x"
     }
  ```
  > 需要编译的时候执行: `npm run less`
- 开发中基于 git 把文件进行管理:生成对应的历史版本

  > 提交到暂存区、历史区、远程仓库时，需要设置忽略文件`.gitignore`

  ```
  /node_modules
  ...

  ```

- 跑环境 `npm install`
