package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initScheduleRouter(router *gin.Engine) {
	s := router
	s.GET("", controller.FeatchSchedule)
	s.POST("")
	s.PUT("/:schedule_id")
	s.DELETE("/:schedule_id")
}
