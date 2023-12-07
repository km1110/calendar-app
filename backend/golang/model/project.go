package model

import (
	"database/sql"

	"github.com/km1110/calendar-app/backend/golang/utils"
	"github.com/km1110/calendar-app/backend/golang/view/request"
	"github.com/km1110/calendar-app/backend/golang/view/response"
)

type ProjectModel interface {
	GetProjects(user_id string) ([]*response.ProjectsResponse, error)
	AddProject(user_id string, req *request.CreateProjectRequest) (response.ProjectResponse, error)
	UpdateProject(id string, req *request.UpdateProjectRequest) (response.ProjectResponse, error)
	DeleteProject(id string) error
}

type projectModel struct {
	db *sql.DB
}

func NewProjectModel(db *sql.DB) ProjectModel {
	return &projectModel{db: db}
}

func (pm *projectModel) GetProjects(user_id string) ([]*response.ProjectsResponse, error) {
	sql := `
				SELECT 
						id, 
						title
				FROM 
						projects
				WHERE
						user_id = ?
				`

	rows, err := pm.db.Query(sql, user_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var projects []*response.ProjectsResponse

	for rows.Next() {
		var (
			id, title string
		)

		if err := rows.Scan(&id, &title); err != nil {
			return nil, err
		}

		projects = append(projects, &response.ProjectsResponse{
			Id:    id,
			Title: title,
		})
	}

	return projects, nil
}

func (pm *projectModel) AddProject(user_id string, req *request.CreateProjectRequest) (response.ProjectResponse, error) {
	id := utils.GenerateId()

	res := response.ProjectResponse{
		Id:          id,
		Title:       req.Title,
		Description: req.Description,
	}

	insertQuery := `
				INSERT INTO projects (
						id,
						user_id,
						title,
						description
				) VALUES (
						?,
						?,
						?,
						?
				)
				`

	_, err := pm.db.Exec(insertQuery, res.Id, user_id, res.Title, res.Description)

	if err != nil {
		return response.ProjectResponse{}, err
	}

	return res, nil
}

func (pm *projectModel) UpdateProject(id string, req *request.UpdateProjectRequest) (response.ProjectResponse, error) {
	res := response.ProjectResponse{
		Id:          id,
		Title:       req.Title,
		Description: req.Description,
	}

	updateQuery := `
				UPDATE projects SET
						title = ?,
						description = ?
				WHERE
						id = ?
				`

	_, err := pm.db.Exec(updateQuery, res.Title, res.Description, res.Id)

	if err != nil {
		return response.ProjectResponse{}, err
	}

	return res, nil
}

func (pm *projectModel) DeleteProject(id string) error {
	deleteQuery := `
				DELETE FROM projects
				WHERE
						id = ?
				`

	_, err := pm.db.Exec(deleteQuery, id)

	if err != nil {
		return err
	}

	return nil
}
