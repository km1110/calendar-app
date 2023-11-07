package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initScheduleRouter(router *gin.RouterGroup) {
	s := router.Group("/schedule")
	s.GET("", controller.FetchSchedule)
	s.POST("", controller.AddSchedule)
	s.PUT("/:schedule_id", controller.UpdateSchedule)
	s.DELETE("/:schedule_id", controller.DeleteSchedule)
}
