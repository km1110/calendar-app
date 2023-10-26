package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model"
)

func FetchTodo(c *gin.Context) {
	tm := model.NewTodoModel()

	firebaseUID, exists := c.Get("firebaseUID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "firebaseUID not provided"})
		return
	}

	todos, err := tm.GetTodos(firebaseUID.(string))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, todos)
}
