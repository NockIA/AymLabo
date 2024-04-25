package handlers

import (
	postMethods "api/Handlers/Methods/Post"
	"net/http"
)

var posthandlers = map[string]func(http.ResponseWriter, *http.Request){
	"/signup": postMethods.Register,
	"/signin": postMethods.Login,
	// "/play":     methods.Play,
	"/soloPlay": postMethods.SoloPlay,
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	if handler, handlerExist := posthandlers[r.URL.Path]; handlerExist {
		handler(w, r)
	} else {
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}
