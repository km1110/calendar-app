package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/km1110/calendar-app/backend/golang/controller"
	"github.com/km1110/calendar-app/backend/golang/model"
)

var sm = model.CreateScheduleModel()
var sc = controller.CreateScheduleController(sm)
var ro = controller.CreateRouter(sc)

func migrate() {
	sql := `INSERT INTO schedules(id, title, date, description, location) VALUES('00000000000000000000000000', 'dummy', '20230701', 'test', 'home');`

	_, err := model.Db.Exec(sql)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Migration is success!")
}

func main() {
	f := flag.String("option", "", "migrate database or not")
	flag.Parse()
	if *f == "migrate" {
		migrate()
	}
	ro.HandleRequest()
	http.ListenAndServe(":8080", nil)
}
