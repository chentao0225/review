## 数据类型检测

- typeof

  > 用来检测数据类型的运算符

  ```javascript
  /**
   * typeof [value]
   * @return
   *    首先是个字符串
   *    字符串中包含对应的数据类型，例如："number"、"object"、"undefined"、"function"、"boolean"、"symbol"...
   * @局限性
   *    typeof null  =>"object"
   *    不能具体区分对象数据类型的值（无法检测是正则还是数组等）
   *    typeof []    =>"object"
   *    typeof {}    =>"object"
   *    typeof /^$/  =>"object"
   * @优势
   *    使用方便，所以在真实项目中，我们也会大量应用它来检测，尤其是在检测基本类型值(除null之外)和函数类型值的时候，它还是很方便的
   */
  function func(n, m, callback) {
  	/!* 形参赋值默认值 *!/
  	//=>ES6: func(n = 0, m = 0)
  	//=>检测形参的值是否为UNDEFINED
  	// n === undefined ? n = 0 : null;
  	// typeof m === "undefined" ? m = 0 : null;
  	//=>基于逻辑或和逻辑与处理（瑕疵：不仅仅是不传赋值默认值，如果传递的值是假也会处理成为默认值）
  	// n = n || 0;
  	// m = m || 0;

  	/!* 回调函数执行 *!/
  	// typeof callback === "function" ? callback() : null;
  	// callback && callback(); //=>瑕疵：传递的为真即可执行，不一定是一个函数，这样写是开发者心里已经知道，要不然不传，要传就是一个函数
  }
  func(10, 20, function anonymous() {});
  ```

- instanceof
  > 本意是用来检测实例是否隶属于某个类的运算符，我们基于这样的方式，也可以用来做某些数据类型的检测,例如：数组、正则等
  >
  > 局限性：
  >
  > 不能处理基本数据类型值
  >
  > 只要在当前实例的原型链(**proto**)中出现过的类，检测结果都是 true(用户可能会手动修改原型链的指向：example.**proto**或者 在类中的继承中 等情况)

```javascript
function func() {
  // arguments：类数组
  // arguments.__proto__ = Array.prototype;
  // console.log(arguments instanceof Array); //=>true
}
func();
let arr = [],
  reg = /^$/,
  obj = {};
console.log(arr instanceof Array); //=>true
console.log(reg instanceof Array); //=>false
console.log(arr instanceof Object); //=>true
console.log(obj instanceof Array); //=>false

console.log(1 instanceof Number); //=>false
// =>创建值的两种方式（不管哪种方式都是所属类的实例）
// 字面量：let n = 12;//=>false
// 构造函数：let m = new Number('12');//=>true
```

- constructor
  > 构造函数
  >
  > 原理：在类的原型上一般都会带有 constructor 属性，存储当前类本身，我们也时利用这一点，获取某一个的实例 constructor 属性值，验证是否为所属的类，从而进行数据类型检测
  >
  > 局限性：
  >
  > constructor 属性值太容易被修改了

```javascript
let n = 12,
  arr = [];
console.log(n.constructor === Number); //=>true
console.log(arr.constructor === Array); //=>true
console.log(arr.constructor === Object); //=>false
arr.constructor = 111; //=>设置私有属性
console.log(arr.constructor === Array); //=>false
Func.prototype = {}; //=>这样原型上没有CONSTRUCTOR属性（重构了）
```

- Object.prototype.toString.call([value])

  > 调用 Object 原型上的 toString 方法，让方法执行的时候,方法中的 this 是要检测的数据类型，从而获取到数据类型所属类的详细信息
  >
  > 信息的模板
  >
  > "[object 所属类]",例如：'[object Array]'...
  >
  > 在所有的数据类型类中，他们原型上都有 toString 方法，除了 Object.prototype.toString 不是把数据类型转换为字符串，其余的都是转为字符串，而 Object 原型上的 toString 是检测当前实例隶属类的详细信息的(检测数据类型)...
  > object.toString()
  >
  > 1.  首先基于原型链查找机制,找到 Object.prototype.toString
  > 2.  把找到的方法执行，方法中的 this->obj
  > 3.  方法内部把 this(obj)的所属类信息输出
  >     =>方法执行，方法中的 this 是谁，就是检测谁的所属类信息

  > 这个方法很强大，所有数据类型隶属的类息检测的一清二楚
  >
  > '[object Number/String/Boolean/Null/Undefined/Symbol/Object/Array/RegExp/Date/Math/Function...]'

  ```javascript
  let _obj = {},
    toString = _obj.toString;
  console.log(_obj.toString.call(100)); //=>"[object Number]"
  console.log(Object.prototype.toString.call(100)); //=>"[object Number]"

  function func(n, m) {
    return n + m;
  }
  let obj1 = {},
    obj2 = {
      name: "sun",
    };
  console.log([12, 23].toString()); //=>"12,23"
  console.log(/^\d+$/.toString()); //=>"/^\d+$/"
  console.log(func.toString()); //=>"function func(n, m) {..."
  console.log(obj1.toString()); //=>"[object Object]"
  console.log(obj2.toString()); //=>"[object Object]"
  ```

**自定义数据检测方法**

```javascript
let _obj = {
    isNumber: "Number",
    isBoolean: "Boolean",
    isString: "String",
    isNull: "Null",
    isUndefined: "Undefined",
    isSymbol: "Symbol",
    isObject: "Object",
    isArray: "Array",
    isRegExp: "RegExp",
    isDate: "Date",
    isFunction: "Function",
    isWindow: "Window",
  },
  _toString = _obj.toString,
  _type = {};
for (let key in _obj) {
  if (!_obj.hasOwnProperty(key)) break;
  _type[key] = (function () {
    let reg = new RegExp("^\\[object " + _obj[key] + "\\]$");
    return function anonymous(val) {
      return reg.test(_toString.call(val));
    };
  })();
}
```
