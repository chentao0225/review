## Promise

> ES6 语法规范中新增加的内置类，用来处理 JS 中异步编程，而我们所谓的 promise 设计模式，就是基于 promise 对异步操作进行管理

- promise 有三个状态

  1. pending:初始状态(new Promise 后的状态)
  2. fulfilled:成功状态
     > 在 executor 函数中把 resolve 执行，就是告知 promise 当前异步操作的结果是成功的
  3. rejectd:失败状态
     > 在 executor 函数中把 reject 执行，就是告知 promise 当前异步操作的结果是失败的

- new promise 发生了以下事情

1. 执行 executor 函数
2. 把 executor 中异步操作开始执行
   > 等异步操作完成基于 then 方法，构建成功或者失败后要做的事情，当状态更改后，通知事件池中方法执行
3. 在异步操作完成后，通过执行 resolve/reject 修改 promise 实例的状态
4. resolve 和 reject 在执行的时候，可以给其传参，传递的参数会修改 promise 实例的 value 值

**异步编程中的"回调地狱"**

- AJAX 的串行
  > 只有第一个请求成功才能执行第二个，第二个成功才能执行第三个...最后一个请求成功后拿到了每一次请求的所有数据
  ```javascript
    $.ajax({
        url:'/baseInfo',
        method:'get',
        success:result=>{
            let scoreId=result.scoreId
            $.ajax({
                url:'/scoreInfo',
                method:'get',
                success:result=>{
                    let chinese=result.chinese
                    $.ajax({
                        ...
                    })
                }
            })
        }
    })
  ```
- AJAX 的并行
  > 三个请求可以同时发送，但是需要等到所有请求都成功才会做一件事
  ```javascript
  let count = 0;
  $.ajax({
    url: "/a",
    method: "get",
    success: (result) => {
      //...
      count++;
    },
  });
  $.ajax({
    url: "/b",
    method: "get",
    success: (result) => {
      //...
      count++;
    },
  });
  function func() {
    if (count >= 2) {
      //处理自己要做的事情
    }
  }
  ```

**基础语法**

> new Promise([executor])：第一个执行函数必须传递

1. new Promise 的时候就会把 executor 执行，创建一个实例(executor 是 promise 类的一个回调函数，promise 内部会把它执行)
2. promise 不仅把 executor 执行，而且还给 executor 传递两个参数(两个参数也是函数类型)
   - resolve 函数:它执行代表 promise 处理的异步事情是成功的，把 promise 的状态改为 fulfilled(resolved)
   - reject 函数:它执行代表 promise 处理的异步事情是失败的，把 promise 的状态改为 rejected
3. executor 函数中放的就是当前要处理的异步操作事情

```javascript
let promiseExamp = new Promise((resolve, reject) => {
  //这里一般都是即将处理的异步任务，任务成功执行resolve,任务失败执行reject(写同步也可以)
  let ran = Math.random();
  setTimeout(() => {
    if (ran < 0.5) {
      reject(ran);
      return;
    }
  }, 1000);
  resolve(ran);
});
promiseExamp.then(
  (result) => {
    //状态为fulfilled成功后执行(result:[[PromiseValue]])
    console.log("成功" + result);
  },
  (error) => {
    //状态为rejected失败后执行
    console.log("失败" + error);
  }
);
```

> 在 js 中当前行代码报错，会中断主线程的渲染(下面代码将不再执行)  
> throw new Error('')：手动抛出一个异常错误，目的就是让后面代码不再执行  
> 如果上面代码报错，不想让其影响后面的代码，需要做异常捕获：try catch finally

**Promise.prototype**

- then
  > 设置成功或者失败后执行的方法(成功或者失败都可以设置，也可以只设置一个)  
  > pro.then([success],[error])  
  > pro.then([success])  
  > pro.then(null,[error])
- catch
  > 设置失败后执行的方法
- finally
  > 设置不论成功还是失败都会执行的方法(一般不用)

> 执行 then/catch/finally 返回结果是一个全新的 promise 实例，所以可以链式写下去；下一个 then 中哪个方法会执行，由上一个 then 中某个方法执行的结果来决定  
> 上一个 then 中某个方法的返回值会传递给下一个 then 的某个方法中  
> then 中 return 的结果相当于把当前这个新的 promise 实例中的 value 值改为返回值  
> 如果当前 promise 实例的状态确定后，都会到对应的 then 中找方法，如果 then 中没有对应的这个方法，则会向下顺延  
> 执行报错，让.then 创建的 promise 实例变为失败状态，并且把报错的原因修改为此 promise 的 value 值  
> then 方法中如果返回的是一个 promise 实例，则当前返回的实例的成功或者失败状态，影响着下一个 then 中哪个方法会被触发执行：如果返回的是非 promise 实例，则看当前方法执行是否报错，来决定下一个 then 中哪个方法执行

