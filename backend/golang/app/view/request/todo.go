package request

import "time"

type CreateTodoRequest struct {
	Name      string    `json:"name"`
	Date      time.Time `json:"date"`
	Status    bool      `json:"status"`
	ProjectId string    `json:"project_id"`
	TagId     string    `json:"tag_id"`
}

type UpdateTodoRequest struct {
	Id        string    `json:"id"`
	Name      string    `json:"name"`
	Date      time.Time `json:"date"`
	Status    bool      `json:"status"`
	ProjectId string    `json:"project_id"`
	TagId     string    `json:"tag_id"`
}
