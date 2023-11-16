package model

import (
	"context"
	"database/sql"
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/oklog/ulid"
)

type SchedulesModel struct {
}

func NewScheduleModel() *SchedulesModel {
	return &SchedulesModel{}
}

func (sm *SchedulesModel) GetSchedules(c *gin.Context, startDay string, endDay string) ([]*entities.Schedule, error) {
	id_sql := `select id from users where firebase_uid = ?`

	uid, _ := c.Get("firebaseUID")
	firebase_uid := uid.(string)

	var user_id string
	if err := Db.QueryRow(id_sql, firebase_uid).Scan(&user_id); err != nil {
		return nil, err
	}

	getQuery := `select id, title, description, date, location from schedules WHERE user_id = ? AND date >= ? AND date < ?`

	rows, err := Db.Query(getQuery, user_id, startDay, endDay)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var schedules []*entities.Schedule

	for rows.Next() {
		var (
			id, title, description, location string
			date                             time.Time
		)

		if err := rows.Scan(&id, &title, &description, &date, &location); err != nil {
			return nil, err
		}

		schedules = append(schedules, &entities.Schedule{
			Id:          id,
			Title:       title,
			Description: description,
			Date:        date,
			Location:    location,
		})
	}

	return schedules, nil
}

func (sm *SchedulesModel) AddSchedule(ctx context.Context, r entities.Schedule) (sql.Result, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixMicro())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	req := entities.Schedule{
		Id:          id.String(),
		UserID:      r.UserID,
		Title:       r.Title,
		Description: r.Description,
		Date:        r.Date,
		Location:    r.Location,
	}

	sql := `INSERT INTO schedules(id, user_id, title, description, date, location) VALUES(?, ?, ?, ?, ?, ?)`

	result, err := Db.Exec(sql, req.Id, req.UserID, req.Title, req.Description, req.Date, req.Location)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (sm *SchedulesModel) UpdateSchedule(ctx context.Context, r entities.Schedule) (sql.Result, error) {
	sql := `UPDATE schedules SET title = ?, description = ?, date = ?, location = ? WHERE id = ?`

	result, err := Db.Exec(sql, r.Title, r.Description, r.Date, r.Location, r.Id)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (sm *SchedulesModel) DeleteSchedule(ctx context.Context, r entities.Schedule) (sql.Result, error) {
	sql := `DELETE FROM schedules WHERE id = ?`

	result, err := Db.Exec(sql, r.Id)

	if err != nil {
		return result, err
	}

	return result, nil
}
