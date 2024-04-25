package get

import (
	bdd "api/BDD"
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
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
	LimitMin int                `json:"limitMin" validate:"required"`
	LimitMax int                `json:"limitMax" validate:"required"`
	Data     map[int]PlayerData `json:"data"`
}
type LeaderBoardReceive struct {
	LimitMin string `json:"limitMin" validate:"required"`
	LimitMax string `json:"limitMax" validate:"required"`
}

func getRankingOfOnePlayer(uuid, selectedEndpoint string) int {
	rslt := bdd.DbManager.SelectDB(`
	SELECT
		ranking
	FROM
		players p
	INNER JOIN
		(SELECT pseudo, (SELECT COUNT(*) FROM players p2 WHERE p2.`+selectedEndpoint+` IS NOT NULL AND p2.`+selectedEndpoint+` > p.`+selectedEndpoint+`) + 1 AS ranking
		FROM players p WHERE p.`+selectedEndpoint+` IS NOT NULL
		ORDER BY p.`+selectedEndpoint+` DESC) as rankedPlayer
	USING (pseudo)
	WHERE playerUUID = ?
	`, uuid)
	var Ranking int
	for rslt.Next() {
		rslt.Scan(&Ranking)
	}
	return Ranking
}

func getPlayerOnEndpoint(limitMin, limitMax int, selectedEndpoint, uuid string, selectedValue interface{}) LeaderBoardData {
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
		LIMIT `+fmt.Sprint(limitMin)+`) ORDER BY distance DESC  ) as closedPlayer
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
		LIMIT `+fmt.Sprint(limitMax)+`) ORDER BY distance ASC ) as closedPlayer
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
		if newPlayer.Uuid == uuid {
			newPlayer.IsSelectedPlayer = true
		}
		data.Data[newPlayer.Ranking] = newPlayer
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
			ranking := getRankingOfOnePlayer(uuid, selectedEndpoint)
			fmt.Println(ranking)
			if ranking <= 5 {
				data = getPlayerOnEndpoint(ranking-1, 5+(5-(ranking-1)), selectedEndpoint, uuid, rawPlayer.SelectedData)
				data.LimitMin, data.LimitMax = ranking-1, 5+(5-(ranking-1))
			} else {
				data = getPlayerOnEndpoint(5, 5, selectedEndpoint, uuid, rawPlayer.SelectedData)
				data.LimitMin, data.LimitMax = 5, 5
			}
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

func LeaderBoardWithLimit(endpoint string, w http.ResponseWriter, r *http.Request) {
	encodedBody := json.NewDecoder(r.Body)
	defer r.Body.Close()
	var requestData LeaderBoardReceive
	if err := encodedBody.Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		fmt.Printf("Failed to decode JSON LeaderBoardWithLimit method : %v\n", err)
		return
	}
	if err := utils.Validator.Struct(&requestData); err != nil {
		fmt.Printf("Invalid request data in LeaderBoardWithLimit method : %v\n", err)
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}
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
		lim1, _ := strconv.Atoi(requestData.LimitMin)
		lim2, _ := strconv.Atoi(requestData.LimitMax)
		for rslt.Next() {
			rslt.Scan(&rawPlayer.Uuid, &rawPlayer.SelectedData)
		}
		if uuid, ok := claims["UUID"].(string); ok {
			data = getPlayerOnEndpoint(lim1, lim2, selectedEndpoint, uuid, rawPlayer.SelectedData)
			data.LimitMin, data.LimitMax = lim1, lim2
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
