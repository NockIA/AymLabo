package bdd

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

var DbManager *DatabaseManager

type DatabaseManager struct {
	db *sql.DB
}

func NewDatabaseManager(dbPath string) (*DatabaseManager, error) {
	fmt.Printf("Open db : %v\n", dbPath)
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}
	return &DatabaseManager{db: db}, nil
}

func (dm *DatabaseManager) Close() error {
	fmt.Println("close db")
	if dm.db != nil {
		return dm.db.Close()
	}
	return nil
}

func (dm *DatabaseManager) SelectDB(query string, args ...interface{}) (*sql.Rows, error) {
	rows, err := dm.db.Query(query, args...)
	if err != nil {
		fmt.Printf("Erreur dans la méthode select : %v", err)
		return nil, err
	}
	return rows, nil
}

func (dm *DatabaseManager) AddDeleteUpdateDB(query string, args ...interface{}) sql.Result {
	rslt, err := dm.db.Exec(query, args...)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return rslt
}
