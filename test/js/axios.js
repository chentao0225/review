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
