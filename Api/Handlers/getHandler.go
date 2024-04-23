package handlers

import "net/http"

var gethandlers = map[string]func(http.ResponseWriter, *http.Request){}

func GetHandler(w http.ResponseWriter, r *http.Request) {
	if handler, handlerExist := gethandlers[r.URL.Path]; handlerExist {
		handler(w, r)
	} else {
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}
