> 前言：从这篇文章开始，我将系统的讲解nodejs相关知识。为什么我要学习nodejs呢？因为帅的人都在学呀^_^


----------


## ***什么是nodejs***

简单的说 nodejs就是运行在服务端的 JavaScript。JS是脚本语言，脚本语言都需要一个解析器才能运行。对于写在HTML页面里的JS，浏览器充当了解析器的角色。而对于需要独立运行的JS，nodejs就是一个解析器。

每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了document之类的内置对象。而运行在nodejs中的JS的用途是操作磁盘文件或搭建HTTP服务器，nodejs就相应提供了fs、http等内置对象。

Node.js允许通过JavaScript和一系列模块来编写服务器端应用和网络相关的应用。核心模块包括文件系统I/O、网络（HTTP、TCP、UDP、DNS、TLS/SSL等）、二进制数据流、加密算法、数据流等等。Node模块的API形式简单，降低了编程的复杂度。

使用框架可以加速开发。常用的框架有Express.js、Socket.IO和koa等。Node.js的程序可以在Microsoft Windows、Linux、Unix、Mac OS X等服务器上运行。Node.js也可以使用CoffeeScript（一种旨在简化JavaScript的替代语言，其代码可按照一定规则转化为合法的JavaScript代码）、TypeScript（微软开发的强化了数据类型的JavaScript变体）、Dart语言，以及其他能够编译成JavaScript的语言编程。

Node.js主要用于编写像Web服务器一样的网络应用，这和PHP和Python是类似的。但是Node.js与其他语言最大的不同之处在于，PHP等语言是阻塞的（只有前一条命令执行完毕才会执行后面的命令），而Node.js是非阻塞的（多条命令可以同时被运行，通过回调函数得知命令已结束运行）。

Node.js是事件驱动的。开发者可以在不使用线程的情况下开发出一个能够承载高并发的服务器。其他服务器端语言难以开发高并发应用，而且即使开发出来，性能也不尽人意。Node.js正是在这个前提下被创造出来。Node.js把JavaScript的易学易用和Unix网络编程的强大结合到了一起。

Node.js使用Google V8 JavaScript 引擎，因为：

- V8是基于BSD许可证的开源软件
- V8速度非常快
- V8专注于网络功能，在HTTP、DNS、TCP等方面更加成熟

Node.js已经有数十万模块，它们可以通过一个名为npm的管理器免费下载。Node.js开发社区主要有两个邮件列表、一个在freenode的名为#node.js的IRC频道。社区集中在[NodeConf](http://nodeconf.com/)与[CNode](http://cnodejs.org/)。


----------


## ***国际惯例HelloWorld***

> 操作系统：win10
> nodejs版本：5.10.1

新建一个helloworld.js，输入以下代码：

```javascript
//通过require引入http模块，并将实例化的 HTTP 赋值给变量 http
var http = require( 'http' );

//创建一个服务器
//req:request,接收参数
//res:response,响应数据
http.createServer(function (req, res){
    //设置响应头
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    res.writeHead('200',{'ContentType':'text/plain'});
    //以一个字符串作为响应的结尾
    res.end('hello world');
    //这个服务监听80端口（也就是说，访问80端口的行为会被该服务接收）
}).listen(80);

//终端打印一句话，表示服务已经开启
console.log('please input "localhost" in explore');
```
打开控制台，输入

```
node helloworld.js
```
会看到控制台输出：please input "localhost" in explore

打开浏览器输入localhost，会看到浏览器显示‘hello world’。

下面做一下演示：

![这里写图片描述](http://img.blog.csdn.net/20160825101658924)


对代码进行一个简单的讲解：

第一行：通过require引入http模块，并将实例化的 HTTP 赋值给变量 http
```
var http = require( 'http' );
```

为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。模块可以自己创建也可以使用nodejs自带的模块。

require()方法就是用来获得模块的。这里我们引入了nodejs自带的‘http’模块，并将返回的http对象赋值给我们新定义的 本地http变量，这样我们就可以在本地操作http模块中的相应方法了。

第二行：调用http模块中的createServer方法，创建一个服务器并监听80端口。

```
//创建一个服务器
//req:request,接收参数
//res:response,响应数据
http.createServer(function (req, res){
    //设置响应头
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    res.writeHead('200',{'ContentType':'text/plain'});
    //以一个字符串作为响应的结尾
    res.end('hello world');
    //这个服务监听80端口（也就是说，访问80端口的行为会被该服务接收）
}).listen(80);
```
**http.createServer([requestListener])**是http模块的方法， requestListener 作为 request 事件的监听函数。这个函数执行完毕后会返回一个server对象，调用server对象的listen()方法监听80端口。

	req  请求对象，
    res  响应对象 ，收到请求后要做出的响应。
 
最后一行在控制台打印一句话。


----------


## ***后记***

> 对代码的解释还很浅显，具体的模块，方法，监听等内容会在后续博客中详细讲解，本文只是举一个例子。
> 
> nodejs的安装我前面的博客有讲过，win，Ubuntu，centos都有。

对应博客地址：http://blog.csdn.net/qq_31655965/article/details/52311430

欢迎大家批评指正。

> 参考资料：
> https://nodejs.org/en/
> http://www.runoob.com/nodejs/nodejs-module-system.html
> http://nqdeng.github.io/7-days-nodejs/
> http://nodeapi.ucdok.com/#/api/
> https://zh.wikipedia.org/zh/Node.js

