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
	w.Header().Set("Access-Control-Allow-Methods", "PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN"))
	w.Header().Set("Content-Type", "application/json")

	// preflightでAPIが二度実行されてしまうことを防ぐ。
	if r.Method == "OPTIONS" {
		return
	}

	// prefix := "/schedule/"

	switch r.Method {
	case "GET":
		ro.sc.FetchSchedules(w, r)
	case "POST":
		ro.sc.AddSchedule(w, r)
	case "PUT":
		ro.sc.ChangeSchedule(w, r)
	case "DELETE":
		ro.sc.DeleteSchedule(w, r)
	default:
		w.WriteHeader(405)
	}
}
