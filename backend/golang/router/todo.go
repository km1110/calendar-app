package router

import (
	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller"
)

func initTodoRouter(router *gin.RouterGroup, tc controller.TodoController) {
	t := router.Group("/todos")
	t.GET("", tc.FetchTodo)
	t.GET("/day-count", tc.FetchTodoCount)
	t.POST("", tc.CreateTodo)
	t.PATCH("/:todo_id", tc.UpdateTodo)
	t.PATCH("/:todo_id/status", tc.UpdateTodoStatus)
	t.DELETE("/:todo_id", tc.DeleteTodo)
}
