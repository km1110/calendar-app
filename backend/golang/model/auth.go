package model

import (
	"context"
	"database/sql"

	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/km1110/calendar-app/backend/golang/utils"
)

type UserModel interface {
	AddUser(ctx context.Context, r entities.SignUp) (entities.SignUp, error)
	GetUser(uid string) (string, error)
}

type userModel struct {
	db *sql.DB
}

func NewUserModel(db *sql.DB) UserModel {
	return &userModel{db: db}
}

func (um *userModel) AddUser(ctx context.Context, r entities.SignUp) (entities.SignUp, error) {
	id := utils.GenerateId()

	req := entities.SignUp{
		Id:           id,
		Firebase_uid: r.Firebase_uid,
		Username:     r.Username,
		Email:        r.Email,
	}

	sql := `INSERT INTO users(id, firebase_uid, username, email) VALUES(?, ?, ?, ?)`

	_, err := um.db.Exec(sql, req.Id, req.Firebase_uid, req.Username, req.Email)

	return req, err
}

func (um *userModel) GetUser(uid string) (string, error) {
	id_sql := `select id from users where firebase_uid = ?`

	var user_id string
	if err := um.db.QueryRow(id_sql, uid).Scan(&user_id); err != nil {
		return "", err
	}

	return user_id, nil
}
