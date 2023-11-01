package model

import "github.com/km1110/calendar-app/backend/golang/view/response"

type ProjectModel struct {
}

func NewProjectModel() *ProjectModel {
	return &ProjectModel{}
}

func (pm *ProjectModel) GetProjects(user_id string) ([]*response.ProjectResponse, error) {
	sql := `
				SELECT 
						id, 
						title
				FROM 
						projects
				WHERE
						user_id = ?
				`

	rows, err := Db.Query(sql, user_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var projects []*response.ProjectResponse

	for rows.Next() {
		var (
			id, title string
		)

		if err := rows.Scan(&id, &title); err != nil {
			return nil, err
		}

		projects = append(projects, &response.ProjectResponse{
			Id:    id,
			Title: title,
		})
	}

	return projects, nil
}
