package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller/dto"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/km1110/calendar-app/backend/golang/utils"
)

type ScheduleController interface {
	FetchSchedule(c *gin.Context)
	AddSchedule(c *gin.Context)
	UpdateSchedule(c *gin.Context)
	DeleteSchedule(c *gin.Context)
}

type scheduleController struct {
	sm model.ScheduleModel
	um model.UserModel
}

func NewScheduleController(sm model.ScheduleModel, um model.UserModel) ScheduleController {
	return &scheduleController{sm, um}
}

func (sc *scheduleController) FetchSchedule(c *gin.Context) {
	startDay := c.Query("start")
	endDay := c.Query("end")

	firebaseUID, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	user_id, err := sc.um.GetUser(firebaseUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	schedules, err := sc.sm.GetSchedules(c, user_id, startDay, endDay)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, schedules)
}

func (sc *scheduleController) AddSchedule(c *gin.Context) {
	var req dto.AddScheduleRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}

	firebaseUID, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	userID, err := sc.um.GetUser(firebaseUID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	res, err := sc.sm.AddSchedule(c, entities.Schedule{
		Title:       req.Title,
		UserID:      userID,
		Description: req.Description,
		Date:        req.Date,
		Location:    req.Location,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (sc *scheduleController) UpdateSchedule(c *gin.Context) {
	var req dto.AddScheduleRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	id := c.Param("schedule_id")

	res, err := sc.sm.UpdateSchedule(c, entities.Schedule{
		Id:          id,
		Title:       req.Title,
		Description: req.Description,
		Date:        req.Date,
		Location:    req.Location,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (sc *scheduleController) DeleteSchedule(c *gin.Context) {
	id := c.Param("schedule_id")

	res, err := sc.sm.DeleteSchedule(c, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}

	c.JSON(http.StatusOK, res)
}
