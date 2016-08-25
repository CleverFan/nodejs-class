> 前言：工欲善其事，必先利其器。模块系统是nodejs组织管理代码的利器也是调用第三方代码的途径，本文将详细讲解nodejs的模块系统。在文章最后实例分析一下exprots和module.exprots。


----------


## ***nodejs模块的历史渊源***
### CommonJS规范

早在Netscape诞生不久后，JavaScript就一直在探索本地编程的路，Rhino是其代表产物。无奈那时服务端JavaScript走的路均是参考众多服务器端语言来实现的，在这样的背景之下，一没有特色，二没有实用价值。但是随着JavaScript在前端的应用越来越广泛，以及服务端JavaScript的推动，JavaScript现有的规范十分薄弱，不利于JavaScript大规模的应用。那些以JavaScript为宿主语言的环境中，只有本身的基础原生对象和类型，更多的对象和API都取决于宿主的提供，所以，我们可以看到JavaScript缺少这些功能：

- JavaScript没有模块系统。没有原生的支持密闭作用域或依赖管理。
- JavaScript没有标准库。除了一些核心库外，没有文件系统的API，没有IO流API等。
- JavaScript没有标准接口。没有如Web Server或者数据库的统一接口。
- JavaScript没有包管理系统。不能自动加载和安装依赖。

于是便有了CommonJS（http://www.commonjs.org）规范的出现，其目标是为了构建JavaScript在包括Web服务器，桌面，命令行工具，及浏览器方面的生态系统。

CommonJS制定了解决这些问题的一些规范，而Node.js就是这些规范的一种实现。Node.js自身实现了require方法作为其引入模块的方法，同时NPM也基于CommonJS定义的包规范，实现了依赖管理和模块自动安装等功能。这里我们将深入一下Node.js的require机制，npm会在下一篇文章进行讲解。



----------
## ***nodejs的模块***

### 什么是模块?
node.js通过实现CommonJS的Modules/1.0标准引入了模块(module)概念,模块是Node.js的基本组成部分.一个node.js文件就是一个模块,也就是说文件和模块是一一对应的关系.这个文件可以是JavaScript代码,JSON或者编译过的C/C++扩展.

Node.js的模块分为两类，一类为原生（核心）模块，一类为文件模块。

在文件模块中，又分为3类模块。这三类文件模块以后缀来区分，Node.js会根据后缀名来决定加载方法。

- .js。通过fs模块同步读取js文件并编译执行。
- .node。通过C/C++进行编写的Addon。通过dlopen方法进行加载。
- .json。读取json文件，调用JSON.parse解析加载。

Node提供了exports和require两个对象,其中exports是模块公开的接口,require用于从外部获取一个模块接口,即所获取模块的exports对象.

----------


## ***require和exports***

### **require**
require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。require方法接受以下几种参数的传递：

- http、fs、path等。原生模块。
- ./mod或../mod。相对路径的文件模块。
- /a/mod，绝对路径的文件模块。
- mod，非原生模块的文件模块。

### **exports**
exports对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过require函数使用当前模块时得到的就是当前模块的exports对象。

### **module**

通过module对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象

- **module.exports** ：{Object}类型，模块系统自动产生。

- **module.require(id)**：
		

> id {String}
> Return: {Object} 已解析模块的 module.exports 
> 这个方法提供了一种像 require() 一样从最初的模块加载一个模块的方法。

- **module.id**：{String}类型，用于区别模块的标识符。通常是完全解析后的文件名

- **module.filename**：{String}类型，模块完全解析后的文件名。

- **module.loaded**：{Boolean}类型，判断该模块是否加载完毕。

- **module.parent**：{Module Object}类型，返回引入了本模块的其他模块。

- **module.children**：{Array}类型，该模块所引入的其他子模块。

- 

### **demo1 module.exports的使用**

sayHello.js:
```
function sayHello() {
    console.log('hello');
}

module.exports = sayHello;
```
app.js:

```
var sayHello = require('./sayHello');
sayHello();

//hello
```
**代码讲解：**

定义一个sayHello模块，模块里定义了一个sayHello方法，通过替换当前模块exports对象的方式将sayHello方法导出。

在app.js中加载这个模块，得到的是一个函数，调用该函数，控制台打印hello。

### **demo2 匿名替换**

sayWorld.js

```
module.exports = function () {
    console.log('world');
}
```

app.js

```
var sayWorld = require('./sayWorld');
sayWorld();

//world
```
**代码讲解**

与上面稍有不同，这次是匿名替换。

### **demo3 替换为字符串**

不仅可以替换为方法，也可以替换为字符串等。

stringMsg.js

```
module.exports = 'i am a string msg!';
```

app.js

```
var string = require('./stringMsg');
console.log(string);

//i am a string msg!
```

### **demo4 exports导出多个变量**

当要导出多个变量怎么办呢？这个时候替换当前模块对象的方法就不实用了，我们需要用到exports对象。

useExports.js

```
exports.a = function () {
    console.log('a exports');
}

exports.b = function () {
    console.log('b exports');
}
```

