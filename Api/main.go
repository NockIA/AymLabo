package main

import (
	handlers "api/Handlers"
	"fmt"
	"net/http"
	"strings"
)

const (
	validApiKey = "2550b020a8741ebb18c92da857e3651db920bb191c15e7753d415a261ad803114edb958d4856b65563b6ee92ea1f3711b281253f9c5b285e24eec88aa94ed2d8"
	port        = ":9090"
)

func isValidToken(JWT *string) bool {
	splitJWT := strings.Split(*JWT, ".")
	if len(splitJWT) == 2 {
		return true
	}
	return false
}

func authenticate(inLogin bool, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		splittedToken := strings.Split(tokenString, ":")
		if len(splittedToken) != 2 || splittedToken[0] != validApiKey {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		if inLogin {
			next.ServeHTTP(w, r)
		}
		if !isValidToken(&splittedToken[1]) {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	http.Handle("/login", authenticate(true, http.HandlerFunc(handlers.Login)))
	http.Handle("/", authenticate(false, http.HandlerFunc(handlers.ProtectedHandler)))
	fmt.Printf("Sever start on : http://localhost%v/\n", port)
	http.ListenAndServe(port, nil)
}
