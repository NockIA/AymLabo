package utils

import (
	bdd "api/BDD"
	"fmt"
)

type Player struct {
	Login    string `json:"login" validate:"required,alphanum"`
	Password string `json:"password" validate:"required"`
}

func IsUserExist(requestData Player) (bool, string) {
	rslt, err := bdd.DbManager.SelectDB("SELECT playerUUID FROM players WHERE (email=? OR pseudo=?) AND password=?", requestData.Login, requestData.Login, requestData.Password)
	if err != nil {
		rslt.Close()
		fmt.Println("erreur in db read in login")
		return false, ""
	}
	defer rslt.Close()
	if rslt != nil && rslt.Next() {
		var playerUUID string
		rslt.Scan(&playerUUID)
		if jwtToken, err := CreateJWT(&playerUUID); err != nil {
			return false, ""
		} else {
			return true, jwtToken
		}
	}
	return false, ""
}
