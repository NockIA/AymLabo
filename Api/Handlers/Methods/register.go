package methods

import (
	bdd "api/BDD"
	"encoding/json"
	"fmt"
	"net/http"
)

type NewPlayer struct {
	Email    string `json:"email"`
	Pseudo   string `json:"pseudo"`
	Password string `json:"password"`
}

type Message struct {
	Text string `json:"text"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	encodedBody := json.NewDecoder(r.Body)
	defer r.Body.Close()
	var requestData NewPlayer
	if err := encodedBody.Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
		return
	}
	rslt := bdd.SelectDB("SELECT * FROM XXXX WHERE email=? and email=? and email=? and")
	defer rslt.Close()
	if rslt.Next() {
		http.Error(w, "This user already exist", http.StatusBadRequest)
		return
	}
	message := Message{Text: "Hello, World!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)
	fmt.Println(requestData.Email, requestData.Pseudo, requestData.Password)
}
