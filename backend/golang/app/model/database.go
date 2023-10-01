package model

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

func init() {
	var err error

	dsn := fmt.Sprintf("%s:%s@tcp(db:3306)/%s?charset=utf8&parseTime=true", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"), os.Getenv("MYSQL_DATABASE"))
	Db, err = sql.Open("mysql", dsn)

	if err != nil {
		fmt.Println(err)
		return
	}

	err = Db.Ping()

	if err != nil {
		fmt.Println(err)
		return
	}

	userSQL := `CREATE TABLE IF NOT EXISTS users(
		id varchar(26) not null PRIMARY KEY,
		firebase_uid VARCHAR(255) UNIQUE NOT NULL,
		username VARCHAR(50) NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

	_, err = Db.Exec(userSQL)

	if err != nil {
		fmt.Println(err)
		return
	}

	scheduleSQL := `CREATE TABLE IF NOT EXISTS schedules(
			id varchar(26) not null PRIMARY KEY,
			user_id varchar(26),
			title text not null,
			description text not null,
			date datetime not null,
			location text not null,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id)
	)`

	_, err = Db.Exec(scheduleSQL)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Connection has been established!")
}
