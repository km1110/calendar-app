package main

import (
	"net/http"

	"github.com/km1110/calender-app/backend/golang/controller"
	"github.com/km1110/calender-app/backend/golang/model"
)

var sm = model.CreateScheduleModel()
var sc = controller.CreateScheduleController(sm)
var ro = controller.CreateRouter(sc)

func main() {
	ro.HandleRequest()
	http.ListenAndServe(":8080", nil)
}
