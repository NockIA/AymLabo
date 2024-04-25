package post

import (
	bdd "api/BDD"
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"net/http"
)

type ReceiveSoloPlay struct {
	TimePlayedInSecond int `json:"timePlayedInSecond" validate:"required,numeric"`
	NumberOfTargetDown int `json:"numberOfTargetDown" validate:"required,numeric"`
}

func SoloPlay(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var requestData ReceiveSoloPlay
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	if err := utils.Validator.Struct(requestData); err != nil {
		fmt.Printf("Invalid request data in SoloPlay method : %v\n", err)
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}
	receiveToken := r.Header.Get("Authorization")
	if claims, err := utils.GetClaims(&receiveToken); err == nil {
		sqlQuery := "UPDATE players SET timeToKill = CASE WHEN timeToKill IS NULL THEN ? ELSE ((timeToKill +?)/2) END, numberOfSoloGamePlay = numberOfSoloGamePlay + 1 WHERE playerUUID = ?;"
		newTTK := requestData.NumberOfTargetDown / requestData.TimePlayedInSecond
		bdd.DbManager.AddDeleteUpdateDB(sqlQuery, newTTK, newTTK, claims["UUID"])
		w.WriteHeader(http.StatusCreated)
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Failed to get claims in SoloPlay method")
	}
}
