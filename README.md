## time-counter

> just a simple online user/time counter

#### 构建运行

1.克隆源码
```shell
git clone https://github.com/lmq8267/time-counter && cd time-counter
go build -o time-counter main.go
```

2.修改配置文件 `config.yml` 

4.编辑 `dist/counter.js` 替换链接为自己的, 也可以编辑ts文件自行编译

5.通过命令 `./time-counter -c ./config.yml -d ./dist` 启动程序 指定配置文件路径 指定前端文件目录  

6. 打开 浏览器 ip:端口 可以看到房间效果 以及嵌入网页的效果

<img width="692" height="647" alt="图片" src="https://github.com/user-attachments/assets/c3b2079e-97b9-47e9-822c-7ec431f96859" />
<img width="800" height="109" alt="" src="https://github.com/user-attachments/assets/58068e54-364b-429d-a9eb-659025a192e4" />

### Docker

```shell
# 创建数据库目录
mkdir /opt/redis
mkdir /opt/time-counter

# 部署Redis数据库 设置连接密码 123456
docker run -d --name redis -v /opt/redis:/data redis:alpine redis-server --requirepass 123456

docker run -d --name time-counter \
-p 8080:8080/tcp \
-v /opt/time-counter/dist:/app/expose/dist \
--link redis \
--env LOG_ENABLE=true \
--env DEBUG_ENABLE=false \
--env REDIS_ADDR=redis:6379 \
--env REDIS_PWD= 123456 \
--env REDIS_DATABASE=1 \
--env REDIS_PREFIX=tc \
--env API_SERVER=http://127.0.0.1:8080/counter \
--env INTERVAL=10 lmq8267/time-counter

```

### 用法

1. ifranme 引入 

```
<center><iframe frameborder=0  height=50px marginwidth=0 scrolling=no src="http://你的服务地址/room/{Room ID}"></iframe></center>
```

2. js引入

```
<script src="http://你的服务地址/counter.js" async="" id="online-counter" interval="240" api="http://你的服务地址/counter" room="{Room ID}"></script>


本站当前在线人数 <span style="color: red;" id="online_user"></span> 人

你的在线总时间:  <span style="color: red;" id="online_me"></span>

全站在线总时间:  <span style="color: red;" id="online_total"></span>
```

3. pjax（例如 Hexo butterfly 主题，若开启了全局播放器 请使用此方案）

```
// 若您的网站有 Pjax 等局部热加载技术，请参考以下代码（Pjax 似乎会忽略 script 的标签内传值）。


      

本站当前在线人数 <span style="color: red;" id="online_user"></span> 人  

你的在线总时间:  <span style="color: red;" id="online_me"></span> 

全站在线总时间:  <span style="color: red;" id="online_total"></span>

<script>

    (

function () {  
getOnlineUser()
function getOnlineUser() {
    // 移除之前的 online-counter
    let oldScript = document.getElementById("online-counter");
    if (oldScript) {
        oldScript.remove();
    }
    //create script
    let script = document.createElement("script");
    script.src = "http://你的服务地址/counter.js";
    script.async = true;
    script.id = "online-counter";
    script.setAttribute("interval", 240);
    script.setAttribute("api", "http://你的服务地址/counter");
    script.setAttribute("room", "{Room ID}");
    document.head.appendChild(script);
}
}
)()

</script>
```





