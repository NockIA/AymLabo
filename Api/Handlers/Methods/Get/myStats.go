package get

import (
	bdd "api/BDD"
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"net/http"
)

type MyStatsData struct {
	Uuid                 string  `json:"uuid"`
	Pseudo               string  `json:"pseudo"`
	Avatar               string  `json:"avatar"`
	Email                string  `json:"email"`
	TotalScore           int     `json:"totalScore"`
	NumberGameWin        int     `json:"numberGameWin"`
	NumberGameLoose      int     `json:"numberGameLoose"`
	AvgAccuracy          int     `json:"avgAccuracy"`
	NumberOfSoloGamePlay int     `json:"numberOfSoloGamePlay"`
	KillPerSeconde       float64 `json:"kps"`
}

func MyStats(_ string, w http.ResponseWriter, r *http.Request) {
	receiveToken := r.Header.Get("Authorization")
	if claims, err := utils.GetClaims(&receiveToken); err == nil {
		rslt := bdd.DbManager.SelectDB(`
		SELECT 
			playerUUID,
			pseudo,
			avatarProfile,
			totalScore,
			numberOfWin,
			numberOfLoose,
			avgAccuracy,
			killPerSeconde,
			numberOfSoloGamePlay,
			email
		FROM
			players
		WHERE
			playerUUID = ?`, claims["UUID"])
		var myStats MyStatsData
		for rslt.Next() {
			rslt.Scan(&myStats.Uuid, &myStats.Pseudo, &myStats.Avatar, &myStats.TotalScore, &myStats.NumberGameWin, &myStats.NumberGameLoose, &myStats.AvgAccuracy, &myStats.KillPerSeconde, &myStats.NumberOfSoloGamePlay, &myStats.Email)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(myStats)
		return
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Failed to get claims in MyStats method")
		return
	}
}
