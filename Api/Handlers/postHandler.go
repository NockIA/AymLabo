package handlers

import (
	methods "api/Handlers/Methods"
	"net/http"
)

var posthandlers = map[string]func(http.ResponseWriter, *http.Request){
	"/signup": methods.Register,
	"/signin": methods.Login,
	// "/play":     methods.Play,
	"/soloPlay": methods.SoloPlay,
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	if handler, handlerExist := posthandlers[r.URL.Path]; handlerExist {
		handler(w, r)
	} else {
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}
