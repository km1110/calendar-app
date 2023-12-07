package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initScheduleRouter(router *gin.RouterGroup, sc controller.ScheduleController) {
	s := router.Group("/schedule")
	s.GET("", sc.FetchSchedule)
	s.POST("", sc.AddSchedule)
	s.PUT("/:schedule_id", sc.UpdateSchedule)
	s.DELETE("/:schedule_id", sc.DeleteSchedule)
}
