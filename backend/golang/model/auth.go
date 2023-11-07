package model

import (
	"context"
	"math/rand"
	"time"

	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/oklog/ulid"
)

type UserModel struct {
}

func NewUserModel() *UserModel {
	return &UserModel{}
}

func (um *UserModel) AddUser(ctx context.Context, r entities.SignUp) (entities.SignUp, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixMicro())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	req := entities.SignUp{
		Id:           id.String(),
		Firebase_uid: r.Firebase_uid,
		Username:     r.Username,
		Email:        r.Email,
	}

	sql := `INSERT INTO users(id, firebase_uid, username, email) VALUES(?, ?, ?, ?)`

	_, err := Db.Exec(sql, req.Id, req.Firebase_uid, req.Username, req.Email)

	return req, err
}

func (um *UserModel) GetUser(ctx context.Context, uid string) (string, error) {
	id_sql := `select id from users where firebase_uid = ?`

	var user_id string
	if err := Db.QueryRow(id_sql, uid).Scan(&user_id); err != nil {
		return "", err
	}

	return user_id, nil
}
