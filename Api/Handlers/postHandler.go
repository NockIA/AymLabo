package handlers

import "net/http"

var handlers = map[string]func(http.ResponseWriter, *http.Request){
	"/createGame": CreateGameHandler,
	
}

func PostHandler(w http.ResponseWriter, r *http.Request) {

}
