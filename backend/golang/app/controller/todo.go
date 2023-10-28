package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/view/request"
	"github.com/km1110/calendar-app/backend/golang/view/response"
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

func CreateTodo(c *gin.Context) {
	var req request.CreateTodoRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	firebaseUID, exists := c.Get("firebaseUID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "firebaseUID not provided"})
		return
	}

	um := model.NewUserModel()
	userID, err := um.GetUser(c.Request.Context(), firebaseUID.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	tm := model.NewTodoModel()
	res, err := tm.AddTodos(c, userID, req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func UpdateTodo(c *gin.Context) {
	// Requestボディのバリデーション
	var req request.UpdateTodoRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("todo_id")

	tm := model.NewTodoModel()
	res, err := tm.UpdateTodos(c, response.TodosResponse{
		Id:      id,
		Name:    req.Name,
		Date:    req.Date,
		Status:  req.Status,
		Project: response.ProjectResponse(req.Project),
		Tag:     response.TagResponse(req.Tag),
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func UpdateTodoStatus(c *gin.Context) {
	var req request.UpdateTodoStatusRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tm := model.NewTodoModel()
	res, err := tm.UpdateTodoStatus(c, req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}
