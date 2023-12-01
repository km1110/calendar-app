package response

import "time"

type Diary struct {
	Id      string    `json:"id"`
	Title   string    `json:"title"`
	Content string    `json:"content"`
	Date    time.Time `json:"date"`
}
