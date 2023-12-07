package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/utils"
	"github.com/km1110/calendar-app/backend/golang/view/request"
)

type ProjectController interface {
	FetchProject(c *gin.Context)
	CreateProject(c *gin.Context)
	UpdateProject(c *gin.Context)
	DeleteProject(c *gin.Context)
}

type projectController struct {
	pm model.ProjectModel
	um model.UserModel
}

func NewProjectController(pm model.ProjectModel, um model.UserModel) ProjectController {
	return &projectController{pm, um}
}

func (pc projectController) FetchProject(c *gin.Context) {
	// firebaseUIDの取得
	firebaseUID, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// userIDの取得
	userID, err := pc.um.GetUser(firebaseUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// プロジェクトの取得
	res, err := pc.pm.GetProjects(userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (pc projectController) CreateProject(c *gin.Context) {
	var req request.CreateProjectRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// firebaseUIDの取得
	firebaseUID, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	// userIDの取得
	userID, err := pc.um.GetUser(firebaseUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// プロジェクトの作成
	res, err := pc.pm.AddProject(userID, &req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (pc projectController) UpdateProject(c *gin.Context) {
	var req request.UpdateProjectRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")

	res, err := pc.pm.UpdateProject(id, &req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (pc projectController) DeleteProject(c *gin.Context) {
	id := c.Param("id")

	err := pc.pm.DeleteProject(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
