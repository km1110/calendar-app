package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initDiaryRouter(router *gin.RouterGroup) {
	d := router.Group("/diarys")
	d.GET("", controller.FetchDiary)
	d.POST("", controller.CreateDiary)
	d.PATCH("/:id", controller.UpdateDiary)
	d.DELETE("/:id", controller.DeleteDiary)
}
