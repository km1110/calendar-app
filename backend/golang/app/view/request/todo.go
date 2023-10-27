package request

import "time"

type CreateTodoRequest struct {
	Name    string         `json:"name"`
	Date    time.Time      `json:"date"`
	Status  bool           `json:"status"`
	Project ProjectRequest `json:"project"`
	Tag     TagRequest     `json:"tag"`
}

type UpdateTodoRequest struct {
	Id      string         `json:"id"`
	Name    string         `json:"name"`
	Date    time.Time      `json:"date"`
	Status  bool           `json:"status"`
	Project ProjectRequest `json:"project"`
	Tag     TagRequest     `json:"tag"`
}
