package get

import (
	utils "api/Handlers/Utils"
	"encoding/json"
	"fmt"
	"net/http"
)

type MyFriendData struct {
	Pseudo string `json:"pseudo"`
	Avatar string `json:"avatar"`
	Email  string `json:"email"`
}
type FriendData struct {
	MyFriends map[string]MyFriendData `json:"myFriends"`
	Requests  map[string]MyFriendData `json:"requests"`
}

func Friend(w http.ResponseWriter, r *http.Request) {
	receiveToken := r.Header.Get("Authorization")
	if claims, err := utils.GetClaims(&receiveToken); err == nil {
		fmt.Println(claims["UUID"])
		data := make(map[string]MyFriendData)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
		return
	} else {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Failed to get claims in LeaderBoard method")
		return
	}
}
