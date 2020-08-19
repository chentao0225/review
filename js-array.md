## 数组及数组常用方法

> 数组是对象数据类型的，它属于特殊的对象  
> 数字作为索引(key 属性名)  
> length 代表数组长度  
> ary[0] 根据索引获取指定项的内容

### 数组中常用方法

- 方法的作用和含义
- 方法的实参(类型和含义)
- 方法的返回值
- 原来的数组是否会发生改变

#### 1.实现数组增删改的方法

> 这一部分方法都会修改原来的数组

`push`

> push:向数组末尾增加内容  
> @params  
>  多个任意类型  
> @return  
>  新增后数组的长度

```
let arr =[12,45]
let res=arr.push(34,'1')
//基于原生JS操作键值对的方法，也可以向末尾追加一项新的内容
arr[arr.length]=16
console.log(res,arr)//=> 5, [12,45,34,'1',16]
```

`unshift`

> unshift:向数组开始位置增加内容  
> @params  
>  多个任意类型  
> @return  
>  新增后数组的长度

```
let arr=[10,20]
let res=arr.unshift(30,'aa')
console.log(res,arr)//=> 4,[30,'aa',10,20]
//基于原生ES6展开运算符，把原有的arr克隆一份，在新的数组中创建第一项，其余内容使用原始arr中的信息，也算实现了向开始追加的效果
arr=[100,...arr]
console.log(arr)//=>[100,30,'aa',10,20]
```

`shift`

> shift:删除数组中的第一项  
> @params  
> @return
> 删除的哪一项

```
let arr=[12,4,5,7,8]
let res=arr.shift()
console.log(res,arr)//=>12 ,[4,5,7,8]
//基于原生JS中的delete,把数组当做普通的对象，确实可以删除掉某一项内容，但是不会影响数组本身的结构特点(length长度不会跟着修改),真实项目中杜绝这样的删除使用
delete arr[0]
console.log(arr)//=>[ 1:5,2:7,3:8,length:4 ]
```

`pop`

> pop:删除数组的最后一项  
> @params  
> @return  
>  删除的那一项

```
let arr=[1,2,4,6]
let res=arr.pop()
console.log(res,arr)//=>6,[1,2,4]
//基于原生JS让数组长度减一，默认就是删除最后一项
arr.length-- //=>arr.length=arr.length-1
console.log(arr)
```

`splice`

> splice:实现数组的增加、删除、修改  
> @params  
>  n,m 都是数字 从索引 n 开始删除 m 个元素(m 不写，是删除到末尾)  
> n,m x 从索引 n 开始删除 m 个元素，用 x 占用删除的部分  
> n,0,x 从索引 n 开始，一个都不删，把 x 放到索引 n 的前面  
> @return  
>  把删除的部分用新数组存储起来返回

```
//删除
let arr=[1,3,5,6,7,8,9]
let res=arr.splice(2,4)
console.log(res,arr)//=>[5,6,7,8],[1,3,9]
//基于这个方法可以清空一个数组，把原始数组中的内容以新数组存储起来
（有点类似数组的克隆：把原来的数组克隆一份一模一样的给新数组）
//res=arr.splice(0)
//console.log(res,arr)//=>[1,3,9],[]
//删除数组最后一项和第一项
arr.splice(arr.length-1)
arr.splice(0,1)
console.log(arr)//=> [3]
```

```
//修改
let arr=[1,2,3,5]
let res=arr.splice(2,1,'a','b')
console.log(res,arr)//=>[3],[1,2,'a','b',5]
//增加
arr.splice(3,0,'c')
console.log(arr)//=>[1,2,'a','c','b',5]

//向数组末尾追加
arr.splice(arr.length,0,6)
//向数组开始追加
arr.splice(0,0,'A')
console.log(arr)//=>['A',1,2,'a','c','b',5,6]
```

#### 2.数组的查找和拼接

> 这些方法，原来数组不会改变

`slice`

> slice:实现数组的查询  
> @params  
>  n,m 都是数字 从索引 n 开始，找到索引为 m 的地方(不包含 m 这一项)
> @return  
> 把找到的内容以一个新数组的形式返回

```
let arr=[1,3,5,6,7]
let res=arr.slice(1,3)
console.log(arr)//=>[3,5],[1,3,5,6,7]

//m不写是找到末尾
res=arr.slice(1)
console.log(res)//=>[3,5,6,7]
//数组的克隆，参数0不写也可以 这种方法叫做浅克隆
res=arr.slice(0)
console.log(res)//=>[1,3,5,6,7]

//思考：
如果n/m为负数会咋样,如果n>m会咋样，如果是小数会咋样，如果是非有效数字会咋样，如果m/n的值比最大索引大会咋样
```

`concat`

> concat:实现拼接数组  
> @params  
>  多个任意值
> @return  
>  拼接后的新数组(原来的数组不变)

```
let arr1=[1,2,3]
let arr2=[4,5,6]
let res=arr1.concat('测试',arr2)
console.log(res)//=>[1,2,3,'测试',4,5,6]
```

