package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/km1110/calendar-app/backend/golang/router"
)

func main() {
	err := godotenv.Load(fmt.Sprintf("../%s.env", os.Getenv("GO_ENV")))
	if err != nil {
		// .env読めなかった場合の処理
		fmt.Println("error: ", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("port: ", port)
	if err := router.Router().Run(":" + port); err != nil {
		panic(err)
	}
}
