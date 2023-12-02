package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initDiaryRouter(router *gin.RouterGroup, dc controller.DiaryController) {
	d := router.Group("/diarys")
	d.GET("", dc.FetchDiary)
	d.POST("", dc.CreateDiary)
	d.PATCH("/:id", dc.UpdateDiary)
	d.DELETE("/:id", dc.DeleteDiary)
}
