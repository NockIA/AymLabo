package handlers

import (
	get "api/Handlers/Methods/Get"
	"net/http"
	"strings"
)

var gethandlers = map[string]func(string, http.ResponseWriter, *http.Request){
	"leaderBoardWithoutPlayer": get.LeaderBoardWithoutPlayer,
	"leaderboard":              get.LeaderBoard,
}

func GetHandler(w http.ResponseWriter, r *http.Request) {
	splitedPath := strings.Split(r.URL.Path, "/")
	if len(splitedPath) == 3 {
		if handler, handlerExist := gethandlers[splitedPath[1]]; handlerExist {
			handler(splitedPath[2], w, r)
		} else {
			http.Error(w, "Not Found", http.StatusNotFound)
		}
	} else {
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}
