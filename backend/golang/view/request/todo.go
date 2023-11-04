package request

import "time"

type CreateTodoRequest struct {
	Name    string         `json:"name"`
	Date    time.Time      `json:"date"`
	Status  bool           `json:"status"`
	Project ProjectRequest `json:"project"`
	Tag     TagsRequest    `json:"tag"`
}

type UpdateTodoRequest struct {
	Name    string         `json:"name"`
	Date    time.Time      `json:"date"`
	Status  bool           `json:"status"`
	Project ProjectRequest `json:"project"`
	Tag     TagsRequest    `json:"tag"`
}

type UpdateTodoStatusRequest struct {
	Id     string `json:"id"`
	Status bool   `json:"status"`
}
