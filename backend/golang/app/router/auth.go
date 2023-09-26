package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initAuthRouter(router *gin.Engine) {
	router.POST("/signup", controller.CreateUser)
}
