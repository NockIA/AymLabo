package methods

import (
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"net/http"
)

type ReceiveSoloPlay struct {
	TimePlayedInSecond string `json:"timePlayedInSecond" validate:"required"`
	NumberOfTargetDown string `json:"numberOfTargetDown" validate:"required"`
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
		fmt.Println(claims)
		message := LoginAndRegisterMessage{Jwt: "Hello, World!"}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(message)
		// fmt.Println(requestData.Email, requestData.Pseudo, requestData.Password)
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Failed to get claims in SoloPlay method")
	}
}
