package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initTodoRouter(router *gin.RouterGroup) {
	t := router.Group("/todos")
	t.GET("", controller.FetchTodo)
	t.POST("", controller.CreateTodo)
	t.PATCH("/:todo_id", controller.UpdateTodo)
	t.PATCH("/:todo_id/status", controller.UpdateTodoStatus)
	t.DELETE("/:todo_id", controller.DeleteTodo)
}
