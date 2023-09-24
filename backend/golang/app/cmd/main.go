package main

import (
	"github.com/km1110/calendar-app/backend/golang/router"
)

func main() {
	if err := router.Router().Run(":8080"); err != nil {
		panic(err)
	}
}
