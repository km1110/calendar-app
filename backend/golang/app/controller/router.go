package controller

import (
	"net/http"
	"os"
)

type Router interface {
	HandleRequest()
}

type router struct {
	sc ScheduleController
}

func CreateRouter(sc ScheduleController) Router {
	return &router{sc}
}

func (ro *router) HandleRequest() {
	http.HandleFunc("/schedule/", ro.HandleScheduleRequest)
}

func (ro *router) HandleScheduleRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN"))
	w.Header().Set("Content-Type", "application/json")

	// preflightでAPIが二度実行されてしまうことを防ぐ。
	if r.Method == "OPTIONS" {
		return
	}

	prefix := "/schedule/"

	switch r.URL.Path {
	case prefix + "fetch-schedules":
		ro.sc.FetchSchedules(w, r)
	case prefix + "add-schedule":
		ro.sc.AddSchedule(w, r)
	case prefix + "change-schedule":
		ro.sc.ChangeSchedule(w, r)
	case prefix + "delete-schedule":
		ro.sc.DeleteSchedule(w, r)
	default:
		w.WriteHeader(405)
	}
}
