package model

import (
	"context"
	"time"

	"github.com/km1110/calendar-app/backend/golang/view/response"
)

type DiaryModel interface {
	GetDiarys(ctx context.Context, user_id string) ([]*response.Diary, error)
}

type diaryModel struct {
}

func NewDiaryModel() *diaryModel {
	return &diaryModel{}
}

func (dm *diaryModel) GetDiarys(ctx context.Context, user_id string) ([]*response.Diary, error) {
	getQuery := `SELECT id, title, content, date FROM diarys WHERE user_id = ?`

	rows, err := Db.Query(getQuery, user_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var diarys []*response.Diary

	for rows.Next() {
		var (
			id, title, content string
			date               time.Time
		)

		if err := rows.Scan(&id, &title, &content, &date); err != nil {
			return nil, err
		}

		diarys = append(diarys, &response.Diary{
			Id:      id,
			Title:   title,
			Content: content,
			Date:    date,
		})
	}
	return diarys, nil
}
