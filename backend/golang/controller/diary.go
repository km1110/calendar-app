package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/utils"
	"github.com/km1110/calendar-app/backend/golang/view/request"
)

type DiaryController interface {
	FetchDiary(c *gin.Context)
	CreateDiary(c *gin.Context)
	UpdateDiary(c *gin.Context)
	DeleteDiary(c *gin.Context)
}

type diaryController struct {
	dm model.DiaryModel
	um model.UserModel
}

func NewDiaryController(dm model.DiaryModel, um model.UserModel) DiaryController {
	return &diaryController{dm, um}
}

func (dc *diaryController) FetchDiary(c *gin.Context) {
	startDay := c.Query("start")
	endDay := c.Query("end")

	firebaseUID, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	useID, err := dc.um.GetUser(firebaseUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	diarys, err := dc.dm.GetDiarys(c, useID, startDay, endDay)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, diarys)
}

func (dc *diaryController) CreateDiary(c *gin.Context) {
	var req request.Diary

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	firebaseUID, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	useID, err := dc.um.GetUser(firebaseUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	res, err := dc.dm.AddDiary(c, useID, req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (dc *diaryController) UpdateDiary(c *gin.Context) {
	var req request.Diary

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")

	res, err := dc.dm.UpdateDiary(c, id, req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (dc *diaryController) DeleteDiary(c *gin.Context) {
	id := c.Param("id")

	err := dc.dm.DeleteDiary(c, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