**Promise.all([promise1,promise2,...])**

> all 中存放的是多个 promise 实例(每一个实例管理着一个异步操作),执行 all 方法返回的结果是一个新的 promise 实例"proA"  
> 当所有 promise 实例的状态都为 fulfilled 的时候(成功)，让 proA 的状态也变为 fulfilled，并且把所有 promise 成功获取的结果，存储为一个数组(顺序和最开始编写的顺序一致)"[res1,res2,...]"，让 proA 这个数组的 value 值等于这个数组  
> 都成功(proA 状态是 fulfilled)才会通知 then 中第一个方法执行，只要有一个失败(proA 状态是 rejected)，就会通知 then 中第二个方法后者 catch 中的方法执行

**Promise.race([ajax1,ajax2,...])**

> 看 promise 实例中谁先得到最后的状态，最后的结果就以谁为主

### axios

> 一款基于 promise 设计模式封装的 ajax 库(JQ 中的 ajax 就是最普遍的 ajax 库，没有基于 promise 管理)

- axios.get([url],[options])
  > get/delete/head
- axios.post([url],[data],[options])
  > data 通过请求主体传递给服务器的内容  
  > post/put
- 配置项 options - baseURL:基础的 url 路径 - transformRequest:处理请求参数(对 post 系列有用) - transformResponse:把返回的结果进行处理 - headers:请求头 - params >get 系列请求传递给服务器的内容(会把 params 中的内容拼接为 x-www-form-urlencoded 这种格式，基于 url 问号传参传递给服务器) - paramsSerializer:传递参数的序列化 - timeout:超时时间 - withCredentials:跨域请求中是否允许携带凭证 - responseType >预设服务器返回结果的格式，默认是 JSON，支持 buffer/text/stream(流)/document - validateStatus >axios 本身只有在 http 状态码为 2 开头的时候才认为是成功的，其余都认为是失败状态，当然可以设置，基于 validateStatus 这个来修改 - ...

  > 执行 axios.xxx()都会返回一个 promise 实例，ajax 请求成功会把实例的状态改为 fulfilled，请求失败状态改为 rejected；并且获取的结果或者错误的原因作为 promise 的 value  
  > 从服务器获取的结果
  >
  > - config:自己配置的选项信息
  > - data:存储的是响应主体内容
  > - headers:存储响应头的信息
  > - request:ajax 实例
  > - status:响应状态码
  > - status-text:状态码的描述

- 使用 axios 之前，需要配置默认的配置项

  1. 基础 URL,后期发送请求的时候，URL 请求地址最前面的公共部分就不需要写了
     > axios.defaults.baseURL='xxx'
  2. 跨域请求允许携带资源凭证(例如 cookie 信息)
     > axios.defaults.withCredentials=true
  3. 设置请求头:post 系列中，传递给服务器数据的格式一般以 x-www-form-urlencoded 格式为主
     > axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded'
  4. 设置请求拦截器(只对 post 系列有效)
     > 把基于请求主体传递给服务器的内容进行拦截，把内容格式变为 x-www-form-urlencoded 这种格式，在传递给服务器

  ```javascript
  axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let str = ``;
    for (let key in data) {
      if (!data.hasOwnProperty(key)) break;
      str += `&${key}=${data[key]}`;
    }
    return str.substring(1);
  };
  ```

  5. 设置响应拦截器
     > [成功状态]把从服务器获取的结果中响应主体信息获取到即可，[失败状态]手动把错误信息抛出异常

  ```javascript
      axios.interceptors.response.use(function(response){
          return response.data;
      },function (error){
          thorw new Error(error)
      })
  ```

  6. 配置什么才算成功(把 promise 状态改为 fulfilled)

  ```javascript
  axios.defaults.validateStatus = function (status) {
    return /^(2|3)\d{2}$/.test(status);
  };
  ```

- axios.all([promise1,promise2])
  > 相当于 Promise.all
