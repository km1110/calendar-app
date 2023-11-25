package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/utils"
)

func FetchDiary(c *gin.Context) {
	dm := model.NewDiaryModel()

	firebaseUID, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	um := model.NewUserModel()
	useID, err := um.GetUser(firebaseUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	diarys, err := dm.GetDiarys(c, useID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, diarys)
}
