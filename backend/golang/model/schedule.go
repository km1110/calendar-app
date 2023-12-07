package model

import (
	"context"
	"database/sql"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/km1110/calendar-app/backend/golang/utils"
)

type ScheduleModel interface {
	GetSchedules(c *gin.Context, user_id string, startDay string, endDay string) ([]*entities.Schedule, error)
	AddSchedule(ctx context.Context, r entities.Schedule) (sql.Result, error)
	UpdateSchedule(ctx context.Context, r entities.Schedule) (sql.Result, error)
	DeleteSchedule(ctx context.Context, id string) (sql.Result, error)
}

type schedulesModel struct {
	db *sql.DB
}

func NewScheduleModel(db *sql.DB) ScheduleModel {
	return &schedulesModel{db: db}
}

func (sm *schedulesModel) GetSchedules(c *gin.Context, user_id string, startDay string, endDay string) ([]*entities.Schedule, error) {
	getQuery := `select id, title, description, date, location from schedules WHERE user_id = ? AND date >= ? AND date < ?`

	rows, err := sm.db.Query(getQuery, user_id, startDay, endDay)
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

func (sm *schedulesModel) AddSchedule(ctx context.Context, r entities.Schedule) (sql.Result, error) {
	id := utils.GenerateId()

	req := entities.Schedule{
		Id:          id,
		UserID:      r.UserID,
		Title:       r.Title,
		Description: r.Description,
		Date:        r.Date,
		Location:    r.Location,
	}

	sql := `INSERT INTO schedules(id, user_id, title, description, date, location) VALUES(?, ?, ?, ?, ?, ?)`

	result, err := sm.db.Exec(sql, req.Id, req.UserID, req.Title, req.Description, req.Date, req.Location)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (sm *schedulesModel) UpdateSchedule(ctx context.Context, r entities.Schedule) (sql.Result, error) {
	sql := `UPDATE schedules SET title = ?, description = ?, date = ?, location = ? WHERE id = ?`

	res, err := sm.db.Exec(sql, r.Title, r.Description, r.Date, r.Location, r.Id)

	if err != nil {
		return res, err
	}

	return res, nil
}

func (sm *schedulesModel) DeleteSchedule(ctx context.Context, id string) (sql.Result, error) {
	sql := `DELETE FROM schedules WHERE id = ?`

	res, err := sm.db.Exec(sql, id)

	if err != nil {
		return res, err
	}

	return res, nil
}
