package model

import "github.com/km1110/calendar-app/backend/golang/view/response"

type TagModel struct {
}

func NewTagModel() *TagModel {
	return &TagModel{}
}

func (tm *TagModel) GetTags(user_id string) ([]*response.TagResponse, error) {
	sql := `
				SELECT 
						id, 
						name
				FROM 
						tags
				WHERE
						user_id = ?
				`

	rows, err := Db.Query(sql, user_id)
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
