package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/middleware"
)

func Router() *gin.Engine {
	router := gin.Default()
	router.Use(middleware.Cors())
	// router.Use(middleware.FirebaseAuth())

	firebaseRequiredGroup := router.Group("/")
	firebaseRequiredGroup.Use(middleware.FirebaseAuth())
	{
		initAuthRouter(firebaseRequiredGroup)
		initScheduleRouter(firebaseRequiredGroup)
		initTodoRouter(firebaseRequiredGroup)
		initProjectRouter(firebaseRequiredGroup)
		initTagRouter(firebaseRequiredGroup)
	}

	return router
}
