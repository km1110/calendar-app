package model

import (
	"fmt"
	"time"

	"github.com/km1110/calendar-app/backend/golang/model/entities"
	"github.com/km1110/calendar-app/backend/golang/view/response"
)

type RatioModel struct {
}

func NewRatioModel() *RatioModel {
	return &RatioModel{}
}

func findMaxCount(dc []*entities.TodoDateCount) int {
	if len(dc) == 0 {
		return 0
	}

	max := dc[0].Count
	for _, count := range dc {
		if count.Count > max {
			max = count.Count
		}
	}
	return max
}

func containsDate(dc []*entities.TodoDateCount, date string) int {
	d, _ := time.Parse("2006-01-02", date)
	for _, day := range dc {
		if day.Date == d {
			return day.Count
		}
	}
	return 0
}

func calcRatio(count int, max int) int {
	ratio := float32(count)
	maxf := float32(max)
	if ratio >= maxf*0.8 {
		return 5
	} else if ratio >= maxf*0.6 {
		return 4
	} else if ratio >= maxf*0.4 {
		return 3
	} else if ratio >= maxf*0.2 {
		return 2
	} else if ratio > 0 {
		return 1
	} else {
		return 0
	}
}

func (rm *RatioModel) GetRatio(counts []*entities.TodoDateCount, start string, end string) ([]*response.TodoDateRatio, error) {

	fmt.Println(start, end)
	var ratios []*response.TodoDateRatio

	max := findMaxCount(counts)

	cday := start

	for {
		count := containsDate(counts, cday)
		ratio := calcRatio(count, max)

		parseDate, _ := time.Parse("2006-01-02", cday)
		ratios = append(ratios, &response.TodoDateRatio{
			Date:  parseDate,
			Ratio: ratio,
		})

		cday = parseDate.AddDate(0, 0, 1).Format("2006-01-02")
		if cday == end {
			break
		}
	}

	return ratios, nil
}
