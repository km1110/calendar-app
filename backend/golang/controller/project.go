package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/view/request"
)

func FetchProject(c *gin.Context) {
	pm := model.NewProjectModel()

	// firebaseUIDの取得
	firebaseUID, exists := c.Get("firebaseUID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "firebaseUID not provided"})
		return
	}

	// userIDの取得
	um := model.NewUserModel()
	userID, err := um.GetUser(firebaseUID.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	projects, err := pm.GetProjects(userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, projects)
}

func CreateProject(c *gin.Context) {
	var req request.CreateProjectRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// firebaseUIDの取得
	firebaseUID, exists := c.Get("firebaseUID")
	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "firebaseUID not provided"})
		return
	}

	// userIDの取得
	um := model.NewUserModel()
	userID, err := um.GetUser(firebaseUID.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	pm := model.NewProjectModel()
	res, err := pm.AddProject(userID, &req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func UpdateProject(c *gin.Context) {
	var req request.UpdateProjectRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")

	pm := model.NewProjectModel()
	res, err := pm.UpdateProject(id, &req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")

	pm := model.NewProjectModel()
	err := pm.DeleteProject(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
