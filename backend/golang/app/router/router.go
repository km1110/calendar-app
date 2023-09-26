package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/middleware"
)

func Router() *gin.Engine {
	router := gin.Default()
	middleware.Cors(router)

	initScheduleRouter(router)
	initAuthRouter(router)
	return router
}