#### 3.把数组转换为字符串

> 原有数组不变

`toString`

> toString:把数组转换为字符串  
> @params  
> @return  
>  转换后的字符串,每一项用逗号分隔(原数组不变)

```
let arr=[1,2,3]
let res=arr.toString()
console.log(res)//=>'1,2,3'
console.log([].toString())//=>''
console.log([4].toString())//=>'12'
```

`join`

> join:把数组转化字符串  
> @params  
>  指定的分隔符(字符串格式)  
> @return  
>  转换的字符串(原来数组不变)

```
let arr=[1,3,5]
let res=arr.join('')
console.log(res)//=>'135'
res=arr.join()
console.log(res)//=>'1,3,5'
res.arr.join('|')
console.log(res)//=>'1|3|5'
res.arr.join('+')
console.log(res)//=>'1+3+5'
console.log(eval(res))//=>9 eval把字符串变为JS表达式执行
```

#### 4.检测数组中是否包含某一项

`indexOf / lastIndexOf / includes`

> indexOf/lastIndexOf:检测当前项在数组中第一次/最后一次出现位置的索引值(在 IE6~8 中不兼容)  
> includes:检测数组是否包含某一项 找到了返回 true 反之 false  
> @params  
>  要检索的这一项内容  
> @return  
>  这一项出现的位置索引值(数字),如果数组中没有这一项，返回的是-1，原数组不变

```
let arr=[1,2,3,1,2,3]
console.log(arr.indexOf(2))//=>1
console.log(arr.lastIndexOf(2))//=>4

//ES6新增
console.log(arr.includes(30))//=>false 找到了返回true 反之false
```

#### 5.数组的排列和排序

`reverse`

> reverse:把数组倒过来排列  
> @params  
> @return  
> 排列后的新数组  
> 原来数组改变

```
let arr=[1,2,3]
arr.reverse()
console.log(arr)//=>[3,2,1]

```

`sort`

> sort:实现数组排序  
> @params  
>  可以没有，也可以是个函数  
> @return  
>  排序后的新数组  
>  原先数组改变

```
let arr=[3,4,7,8,24,78,2,67]
ary.sort()
//sort方法中如果不传递参数，是无法处理10以上的数字排序的(它是默认按照每一项的第一个字符来排序的)
console.log(ary)//=> [2, 24, 3, 4, 67, 7, 78, 8]
//想要实现多位数正常排序，需要给sort传递一个函数,函数中返回a-b实现升序，b-a实现降序

//a和b是相邻的两项
arr.sort((a,b)=>a-b)
console.log(arr)//=> [2, 3, 4, 7, 8, 24, 67, 78]

```

#### 6.遍历数组中每一项的方法

`forEach`

> forEach:遍历数组中的每一项内容  
> @params  
>  回调函数  
> @return
>
> 原先数组不变

```
//原生JS循环
let arr=[1,2,3,5,6]
for(let i=0;i<arr.length;i++){
    console.log(i,arr[i])
}
//forEach
//数组中有多少项，函数就会被默认执行多少次
//每一次执行函数：item是数组中的当前操作的这一项，index是当前项的索引
arr.forEach((item,index)=>{
    console.log(index,item)
})
```

`map`

`filter`

`find`

`reduce`

`some`

`every`

### 数组去重

#### 方案一

> 思路：新建一个数组，如果数组里没有存在当前循环的值，就把值存到新数组 反之跳过

```
let arr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
let ary = [];
for (let i = 0; i < arr.length; i++) {
  let item = arr[i];
  if (ary.indexOf(item) !== -1) {
    continue;
  }
  ary.push(item);
}
console.log(ary); //=>[1,2,3]

```

#### 方案二

> 思路：双 for 循环一个一个比,相同就删除,需要注意数组塌陷

```
let arr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(j, 1);
      j--;//存在数组塌陷需要注意
    }
  }
}
console.log(arr);

```

#### 方案三

> 思路：新建一个对象，利用对象中属性名不存在属性值默认为 undefined 然后删除重复值 需要注意数组塌陷

```
let arr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
let obj = {};
for (let i = 0; i < arr.length; i++) {
  let item = arr[i];
  if (obj[item] !== undefined) {
    arr.splice(i, 1);
    i--;
  }
  obj[item] = item;
}
console.log(arr);

```

#### 方案四

> 推荐  
> 方案三的优化 splice 删除当前项后 后面每一索引都要往前移 如果后面内容有很多 则性能不好

```
let arr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
let obj = {};
for (let i = 0; i < arr.length; i++) {
  let item = arr[i];
  if (obj[item] !== undefined) {
    arr[i] = arr[arr.length - 1];
    arr.length--;
    i--;
  }
  obj[item] = item;
}
console.log(arr);

```

#### 方案五

> ES6

```
let arr = [1, 3, 4, 2, 2, 1, 3, 4, 6, 4];
arr = [...new Set(arr)];
console.log(arr);//=>[1, 3, 4, 2, 6]

```
