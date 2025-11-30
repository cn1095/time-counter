package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/cn1095/time-counter/utils/apiutil"
)

func Ping(c *gin.Context) {
	api := apiutil.New(c)
	api.Success("pong")
}
