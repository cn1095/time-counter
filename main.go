package main

import (
	"github.com/soxft/time-counter/process/redisutil"
	"github.com/soxft/time-counter/process/webutill"
)

func main() {
	// init redis
	redisutil.Init()
	// run web service
	webutill.Init()
}
