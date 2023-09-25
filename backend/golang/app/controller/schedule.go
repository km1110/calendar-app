package controller

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller/dto"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/model/entities"
)

func FeatchSchedule(c *gin.Context) {
	sm := model.NewScheduleModel()

	schedules, err := sm.GetSchedules(c)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, schedules)
}

func AddSchedule(c *gin.Context) {
	var req dto.AddScheduleRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
	}

	sm := model.NewScheduleModel()
	result, err := sm.AddSchedule(c, entities.Schedule{
		Title:       req.Title,
		Description: req.Description,
		Date:        req.Date,
		Location:    req.Location,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}

	json, err := json.Marshal(result)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}

	c.JSON(http.StatusOK, string(json))
}

func UpdateSchedule(c *gin.Context) {
	var req dto.AddScheduleRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
	}

	id := c.Param("schedule_id")

	sm := model.NewScheduleModel()
	result, err := sm.UpdateSchedule(c, entities.Schedule{
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
	}

	json, err := json.Marshal(result)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}

	c.JSON(http.StatusOK, string(json))
}

func DeleteSchedule(c *gin.Context) {
	id := c.Param("schedule_id")

	sm := model.NewScheduleModel()
	result, err := sm.DeleteSchedule(c, entities.Schedule{
		Id: id,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}

	json, err := json.Marshal(result)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}

	c.JSON(http.StatusOK, string(json))
}
