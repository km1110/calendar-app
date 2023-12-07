package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initProjectRouter(router *gin.RouterGroup, pc controller.ProjectController) {
	p := router.Group("/projects")
	p.GET("", pc.FetchProject)
	p.POST("", pc.CreateProject)
	p.PATCH("/:id", pc.UpdateProject)
	p.DELETE("/:id", pc.DeleteProject)
}
