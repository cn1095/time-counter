package webutill

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/soxft/time-counter/app/middleware"
	"github.com/soxft/time-counter/config"
)

func Init() {
	if !config.Server.Debug {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()

	// init middleware
	if config.Server.Log {
		r.Use(gin.Logger())
	}
	r.Use(gin.Recovery())
	r.Use(middleware.Cors())

	//init router
	initRoute(r)

	// run service
	log.SetOutput(os.Stdout)
	log.Printf("服务器监听中，地址为: %s", config.Server.Address)
	err := r.Run(config.Server.Address)
	if err != nil {
		log.Fatalf("启动 web 服务时出错: %s", err.Error())
	}
}
