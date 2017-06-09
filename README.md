# Weathers

首先来看看效果图，下面分别是在电脑和手机上的演示图

![image](https://github.com/hwaphon/Weather/blob/master/windows_disply.png)

![image](https://github.com/hwaphon/Weather/blob/master/phone_display.png)

---

### 使用到的资源

1. [心知天气](https://www.seniverse.com/): 提供天气信息。
2. [Heroku](http://heroku.com/): 用于在线部署 `Node` 应用。

### 基本结构

后台: 使用 `Node` 书写后台代码，后台的主要任务就是从心知天气官网提供的 `API` 获取天气信息，然后按照指定的接口输出供前端页面使用。

	app.get('/weather/now/:location', function(req, res) {
		// 逻辑代码
	});

	app.get('/weather/recent/:location', function(req, res) {
		// 逻辑代码
	});

从接口也可以看得出来，一个用于获取当前的天气，一个用于获取最近几日的天气。

不过由于后台代码不和前台在同一域名下，即使是在本地开发的时候其使用的端口也不相同，所以这里牵扯到了跨域问题，如果在 `Node` 中使用了 `Express` 框架，可以使用以下代码解决跨域问题。

	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","GET");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    next();
	});

这段代码是从网上粘贴来的，其第一行代码指定允许跨域访问的网络地址，这里设置为 `*` 说明允许所有地址跨域访问，当然也可以在这里指定某一个或者某几个域名。

第三行的意思是，允许跨域网站对本地执行的操作，这里有很多比如 `PUT, POST, DELETE, GET` 等，由于我们后台的主要任务就是提供信息，所以这里只允许 `GET` 操作。

---

前台: 任务主要就是创建界面，然后利用 `AJAX` 向后台发送数据请求，在这一过程中使用到了 `ES6` 语法中的 `Promise`，不得不说它的确让代码简洁易读了很多。

---

### 友情提示

如果你想将整个项目拷贝下来查看源代码的话，建议首先将改目录下的 `Weather` 分开放置，然后执行 `npm install && node app.js` 即可提供后台数据服务。

而且，还需要对前台代码进行改动（或者你也可以不改动，因为那样的话你将默认使用我部署在 `Heroku` 的后台服务），将后台 `Ajax` 请求的 `url` 改为本地 `http://localhost:5000/weather/....`。

值得注意的是，为了使用心知天气需要申请 `API KEY`， 而我的项目中使用的是我自己的 `KEY`,你可以申请自己的 `KEY`，详细内容可以查看官方文档。
