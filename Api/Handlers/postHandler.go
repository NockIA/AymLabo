package handlers

import (
	methods "api/Handlers/Methods"
	"net/http"
)

var handlers = map[string]func(http.ResponseWriter, *http.Request){
	"/register": methods.Register,
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	if handler, ok := handlers[r.URL.Path]; ok {
		handler(w, r)
	} else {
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}
