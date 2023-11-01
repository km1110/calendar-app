package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller/dto"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/model/entities"
)

func CreateUser(c *gin.Context) {
	uid, _ := c.Get("firebaseUID")
	firebase_uid := uid.(string)

	var req dto.CreateUserRequest

	if err := c.Bind(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
	}

	um := model.NewUserModel()

	res, err := um.AddUser(c, entities.SignUp{
		Firebase_uid: firebase_uid,
		Username:     req.Name,
		Email:        req.Email,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": res})
}

func GetUser(c *gin.Context) {
	uid, _ := c.Get("firebaseUID")
	firebase_uid := uid.(string)

	um := model.NewUserModel()

	user_id, err := um.GetUser(c.Request.Context(), firebase_uid)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Set("userID", user_id)
	c.JSON(http.StatusOK, gin.H{"user_id": user_id})
}
