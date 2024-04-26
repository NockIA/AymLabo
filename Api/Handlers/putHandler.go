package handlers

import (
	"net/http"
)

var puthandlers = map[string]func(http.ResponseWriter, *http.Request){}

func PutHandler(w http.ResponseWriter, r *http.Request) {
	if handler, handlerExist := puthandlers[r.URL.Path]; handlerExist {
		handler(w, r)
	} else {
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}
