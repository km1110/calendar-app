package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initTagRouter(router *gin.RouterGroup, tc controller.TagController) {
	t := router.Group("/tags")
	t.GET("", tc.FetchTag)
	t.POST("", tc.CreateTag)
	t.PATCH("/:id", tc.UpdateTag)
	t.DELETE("/:id", tc.DeleteTag)
}
