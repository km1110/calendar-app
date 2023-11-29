package model

import (
	"context"
	"time"

	"github.com/km1110/calendar-app/backend/golang/utils"
	"github.com/km1110/calendar-app/backend/golang/view/request"
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

func (dm *diaryModel) AddDiary(ctx context.Context, user_id string, r request.Diary) (response.Diary, error) {
	id := utils.GenerateId()

	res := response.Diary{
		Id:      id,
		Title:   r.Title,
		Content: r.Content,
		Date:    r.Date,
	}

	insertQuery := `INSERT INTO diarys (id, title, content, date, user_id) VALUES (?, ?, ?, ?, ?)`

	_, err := Db.Exec(insertQuery, res.Id, res.Title, res.Content, res.Date, user_id)

	if err != nil {
		return response.Diary{}, err
	}

	return res, nil
}

func (dm *diaryModel) UpdateDiary(ctx context.Context, id string, r request.Diary) (response.Diary, error) {
	res := response.Diary{
		Id:      id,
		Title:   r.Title,
		Content: r.Content,
		Date:    r.Date,
	}

	updateQuery := `UPDATE diarys SET title = ?, content = ?, date = ? WHERE id = ?`

	_, err := Db.Exec(updateQuery, res.Title, res.Content, res.Date, res.Id)

	if err != nil {
		return response.Diary{}, err
	}

	return res, nil
}

func (dm *diaryModel) DeleteDiary(ctx context.Context, id string) error {
	deleteQuery := `DELETE FROM diarys WHERE id = ?`

	_, err := Db.Exec(deleteQuery, id)

	if err != nil {
		return err
	}

	return nil
}
