package response

import "time"

type ProjectResponse struct {
	Id    string `json:"id"`
	Title string `json:"title"`
}

type TagResponse struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type TodosResponse struct {
	Id      string          `json:"id"`
	Name    string          `json:"name"`
	Date    time.Time       `json:"date"`
	Status  bool            `json:"status"`
	Project ProjectResponse `json:"project"`
	Tag     TagResponse     `json:"tag"`
}
