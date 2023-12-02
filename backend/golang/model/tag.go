package model

import (
	"database/sql"

	"github.com/km1110/calendar-app/backend/golang/utils"
	"github.com/km1110/calendar-app/backend/golang/view/request"
	"github.com/km1110/calendar-app/backend/golang/view/response"
)

type TagModel interface {
	GetTags(user_id string) ([]*response.TagResponse, error)
	AddTag(user_id string, req *request.TagRequest) (response.TagResponse, error)
	UpdateTag(id string, req *request.TagRequest) (response.TagResponse, error)
	DeleteTag(id string) error
}

type tagModel struct {
	db *sql.DB
}

func NewTagModel(db *sql.DB) TagModel {
	return &tagModel{db: db}
}

func (tm *tagModel) GetTags(user_id string) ([]*response.TagResponse, error) {
	sql := `
				SELECT 
						id, 
						name
				FROM 
						tags
				WHERE
						user_id = ?
				`

	rows, err := tm.db.Query(sql, user_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tags []*response.TagResponse

	for rows.Next() {
		var (
			id, name string
		)

		if err := rows.Scan(&id, &name); err != nil {
			return nil, err
		}

		tags = append(tags, &response.TagResponse{
			Id:   id,
			Name: name,
		})
	}

	return tags, nil
}

func (tm *tagModel) AddTag(user_id string, req *request.TagRequest) (response.TagResponse, error) {
	id := utils.GenerateId()

	res := response.TagResponse{
		Id:   id,
		Name: req.Name,
	}

	sql := `
				INSERT INTO tags (
						id,
						user_id,
						name
				) VALUES (
						?,
						?,
						?
				)
				`

	_, err := tm.db.Exec(sql, id, user_id, req.Name)
	if err != nil {
		return response.TagResponse{}, err
	}

	return res, nil
}

func (tm *tagModel) UpdateTag(id string, req *request.TagRequest) (response.TagResponse, error) {
	res := response.TagResponse{
		Id:   id,
		Name: req.Name,
	}

	sql := `
				UPDATE tags
				SET
						name = ?
				WHERE
						id = ?
				`

	_, err := tm.db.Exec(sql, req.Name, id)
	if err != nil {
		return response.TagResponse{}, err
	}

	return res, nil
}

func (tm *tagModel) DeleteTag(id string) error {
	sql := `
				DELETE FROM tags
				WHERE
						id = ?
				`

	_, err := tm.db.Exec(sql, id)
	if err != nil {
		return err
	}

	return nil
}
