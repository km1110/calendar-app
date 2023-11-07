package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initTagRouter(router *gin.RouterGroup) {
	t := router.Group("/tags")
	t.GET("", controller.FetchTag)
	t.POST("", controller.CreateTag)
	t.PATCH("/:id", controller.UpdateTag)
	t.DELETE("/:id", controller.DeleteTag)
}
