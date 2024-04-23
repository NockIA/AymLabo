package methods

import (
	"encoding/json"
	"net/http"
)

var receivePlayer struct {
}

func Play(w http.ResponseWriter, r *http.Request) {
	// encodedBody := json.NewDecoder(r.Body)
	// defer r.Body.Close()
	// var requestData Player
	// if err := encodedBody.Decode(&requestData); err != nil {
	// 	http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
	// 	return
	// }
	// rslt := bdd.SelectDB("SELECT * FROM XXXX WHERE player2=null")
	// defer rslt.Close()
	// if rslt.Next() {
	// 	// create user
	// 	//return c'est créé
	// } else {
	// 	http.Error(w, "Unauthorized", http.StatusUnauthorized)
	// 	return
	// }
	message := LoginAndRegisterMessage{Jwt: "Hello, World!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)
	// fmt.Println(requestData.Email, requestData.Pseudo, requestData.Password)
}

func UpdateTTK(w http.ResponseWriter, r *http.Request) {}
