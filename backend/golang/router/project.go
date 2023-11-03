package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initProjectRouter(router *gin.RouterGroup) {
	p := router.Group("/projects")
	p.GET("", controller.FetchProject)
	p.POST("", controller.CreateProject)
	p.PATCH("/:id", controller.UpdateProject)
	p.DELETE("/:id", controller.DeleteProject)
}
