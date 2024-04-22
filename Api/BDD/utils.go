package bdd

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func SelectDB(query *string, args ...interface{}) *sql.Rows {
	db, err := sql.Open("sqlite3", "./DB.db")
	if err != nil {
		fmt.Println(err)
		return nil
	}
	defer db.Close()
	rows, err := db.Query(*query, args...)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return rows
}

func AddDeleteUpdateDB(query *string, args ...interface{}) sql.Result {
	db, err := sql.Open("sqlite3", "./DB.db")
	if err != nil {
		fmt.Println(err)
		return nil
	}
	defer db.Close()
	res, err := db.Exec(*query, args...)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return res
}
