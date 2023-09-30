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

func (um *UserModel) AddUser(ctx context.Context, r entities.SignUp) error {
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

	return err
}
