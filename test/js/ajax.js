~function () {
    /**
     * 支持的配置项
     *  url:请求地址
     *  method:请求方式 get/post/head/put/delete/options
     *  data:传递给服务器的信息：支持的格式string和json，
     *      如果是object，需要处理为x-www-form-urlencoded格式；
     *      get请求是把信息作为问号参数传递给服务器，   
     *      post是放到请求主体传递给服务器
     *  dataType:把服务器返回的结果处理成对应的格式 json/text/xml
     *  anync:是否异步
     *  cache:只对get请求有作用：设置为false，在url的末尾加随机数来清除缓存
     *  timeout:超时时间
     *  headers:设置请求头信息
     *  success:成功执行的函数,把获取的结果、状态信息、XHR传递给它
     *  error:失败执行的函数,把错误信息传递给它
     * 
     */
    function ajax(options) {
        return new init(options)
    }
    //默认参数
    let defaults = {
        url: '',
        method: 'get',
        data: null,
        dataType: 'json',
        async: true,
        headers: {},
        cache: true,
        timeout: null,
        success: null,
        error: null
    }
    //检查是否为get系列请求
    let regGET = /^(GET|DELETE|HEAD|OPTIONS)$/i
    function init(options = {}) {
        this.options = Object.assign(defaults, options)
        this.xhr = null;
        this.send()
    }

    ajax.prototype = {
        constructor: ajax,
        //发送ajax请求
        send() {
            let xhr = null,
                { url, method, data, async, dataType, headers, cache, timeout, success, error } = this.options
            this.xhr = xhr = new XMLHttpRequest;

            //处理data:get系列把数据放到url末尾
            data = this.handleData()
            if (data !== null && regGET.test(method)) {
                url += `${this.checkASK(url)}${data}`
                data = null
            }
            //处理cache:是get系列并且cache是false需要清缓存
            if (cache === false && regGET.test(method)) {
                url += `${this.checkASK(url)}_=${Math.random()}`
            }
            xhr.open(method, url, async)
            //超时处理
            timeout !== null && typeof timeout === 'number' ? xhr.timeout = timeout : null
            //处理请求头

            if (Object.prototype.toString.call(headers) === '[object Object]') {
                for (let key in headers) {
                    if (!headers.hasOwnProperty(key)) break
                    xhr.setRequestHeader(key, encodeURIComponent(headers[key]))
                }
            }

            xhr.onreadystatechange = function () {
                let { status, statusText, readyState: state, responseText, responseXML } = xhr
                if (/^(2|3)\d{2}$/.test(status)) {
                    if (state === 4) {
                        switch (dataType.toUpperCase()) {
                            case 'JSON':
                                responseText = JSON.parse(responseText)
                                break
                            case 'XML':
                                responseText = responseXML
                        }
                        typeof success === 'function' ? success(responseText, statusText, xhr) : null
                    }
                    return
                }
                typeof error === 'function' ? error(statusText, xhr) : null
            }
            xhr.send(data)
        },
        //处理data参数
        handleData() {
            let { data } = this.options
            if (data === null || typeof data === 'string') return data

            let str = ``
            for (let key in data) {
                if (!data.hasOwnProperty(key)) break
                str += `&${key}=${data[key]}`
            }
            return str.substring(1)
        },
        //检查url是否存在问号
        checkASK(url) {
            return url.indexOf('?') === -1 ? '?' : '&'
        }
    }

    init.prototype = ajax.prototype
    window._ajax = ajax
}()