package methods

import (
	utils "api/Handlers/Utils"
	"encoding/json"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	encodedBody := json.NewDecoder(r.Body)
	defer r.Body.Close()
	var requestData utils.Player
	if err := encodedBody.Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	if isUserExist, jwtToken := utils.IsUserExist(requestData); !isUserExist {
		message := Message{Text: jwtToken}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(message)
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
}
