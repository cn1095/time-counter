## time-counter

> just a simple online user/time counter

#### 构建运行

1.克隆源码
```shell
git clone https://github.com/lmq8267/time-counter && cd time-counter
go build -o counter main.go
```

2.根据提示修改 `config.yml`

4.编辑 `dist/counter.js` 替换链接为自己的, 也可以编辑ts文件自行编译

5.通过命令 `./counter` 启动程序

### Docker

```shell
mkdir /opt/redis
mkdir /opt/time-counter

docker run -d --name redis -v /opt/redis:/data redis:alpine

docker run -d --name time-counter \
-p 8080:8080/tcp \
-v /opt/time-counter:/app/expose \
--link redis \
--env LOG_ENABLE=true \
--env DEBUG_ENABLE=false \
--env REDIS_ADDR=redis:6379 \
--env REDIS_PWD= \
--env REDIS_DATABASE=1 \
--env REDIS_PREFIX=tc \
--env API_SERVER=http://127.0.0.1:8080/counter \
--env INTERVAL=10 lmq8267/time-counter

```


