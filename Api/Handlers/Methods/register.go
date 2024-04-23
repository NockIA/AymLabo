package methods

import (
	bdd "api/BDD"
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"
)

type NewPlayer struct {
	Email    string `json:"email"`
	Pseudo   string `json:"username"`
	Password string `json:"password"`
}

type LoginAndRegisterMessage struct {
	Jwt string `json:"jwt"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	encodedBody := json.NewDecoder(r.Body)
	defer r.Body.Close()
	var requestData NewPlayer
	if err := encodedBody.Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	rslt, err := bdd.DbManager.SelectDB("SELECT playerUUID FROM players WHERE (email=? OR pseudo=?) AND password=?", requestData.Email, requestData.Pseudo, requestData.Password)
	if err != nil {
		rslt.Close()
		http.Error(w, "Failed to read db", http.StatusBadRequest)
		fmt.Println("erreur in db read in login")
		return
	}
	defer rslt.Close()
	if !rslt.Next() {
		var playerUUID string = uuid.New().String()
		if jwtToken, err := utils.CreateJWT(&playerUUID); err == nil {
			message := LoginAndRegisterMessage{Jwt: jwtToken}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(message)
			bdd.DbManager.AddDeleteUpdateDB("INSERT INTO players (playerUUID, email, pseudo, password, numberOfWin, numberOfLoose) VALUES (?, ?, ?, ?,0,0);", playerUUID, requestData.Email, requestData.Pseudo, requestData.Password)
			return
		}
	}
	http.Error(w, "Unauthorized", http.StatusUnauthorized)
}
