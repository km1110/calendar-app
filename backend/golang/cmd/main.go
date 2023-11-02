package main

import (
	"os"

	"github.com/km1110/calendar-app/backend/golang/router"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if err := router.Router().Run(":" + port); err != nil {
		panic(err)
	}
}
