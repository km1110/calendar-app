package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initTodoRouter(router *gin.RouterGroup) {
	t := router.Group("/todo")
	t.GET("", controller.FetchTodo)
}
