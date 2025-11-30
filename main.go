package main

import (
	"github.com/cn1095/time-counter/app/controller"
	"github.com/cn1095/time-counter/global"
	"github.com/cn1095/time-counter/process/cronutil"
	"github.com/cn1095/time-counter/process/redisutil"
	"github.com/cn1095/time-counter/process/webutill"
)

func main() {
	global.Init()
	// init redis
	redisutil.Init()
	// init cron
	cronutil.Init()
	// read index2.html to memory
	controller.ReadIndex()
	// run web service
	webutill.Init()
}
