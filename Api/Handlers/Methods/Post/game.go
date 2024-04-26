package post

import (
	bdd "api/BDD"
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"math"
	"net/http"
)

type ReceiveSoloPlay struct {
	TimePlayedInSecond int `json:"timePlayedInSecond" validate:"required,numeric"`
	NumberOfTargetDown int `json:"numberOfTargetDown" validate:"required,numeric"`
	Accuracy           int `json:"accuracy" validate:"required,numeric"`
	BestStrike         int `json:"bestStrike" validate:"required,numeric"`
	Score              int `json:"score" validate:"required,numeric"`
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
		sqlQuery := `
		UPDATE 
			players 
		SET 
			killPerSeconde = (killPerSeconde + ?)/2,
			numberOfSoloGamePlay = numberOfSoloGamePlay + 1,
			avgAccuracy = (avgAccuracy + ?)/2,
			totalScore = totalScore + ?,
			bestStrike = MAX(bestStrike, ?),
			numberOfGameWithStrike = CASE WHEN ? != 0 THEN numberOfGameWithStrike + 1 ELSE numberOfGameWithStrike END
		WHERE playerUUID = ?;
		`
		newKPS := math.Round(float64(requestData.NumberOfTargetDown/requestData.TimePlayedInSecond)*100.0) / 100.0
		bdd.DbManager.AddDeleteUpdateDB(sqlQuery, newKPS, requestData.Accuracy, requestData.Score, requestData.BestStrike, requestData.BestStrike, claims["UUID"])
		w.WriteHeader(http.StatusAccepted)
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Failed to get claims in SoloPlay method")
	}
}
