package response

import "time"

type TodosResponse struct {
	Id      string           `json:"id"`
	Name    string           `json:"name"`
	Date    time.Time        `json:"date"`
	Status  bool             `json:"status"`
	Project ProjectsResponse `json:"project"`
	Tag     TagResponse      `json:"tag"`
}

type TodoDateRatio struct {
	Date  time.Time `json:"date"`
	Ratio int       `json:"ratio"`
}
