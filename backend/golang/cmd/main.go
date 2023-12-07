package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/km1110/calendar-app/backend/golang/router"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		// .env読めなかった場合の処理
		fmt.Println("error: ", err)
	}

	// DB接続
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	database := os.Getenv("DB_NAME")
	option := os.Getenv("DB_OPTION")

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?%s", user, password, host, database, option)
	db, err := sql.Open("mysql", dsn)

	log.Printf("%s:%s@tcp(%s)/%s?%s", user, password, host, database, option)

	if err != nil {
		fmt.Println("Cannot open:", err)
		return
	}

	err = db.Ping()

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Connection has been established!")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("port: ", port)

	r := router.Router(db)
	if err := r.Run(":" + port); err != nil {
		panic(err)
	}
}
