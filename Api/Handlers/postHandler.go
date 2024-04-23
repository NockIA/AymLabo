package handlers

import (
	methods "api/Handlers/Methods"
	"net/http"
)

var posthandlers = map[string]func(http.ResponseWriter, *http.Request){
	"/register": methods.Register,
	"/login":    methods.Login,
	"/play":     methods.Play,
	"/ttk":      methods.UpdateTTK,
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	if handler, handlerExist := posthandlers[r.URL.Path]; handlerExist {
		handler(w, r)
	} else {
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}
