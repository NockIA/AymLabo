package get

import (
	bdd "api/BDD"
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"net/http"
)

type RawPlayer struct {
	Uuid         string
	SelectedData interface{}
}

type PlayerData struct {
	IsSelectedPlayer     bool    `json:"isSelectedPlayer"`
	Uuid                 string  `json:"uuid"`
	Pseudo               string  `json:"pseudo"`
	Ranking              int     `json:"ranking"`
	Avatar               string  `json:"avatar"`
	TotalScore           int     `json:"totalScore"`
	NumberGameWin        int     `json:"numberGameWin"`
	NumberGameLoose      int     `json:"numberGameLoose"`
	AvgAccuracy          int     `json:"avgAccuracy"`
	NumberOfSoloGamePlay int     `json:"numberOfSoloGamePlay"`
	KillPerSeconde       float64 `json:"kps"`
}

type LeaderBoardData struct {
	Data map[int]PlayerData `json:"data"`
}

type LeaderBoardReceive struct {
	Last string `json:"last" validate:"required"`
	More bool   `json:"more" validate:"required"`
}

func getPlayerOnEndpoint(selectedEndpoint, uuid string, selectedValue interface{}) LeaderBoardData {
	data := LeaderBoardData{
		Data: make(map[int]PlayerData),
	}
	rslt := bdd.DbManager.SelectDB(`
	SELECT 
		closedPlayer.playerUUID,
		closedPlayer.pseudo,
		closedPlayer.avatarProfile,
		closedPlayer.totalScore,
		closedPlayer.numberOfWin,
		closedPlayer.numberOfLoose,
		closedPlayer.avgAccuracy,
		closedPlayer.killPerSeconde,
		closedPlayer.numberOfSoloGamePlay,
		rankedPlayer.ranking
	FROM
		(SELECT * FROM (SELECT playerUUID, pseudo, avatarProfile, totalScore, numberOfWin, numberOfLoose, avgAccuracy, numberOfSoloGamePlay, killPerSeconde, ABS(`+selectedEndpoint+` - ?) AS distance FROM players p
		WHERE `+selectedEndpoint+` >= ? AND playerUUID !=? AND `+selectedEndpoint+` IS NOT NULL
		ORDER BY distance ASC
		LIMIT 5) ORDER BY distance DESC  ) as closedPlayer
	JOIN
		(SELECT pseudo, (SELECT COUNT(*) FROM players p2 WHERE p2.`+selectedEndpoint+` IS NOT NULL AND p2.`+selectedEndpoint+` > p.`+selectedEndpoint+`) + 1 AS ranking
		FROM players p WHERE p.`+selectedEndpoint+` IS NOT NULL
		ORDER BY p.`+selectedEndpoint+` DESC) as rankedPlayer
	USING (pseudo)
	UNION
	SELECT
		closedPlayer.playerUUID, closedPlayer.pseudo, closedPlayer.avatarProfile, closedPlayer.totalScore, closedPlayer.numberOfWin, closedPlayer.numberOfLoose, closedPlayer.avgAccuracy, closedPlayer.killPerSeconde, closedPlayer.numberOfSoloGamePlay, rankedPlayer.ranking
	FROM
		(SELECT * FROM (SELECT playerUUID, pseudo, avatarProfile, totalScore, numberOfWin, numberOfLoose, avgAccuracy, numberOfSoloGamePlay, killPerSeconde, ABS(? - `+selectedEndpoint+`) AS distance FROM players p
		WHERE `+selectedEndpoint+` <= ? AND `+selectedEndpoint+` IS NOT NULL
		ORDER BY distance ASC
		LIMIT 5) ORDER BY distance ASC ) as closedPlayer
	JOIN
		(SELECT pseudo, (SELECT COUNT(*) FROM players p2 WHERE p2.`+selectedEndpoint+` IS NOT NULL AND p2.`+selectedEndpoint+` > p.`+selectedEndpoint+`) + 1 AS ranking
		FROM players p WHERE p.`+selectedEndpoint+` IS NOT NULL
		ORDER BY p.`+selectedEndpoint+` DESC) as rankedPlayer
	USING (pseudo)
	ORDER BY rankedPlayer.ranking ASC;
	`, selectedValue, selectedValue, uuid, selectedValue, selectedValue)
	for rslt.Next() {
		newPlayer := PlayerData{
			IsSelectedPlayer: false,
		}
		rslt.Scan(&newPlayer.Uuid, &newPlayer.Pseudo, &newPlayer.Avatar, &newPlayer.TotalScore, &newPlayer.NumberGameWin, &newPlayer.NumberGameLoose, &newPlayer.AvgAccuracy, &newPlayer.KillPerSeconde, &newPlayer.NumberOfSoloGamePlay, &newPlayer.Ranking)
		data.Data[newPlayer.Ranking] = newPlayer
	}
	for key, value := range data.Data {
		if value.Uuid == uuid {
			updatedPlayer := data.Data[key]
			updatedPlayer.IsSelectedPlayer = true
			data.Data[key] = updatedPlayer
		}
	}
	return data
}

func LeaderBoard(endpoint string, w http.ResponseWriter, r *http.Request) {
	receiveToken := r.Header.Get("Authorization")
	if claims, err := utils.GetClaims(&receiveToken); err == nil {
		var selectedEndpoint string
		switch endpoint {
		case "kps":
			selectedEndpoint = "killPerSeconde"
		case "win":
			selectedEndpoint = "numberOfWin"
		case "loose":
			selectedEndpoint = "numberOfLoose"
		case "solo":
			selectedEndpoint = "numberOfSoloGamePlay"
		case "acc":
			selectedEndpoint = "avgAccuracy"
		case "score":
			selectedEndpoint = "totalScore"
		default:
			http.Error(w, "Invalid endpoint", http.StatusUnauthorized)
			fmt.Printf("Invalid endpoint : %v\n", endpoint)
			return
		}
		var data LeaderBoardData
		rslt := bdd.DbManager.SelectDB("SELECT playerUUID, "+selectedEndpoint+" FROM players WHERE playerUUID = ?", claims["UUID"])
		var rawPlayer RawPlayer
		for rslt.Next() {
			rslt.Scan(&rawPlayer.Uuid, &rawPlayer.SelectedData)
		}
		if uuid, ok := claims["UUID"].(string); ok {
			data = getPlayerOnEndpoint(selectedEndpoint, uuid, rawPlayer.SelectedData)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
		return
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Failed to get claims in LeaderBoard method")
		return
	}
}

func LeaderBoardWithoutPlayer(endpoint string, w http.ResponseWriter, r *http.Request) {
	fmt.Println(endpoint)
	encodedBody := json.NewDecoder(r.Body)
	defer r.Body.Close()
	var requestData LeaderBoardReceive
	if err := encodedBody.Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	fmt.Println(requestData)
}
