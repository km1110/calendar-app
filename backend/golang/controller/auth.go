package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/controller/dto"
	"github.com/km1110/calendar-app/backend/golang/model"
	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/km1110/calendar-app/backend/golang/utils"
)

type UserController interface {
	CreateUser(c *gin.Context)
	GetUser(c *gin.Context)
}

type userController struct {
	um model.UserModel
}

func NewUserController(um model.UserModel) UserController {
	return &userController{um}
}

func (uc userController) CreateUser(c *gin.Context) {
	var req dto.CreateUserRequest

	firebase_uid, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	if err := c.Bind(&req); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
	}

	res, err := uc.um.AddUser(c, entities.SignUp{
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

func (uc userController) GetUser(c *gin.Context) {
	firebase_uid, err := utils.GetFirebaseUID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	user_id, err := uc.um.GetUser(firebase_uid)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Set("userID", user_id)
	c.JSON(http.StatusOK, gin.H{"user_id": user_id})
}