- axios.spread
  > 把基于 axios.all 获取的结果一项项的单独获取

### 封装自己的 axios 库

> 支持的功能

1. 支持全局默认配置项 \_ajax.defaults.xxx=xxx
2. 发送请求\_ajax.get/post...
3. 每一次请求都会返回 promise 实例，基于 promise 设计模式进行管理
4. 支持\_ajax.all

```javascript
~(function () {
  class MyAjax {
    constructor(url, options) {
      this.url = url;
      this.options = options;
      return this.init();
    }
    init() {
      let {
        url,
        options: {
          baseURL,
          withCredentials,
          headers,
          transformRequest,
          transformResponse,
          validateStatus,
          params,
          data,
          cache,
          method,
        },
      } = this;
      //保证响应拦截器的合法性
      !Array.isArray(transformResponse) ? (transformResponse = []) : null;
      new Array(2).fill(null).forEach((item, index) => {
        typeof transformResponse[index] !== "function"
          ? (transformResponse[index] = null)
          : null;
      });
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        //url处理
        url = baseURL + url;
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)) {
          if (params) {
            let result = ``;
            for (let key in params) {
              if (!params.hasOwnProperty(key)) break;
              result += `&${key}=${params[key]}`;
            }
            result = result.substring(1);
            url += `${url.indexOf("?") === -1 ? "?" : "&"}${result}`;
          }
          if (cache === false) {
            url += `${url.indexOf("?") === -1 ? "?" : "&"}_=${Math.random()}`;
          }
        }
        xhr.open(method, url);
        xhr.onreadystatechange = () => {
          let flag = validateStatus(xhr.status);
          if (!flag) {
            reject({
              status: xhr.status,
              statusText: xhr.statusText,
              requst: xhr,
            });
          }
          if (xhr.readyState === 4) {
            let res_headers = {};
            xhr
              .getAllResponseHeaders()
              .split(/\n/)
              .forEach((item) => {
                let [key = "", val = ""] = item.split(":");
                if (key.trim() === "") return;
                res_headers[key.trim()] = val.trim();
              });
            resolve({
              status: xhr.status,
              statusText: xhr.statusText,
              request: xhr,
              data: JSON.parse(xhr.responseText),
              headers: res_headers,
            });
          }
        };
        //跨域处理
        xhr.withCredentials = withCredentials;
        //设置请求头
        if (headers) {
          for (let key in headers) {
            if (!headers.hasOwnProperty(key)) break;
            xhr.setRequestHeader(key, encodeURIComponent(headers[key]));
          }
        }
        //请求拦截器：请求主体传递信息的拦截
        if (/^(POST|PUT)$/i.test(method)) {
          typeof transformRequest === "function"
            ? (data = transformRequest(data))
            : null;
        } else {
          data = null;
        }

        xhr.send(data);
      }).then(...transformResponse);
    }
  }
  //初始化参数
  function _init(options) {
    //headers需要特殊处理(把用户中传递的headers和defaults中的headers进行合并，而不是整体替换),
    //其余配置项直接用options中的替换defaults中的即可
    options.headers = Object.assign(_ajax.defaults.headers, options.headers);
    delete options.headers;
    return Object.assign(_ajax.defaults, options);
  }
  function _ajax() {}
  _ajax.defaults = {
    //全局配置项
    baseURL: "",
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: function (data) {
      if (!data) return data;
      let result = ``;
      for (let key in data) {
        if (!data.hasOwnProperty(key)) break;
        result += `&${key}=${data[key]}`;
      }
      return result.substring(1);
    },
    transformResponse: [
      function onFulfilled(response) {
        return response.data;
      },
      function onRejected(error) {
        return Promise.reject(error);
      },
    ],
    validateStatus: function (status) {
      return /^(2|3)\d{2}$/.test(status);
    },
    //请求配置项
    params: {},
    data: {},
    cache: true,
  };

  _ajax.all = function (promiseArr = []) {
    return Promise.all(promiseArr);
  };
  ["get", "delete", "head", "options"].forEach((item) => {
    _ajax[item] = function (url, options = {}) {
      options.method = item;
      return new MyAjax(url, _init(options));
    };
  });
  ["post", "put"].forEach((item) => {
    _ajax[item] = function (url, data = {}, options = {}) {
      options.data = data;
      options.method = item;
      return new MyAjax(url, _init(options));
    };
  });
  window._ajax = _ajax;
})();
```
