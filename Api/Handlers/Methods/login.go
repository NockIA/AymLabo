package methods

import (
	bdd "api/BDD"
	utils "api/Handlers/Utils"
	"encoding/json"
	"net/http"
)

type Player struct {
	Login    *string `json:"login,omitempty"`
	Password string  `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	encodedBody := json.NewDecoder(r.Body)
	defer r.Body.Close()
	var requestData Player
	if err := encodedBody.Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	sqlQuery := "SELECT playerUUID FROM players WHERE (email=? OR pseudo=?) AND password=?"
	rslt := bdd.SelectDB(&sqlQuery, &requestData.Login, &requestData.Login, &requestData.Password)
	defer rslt.Close()
	if rslt.Next() {
		var playerUUID string
		rslt.Scan(&playerUUID)
		if jwtToken, err := utils.CreateJWT(&playerUUID); err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		} else {
			message := Message{Text: jwtToken}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(message)
			return
		}
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// fmt.Println(requestData.Email, requestData.Pseudo, requestData.Password)
}