app，js

```
var useExports = require('./useExports');
useExports.a();
useExports.b();
//a exports
//b exports
```

当然，将useExports.js改成这样也是可以的：

```
module.exports.a = function () {
    console.log('a exports');
}

module.exports.b = function () {
    console.log('b exports');
}
```

下面通过gif图进行演示：

![这里写图片描述](http://img.blog.csdn.net/20160825161123252)


> module.exports和exports在文章的最后会进行详细讲解。

### **模块初始化**

一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。

举个例子，count,js:

```javascript
var i = 0;

function count() {
    return ++i;
}

exports.count = count;
```
app.js

```
var c1 = require('./count');
var c2 = require('./count');

console.log(c1.count());
console.log(c2.count());
console.log(co2.count());
//1
//2
//3

```
可以看到，count.js并没有因为被require了两次而初始化两次。

### **主模块**

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，我们刚刚一直使用的app.js就是主模块。

### **二进制模块**

虽然一般我们使用JS编写模块，但NodeJS也支持使用C/C++编写二进制模块。编译好的二进制模块除了文件扩展名是.node外，和JS模块的使用方式相同。虽然二进制模块能使用操作系统提供的所有功能，拥有无限的潜能，但对于不熟悉C/C++的人而言编写过于困难，并且难以跨平台使用，因此本文不作讲解。

----------


## ***模块的加载优先级***

由于Node.js中存在4类模块（原生模块和3种文件模块），尽管require方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同，下面是require加载的逻辑图：

![这里写图片描述](http://img.blog.csdn.net/20160825163502071)

> 原生模块在Node.js源代码编译的时候编译进了二进制执行文件，加载的速度最快。另一类文件模块是动态加载的，加载速度比原生模块慢。但是Node.js对原生模块和文件模块都进行了缓存，于是在第二次require时，是不会有重复开销的。

----------



## ***exports与module.exports***

> 这里可能是最容易混淆的地方了。

我们先来看一个例子：

modOne.js
```
exports.hello = function () {
    console.log("hello");
}

module.exports = function () {
    console.log('world');
}
```
app.js

```javascript
var one = require('./modOne');

//one.hello(); //执行这句话会报错one.hello is not a function

one() //打印world
```

这是为什么呢？我们得先从exports 与module.exports 说起。

其实，exports 是module.exports的一个引用，exports 的地址指向module.exports。

而我们的modOne.js中通过module.exports = function的方式将module.exports给替换掉了。

而require方法所返回的是module.exports这个实实在在的对象，但是它已经被替换成了function，这就导致了exports指向了空，所以，你所定义的exports.hello是无效的。

**用一个通俗易懂的例子来重新解释一遍。**

比如你在电脑的D盘下新建了一个exports文本文档，然后你右键->发送到桌面快捷方式。

> D盘就相当于nodejs中的module，这个exports文本文档就相当于nodejs中模块的exports对象，快捷方式就相当于nodejs中指向exports对象引用
> 
>**D:/exportes.txt  ==>  module.exportes**
>**exportes.txt快捷方式 ==> exportes**

然后，你看exportes.txt不爽，把它给删了，然后新建了一个word文档--exports.docx。

这个时候你桌面上的快捷方式就没用了，虽然也叫exports，但是你是访问不到这个新的word文件的。

对于nodejs也一样，当你把module.exportes对象覆盖了，换成了其他东西的时候，exportes这个引用就失效了。

同样，我们还可以用这个例子来理解为什么exportes也可以用来导出模块。

我们是这样使用exportes的：

```
exports.hello = function () {
    console.log("hello");
}
```

这段代码其实等同于：

```
module.exports.hello = function () {
    console.log("hello");
}
```

怎么理解呢。还是刚才的txt文件，这次没有删除。
>**D:/exportes.txt  ==>  module.exportes**
>**exportes.txt快捷方式 ==> exportes**

你在桌面打开了exportes.txt快捷方式，然后在里面输入hello，然后保存，关闭。

你再打开D:/exportes.txt，你会发现你可以看到刚刚写的hello，你又在后面添加了一句“world”，保存关闭。

返回桌面，打开快捷方式，你会看到helloworld。

所以说你使用'exports.属性'和'module.exportes.属性'是等同的。

这也就能很好的解释下面这个问题了：

```
exports = function() {
   console.log('hello');
}

//这样写会报错
```

这样相当于把exprots这个引用覆盖掉了，你把txt文件的快捷方式改成docx的快捷方式还能打开原来的txt文件么？显然是不能的。


**最后做一个总结：**

当我们想让模块导出的是一个对象时， 使用exports 和 module.exports 都可以（但 exports 也不能重新覆盖为一个新的对象），而当我们想导出非对象接口时，就必须也只能覆盖 module.exports 。


----------
## 后记

不知道我这样讲解大家能不能理解，如果有什么地方不能理解或者有什么地方有错误请及时和我联系。

对应博客地址：http://blog.csdn.net/qq_31655965/article/details/52314764