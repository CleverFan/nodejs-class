//通过require引入http模块，并将实例化的 HTTP 赋值给变量 http
var http = require( "http" );

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