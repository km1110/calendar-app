package entities

import "time"

type Diary struct {
	Id      string
	Title   string
	Content string
	Date    time.Time
}
