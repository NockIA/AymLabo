package methods

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Player struct {
	Email    string `json:"email"`
	Pseudo   string `json:"pseudo"`
	Password string `json:"password"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	encodedBody := json.NewDecoder(r.Body)
	defer r.Body.Close()
	var requestData Player
	if err := encodedBody.Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	fmt.Println(requestData.Email, requestData.Pseudo, requestData.Password)
}
