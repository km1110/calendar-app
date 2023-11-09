package model

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

func init() {
	var err error

	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	database := os.Getenv("DB_NAME")

	fmt.Println("connecting to database...", database)

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=true", user, password, host, database)
	Db, err = sql.Open("mysql", dsn)

	log.Printf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=true", user, password, host, database)

	if err != nil {
		fmt.Println("Cannot open:", err)
		return
	}

	err = Db.Ping()

	if err != nil {
		fmt.Println(err)
		return
	}

	env := os.Getenv("ENV")

	if env == "local" {
		fmt.Println("Connected to local database")
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

		projectSQL := `CREATE TABLE IF NOT EXISTS projects(
		id varchar(26) not null PRIMARY KEY,
		user_id varchar(26),
		title text not null,
		description text,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		foreign key (user_id) references users(id)
	)`

		_, err = Db.Exec(projectSQL)

		if err != nil {
			fmt.Println(err)
			return
		}

		tagSQL := `CREATE TABLE IF NOT EXISTS tags(
		id varchar(26) not null PRIMARY KEY,
		user_id varchar(26),
		name text not null,
		foreign key (user_id) references users(id)
	)`

		_, err = Db.Exec(tagSQL)

		if err != nil {
			fmt.Println(err)
			return
		}

		todoSQL := `CREATE TABLE IF NOT EXISTS todos(
			id varchar(26) not null PRIMARY KEY,
			user_id varchar(26),
			project_id varchar(26),
			tag_id varchar(26),
			name text not null,
			date datetime not null,
			status boolean not null,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			foreign key (user_id) references users(id),
			foreign key (project_id) references projects(id),
			foreign key (tag_id) references tags(id)
	)`

		_, err = Db.Exec(todoSQL)

		if err != nil {
			fmt.Println(err)
			return
		}
	}

	fmt.Println("Connection has been established!")
}
