package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/km1110/calender-app/backend/golang/controller/dto"
	"github.com/km1110/calender-app/backend/golang/model"
	"github.com/km1110/calender-app/backend/golang/model/entities"
)

type ScheduleController interface {
	FetchSchedules(w http.ResponseWriter, r *http.Request)
	AddSchedule(w http.ResponseWriter, r *http.Request)
	ChangeSchedule(w http.ResponseWriter, r *http.Request)
	DeleteSchedule(w http.ResponseWriter, r *http.Request)
}

type scheduleController struct {
	sm model.ScheduleModel
}

func CreateScheduleController(sm model.ScheduleModel) ScheduleController {
	return &scheduleController{sm}
}

func (sc *scheduleController) FetchSchedules(w http.ResponseWriter, r *http.Request) {
	schedules, err := sc.sm.FetchSchedules()

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	var respose []dto.FeatchScheduleResponse

	for _, t := range schedules {
		respose = append(respose, dto.FeatchScheduleResponse{
			Id:          t.Id,
			Title:       t.Title,
			Description: t.Description,
			Date:        t.Date,
			Location:    t.Location,
		})
	}

	json, err := json.Marshal(respose)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	fmt.Fprint(w, string(json))
}

func (sc *scheduleController) AddSchedule(w http.ResponseWriter, r *http.Request) {
	body := make([]byte, r.ContentLength)
	r.Body.Read(body)
	var addScheduleRequest dto.AddScheduleRequest
	err := json.Unmarshal(body, &addScheduleRequest)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	result, err := sc.sm.AddSchedule(entities.Schedule{
		Title:       addScheduleRequest.Title,
		Description: addScheduleRequest.Description,
		Date:        addScheduleRequest.Date,
		Location:    addScheduleRequest.Location,
	})

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	json, err := json.Marshal(result)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	fmt.Fprint(w, string(json))
}

func (sc *scheduleController) ChangeSchedule(w http.ResponseWriter, r *http.Request) {
	body := make([]byte, r.ContentLength)
	r.Body.Read(body)
	var changeScheduleRequest dto.ChangeScheduleRequest
	err := json.Unmarshal(body, &changeScheduleRequest)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	result, err := sc.sm.ChangeSchedule(entities.Schedule{
		Id:          changeScheduleRequest.Id,
		Title:       changeScheduleRequest.Title,
		Description: changeScheduleRequest.Description,
		Date:        changeScheduleRequest.Date,
		Location:    changeScheduleRequest.Location,
	})

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	json, err := json.Marshal(result)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	fmt.Fprint(w, string(json))
}

func (sc *scheduleController) DeleteSchedule(w http.ResponseWriter, r *http.Request) {
	body := make([]byte, r.ContentLength)
	r.Body.Read(body)
	var deleteScheduleRequest dto.DeleteScheduleRequest
	err := json.Unmarshal(body, &deleteScheduleRequest)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	result, err := sc.sm.ChangeSchedule(entities.Schedule{
		Id: deleteScheduleRequest.Id,
	})

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	json, err := json.Marshal(result)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprint(w, err)
		return
	}

	fmt.Fprint(w, string(json))
}
