package entities

import "time"

type TodoDateCount struct {
	Date  time.Time `json:"date"`
	Count int       `json:"count"`
}
