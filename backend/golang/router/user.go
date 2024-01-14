package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initAuthRouter(router *gin.RouterGroup, uc controller.UserController) {
	router.POST("/signup", uc.CreateUser)
	router.GET("/signin", uc.GetUser)
}
