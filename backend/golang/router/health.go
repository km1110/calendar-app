package router

import (
	"github.com/gin-gonic/gin"

	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initHealthRouter(router *gin.Engine) {
	router.GET("/health", controller.Health)
}
