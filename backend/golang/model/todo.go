package model

import (
	"context"
	"database/sql"
	"time"

	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/km1110/calendar-app/backend/golang/utils"
	"github.com/km1110/calendar-app/backend/golang/view/request"
	"github.com/km1110/calendar-app/backend/golang/view/response"
)

type TodoModel interface {
	GetTodos(user_id string) ([]*response.TodosResponse, error)
	GetDailyTodos(user_id, start_date, end_date string) ([]*response.TodosResponse, error)
	GetDateCount(user_id string, start_year string, end_year string) ([]*entities.TodoDateCount, error)
	AddTodos(ctx context.Context, user_id string, r request.CreateTodoRequest) (response.TodosResponse, error)
	UpdateTodos(ctx context.Context, r response.TodosResponse) (response.TodosResponse, error)
	UpdateTodoStatus(ctx context.Context, id string, r request.UpdateTodoStatusRequest) (response.TodosResponse, error)
	DeleteTodo(ctx context.Context, id string) error
}

type todoModel struct {
	db *sql.DB
}

func NewTodoModel(db *sql.DB) TodoModel {
	return &todoModel{db: db}
}

func (tm *todoModel) GetTodos(user_id string) ([]*response.TodosResponse, error) {

	getQuery := `
							SELECT 
									t.id, 
									t.name, 
									t.date, 
									t.status, 
									p.id AS project_id, 
									p.title AS project_title, 
									tg.id AS tag_id, 
									tg.name AS tag_name
							FROM 
									todos t
							LEFT JOIN 
									projects p ON t.project_id = p.id
							LEFT JOIN 
									tags tg ON t.tag_id = tg.id
							WHERE 
									t.user_id = ?
							`

	rows, err := tm.db.Query(getQuery, user_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var todos []*response.TodosResponse

	for rows.Next() {
		var (
			id, name                                    string
			project_id, project_title, tag_id, tag_name sql.NullString
			date                                        time.Time
			status                                      bool
		)

		if err := rows.Scan(&id, &name, &date, &status, &project_id, &project_title, &tag_id, &tag_name); err != nil {
			return nil, err
		}

		var projectID, projectTitle, tagID, tagName string

		if project_id.Valid {
			projectID = project_id.String
		}

		if project_title.Valid {
			projectTitle = project_title.String
		}

		if tag_id.Valid {
			tagID = tag_id.String
		}

		if tag_name.Valid {
			tagName = tag_name.String
		}

		todos = append(todos, &response.TodosResponse{
			Id:     id,
			Name:   name,
			Date:   date,
			Status: status,
			Project: response.ProjectsResponse{
				Id:    projectID,
				Title: projectTitle,
			},
			Tag: response.TagResponse{
				Id:   tagID,
				Name: tagName,
			},
		})
	}

	return todos, nil
}

func (tm *todoModel) GetDailyTodos(user_id string, start_date string, end_date string) ([]*response.TodosResponse, error) {

	getQuery := `
							SELECT 
									t.id, 
									t.name, 
									t.date, 
									t.status, 
									p.id AS project_id, 
									p.title AS project_title, 
									tg.id AS tag_id, 
									tg.name AS tag_name
							FROM 
									todos t
							LEFT JOIN 
									projects p ON t.project_id = p.id
							LEFT JOIN 
									tags tg ON t.tag_id = tg.id
							WHERE 
									t.user_id = ? AND t.date >= ? AND t.date < ?
							`

	rows, err := tm.db.Query(getQuery, user_id, start_date, end_date)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var todos []*response.TodosResponse

	for rows.Next() {
		var (
			id, name                                    string
			project_id, project_title, tag_id, tag_name sql.NullString
			date                                        time.Time
			status                                      bool
		)

		if err := rows.Scan(&id, &name, &date, &status, &project_id, &project_title, &tag_id, &tag_name); err != nil {
			return nil, err
		}

		var projectID, projectTitle, tagID, tagName string

		if project_id.Valid {
			projectID = project_id.String
		}

		if project_title.Valid {
			projectTitle = project_title.String
		}

		if tag_id.Valid {
			tagID = tag_id.String
		}

		if tag_name.Valid {
			tagName = tag_name.String
		}

		todos = append(todos, &response.TodosResponse{
			Id:     id,
			Name:   name,
			Date:   date,
			Status: status,
			Project: response.ProjectsResponse{
				Id:    projectID,
				Title: projectTitle,
			},
			Tag: response.TagResponse{
				Id:   tagID,
				Name: tagName,
			},
		})
	}

	return todos, nil
}

func (tm *todoModel) GetDateCount(user_id string, start_year string, end_year string) ([]*entities.TodoDateCount, error) {
	getQuery := `	SELECT 
										DATE(date) AS date, COUNT(*) AS count 
								FROM 
										todos 
								WHERE 
										user_id = ? AND status = true AND date >= ? AND date < ? 
								GROUP BY 
										DATE(date) 
								ORDER BY 
										DATE(date)
							`

	rows, err := tm.db.Query(getQuery, user_id, start_year, end_year)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var res []*entities.TodoDateCount

	for rows.Next() {
		var (
			date  time.Time
			count int
		)

		if err := rows.Scan(&date, &count); err != nil {
			return nil, err
		}

		res = append(res, &entities.TodoDateCount{
			Date:  date,
			Count: count,
		})
	}

	return res, nil
}

func (tm *todoModel) AddTodos(ctx context.Context, user_id string, r request.CreateTodoRequest) (response.TodosResponse, error) {
	// todoのidを生成
	id := utils.GenerateId()

	// responseを作成
	res := response.TodosResponse{
		Id:     id,
		Name:   r.Name,
		Date:   r.Date,
		Status: r.Status,
		Project: response.ProjectsResponse{
			Id:    r.Project.Id,
			Title: r.Project.Title,
		},
		Tag: response.TagResponse{
			Id:   r.Tag.Id,
			Name: r.Tag.Name,
		},
	}

	// project_idとtag_idが空であればNULLを挿入する
	projectID := sql.NullString{String: r.Project.Id, Valid: r.Project.Id != ""}
	tagID := sql.NullString{String: r.Tag.Id, Valid: r.Tag.Id != ""}

	// sqlの作成と実行
	insertQuery := `INSERT INTO todos(id, user_id, name, date, status, project_id, tag_id) VALUES(?, ?, ?, ?, ?, ?, ?)`

	_, err := tm.db.Exec(insertQuery, res.Id, user_id, res.Name, res.Date, res.Status, projectID, tagID)

	if err != nil {
		return response.TodosResponse{}, err
	}

	return res, nil
}

func (tm *todoModel) UpdateTodos(ctx context.Context, r response.TodosResponse) (response.TodosResponse, error) {
	// responseを作成
	res := response.TodosResponse{
		Id:     r.Id,
		Name:   r.Name,
		Date:   r.Date,
		Status: r.Status,
		Project: response.ProjectsResponse{
			Id:    r.Project.Id,
			Title: r.Project.Title,
		},
		Tag: response.TagResponse{
			Id:   r.Tag.Id,
			Name: r.Tag.Name,
		},
	}

	// project_idとtag_idが空であればNULLを挿入する
	projectID := sql.NullString{String: r.Project.Id, Valid: r.Project.Id != ""}
	tagID := sql.NullString{String: r.Tag.Id, Valid: r.Tag.Id != ""}

	// sqlの作成と実行
	updateQuery := `UPDATE todos SET name = ?, date = ?, status = ?, project_id = ?, tag_id = ? WHERE id = ?`

	_, err := tm.db.Exec(updateQuery, res.Name, res.Date, res.Status, projectID, tagID, res.Id)

	if err != nil {
		return response.TodosResponse{}, err
	}

	return res, nil
}

func (tm *todoModel) UpdateTodoStatus(ctx context.Context, id string, r request.UpdateTodoStatusRequest) (response.TodosResponse, error) {
	// responseを作成
	res := response.TodosResponse{
		Id:     id,
		Status: r.Status,
	}

	// sqlの作成と実行
	updateQuery := `UPDATE todos SET status = ? WHERE id = ?`

	_, err := tm.db.Exec(updateQuery, res.Status, res.Id)

	if err != nil {
		return response.TodosResponse{}, err
	}

	return res, nil
}

func (tm *todoModel) DeleteTodo(ctx context.Context, id string) error {
	// sqlの作成と実行
	deleteQuery := `DELETE FROM todos WHERE id = ?`

	_, err := tm.db.Exec(deleteQuery, id)

	if err != nil {
		return err
	}

	return nil
}
