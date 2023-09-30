package controller

import (
	"fmt"
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

	if err := um.AddUser(c, entities.SignUp{
		Firebase_uid: firebase_uid,
		Username:     req.Name,
		Email:        req.Email,
	}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "user created successfully"})
}

func GetUser(c *gin.Context) {
	fmt.Println("test1")
	uid, _ := c.Get("firebaseUID")
	firebase_uid := uid.(string)

	fmt.Println("firebase_uid: ", firebase_uid)
}
