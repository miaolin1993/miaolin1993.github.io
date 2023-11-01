# TypeScript学习笔记

## ts基础类型

- boolean
- number
- string
- Array<>
- 元组（固定类型的数组）
- enum（通过枚举属性获得其值，改善硬编码）
- any
- void（没有任何类型）
- null
- undefined
- never（永远不存在值， 比如抛出异常）



## 类型断言

一般不用，除非情况特殊（尽可能减少在使用阶段使用）

```
// 假设给data断言为any属性并取其name值
(data as any).name
```



## interface

定义可拓展属性

```
interface Str {
  // 当存在不确定数量的参数时可以这么写
  [key: string]: any
}
```



定义函数和函数下面的属性

```
interface Fn {
  (val: string, val2: string): string
  name: string
}

const fn: Fn = function(a, b) {
  return ''
}

fn.name = '22'
```





## class

三种修饰符：

- public：公有方法
- private：私有方法，不能在声明类的外部使用
- protected：子类可以访问，实例不能访问



implements实现约束  绑定类和interface

不同于继承，约束的意思是你只要符合我的规定就可以



```
// 约束实例
interface pp {
  go(): void
  game(): void
}

interface tt {
  run(): void
}
// 约束构造函数和静态方法
interface Con {
  new (val: string, val2: number): void
  name: string
}

// class
const PlayStatic:Con = class Play implements pp, tt {
  constructor(val: string, val2: number) {}
  name: ''
  go() {}
  game() {}
  run(){}
}
```



## 泛型

 #### 用在函数中

作为参数

```
// 下面T的意思是，用户可以传入一个T，让参数类型和返回结果类型都是T
function test<T>(a: T): T {
  return a
}

test('s').split('')
test(123).toFixed(2)

// 传入一个T，让参数类型是T
function test<T>(a: T): number {
  return a
}
// 传入一个T，让返回结果类型是T
function test<T>(a: number): T {
  return a
}
```

调整返回结果

```
function arr<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
console.log(arr([1, 2])) // [ 2, 1 ]
console.log(arr(['22', '00']))  // [ '00', '22' ]
```

api调用

```
interface Res {
  data: {
    [key: string]: string
  }
  status: number
  message: string
}

async function getApi<T>(url: string): Promise<T> {
  return await fetch(url).then(res => res.json())
}

getApi<Res>('url').then(res => {
  // 这里res的结果就已经赋值给接口返回结果了
  console.log(res.data, res.status, res.message)
})

```



### 用在react中

FC就属于一个类型的别名，不然原类型太长了

```
// npm i react @types/react

import React, { FC } from 'react'

interface IProps {
  name: string,
  title: string
}

const getElement: FC<IProps> = (props) => {
  return (
    <>
     <div>{props.name}</div> 
    </>
  )
}


// react 源码
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
```



### 泛型约束extends

泛型中的extends并不是类的继承的意思，他是一种约束，如`<T extends Iprop1>`的意思是T类型必须存在于Iprop1中

```
interface Iprop1 {
  length: number
}
// 这段代码相当于泛型T必须存在于Iprop1中
function goTest<T extends Iprop1>(res: T): T {
  console.log(res.length)
  return res
}

goTest('123')
goTest([])
// goTest(123)
// goTest(null)
// goTest(undefined)


// 这个三元的意思是，如果泛型T是null或者number，那么最终类型就是number，否则就是string
type NoneType<T> = T extends null | number ? number : string
type newType = NoneType<boolean> // string
```





## 特殊符号

交叉类型 & 表示且

```
type Factory<P> = (props?: Attributes & P, ...children: ReactNode[]) => ReactElement<P>;
```



联合类型 | 表示或

`let s = string | number`



类型断言as



## ts内置类型

Partial

```
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```



## TS高级语法

keyof 获取类型所有key

```
interface ppp {
  name: string
  age: number
}
type p2 = keyof ppp  
// p2的结果只能是name和age

```



keyof 获取类型value

```
interface ppp {
  name: string
  age: number
}
type p2 = keyof ppp  
type val = ppp['name']

```

in 在ts中可以遍历


类型过滤获得新类型的内置方法，下面方法的原理就是进行遍历筛选
```
interface Person {
  name: string;
  age: number;
  id: number;
  sex: 0 | 1;
}

type womanParams = "name" | "id"

// 从类型中取出需要的，返回新类型
type Woman = Pick<Person, womanParams>;
// 从类型中去掉不需要的，返回新类型
type Man =  Omit<Person, "sex" | "age">
```





## declare

导入ts类型给某个函数或对象，一般多用于为历史js项目补充类型说明用，用ts写的新项目基本是用不到这个功能，原理是项目会默认加载`node_modules`下`types`目录下的所有文件

```
// node_modules/@types/myFetch/index.d.ts
type httpMethod= 'GET' | 'POST'

declare function myFetch<T> (url: string, method: httpMethod, data: any ):Promise<T>
// namespace对内部方法进行补充
declare namespace myFetch {
  const get: <T>(url: string, method?: 'GET') => Promise<T>
  const post: <T>(url: string, method?: 'POST', data?: any) => Promise<T>
}
```

```
// myFetch.js
function myFetch(url, method, data = '') {
  return fetch(url, {
    method,
    body: data
  }).then(val => val.json)
}
  
myFetch.get = (url) => {
  return myFetch(url, 'GET')
}

myFetch.post = (url, data) => {
  return myFetch(url, 'POST', data)
}

export default myFetch
```

```
// test.ts

myFetch<string>('url', 'GET', '')
myFetch.get<string>('url')

```



