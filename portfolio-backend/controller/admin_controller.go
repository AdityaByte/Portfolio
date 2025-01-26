package controller

import (
	"encoding/json"
	"log"
	"net/http"
)

type FormData struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

func AdminController(w http.ResponseWriter, r *http.Request) {

	log.Println("Request recieved")

	if r.Method != http.MethodPost {
		http.Error(w, "Only post request are allowed", http.StatusMethodNotAllowed)
		return
	}

	var data FormData

	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		http.Error(w, "Error occured during decoding of json", http.StatusInternalServerError)
		return
	}

	if data.UserName == "aditya" && data.Password == "pawar" {
		w.Header().Set(
			"Content-Type", "application/json",
		)
		w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(map[string]string{
			"response": "success",
		})
	} else {
		w.Header().Set(
			"Content-Type", "application/json",
		)
		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]string{
			"response": "failure",
		})

	}
}
