package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/AdityaByte/portfolio-backend/service"
)

type ContactForm struct {
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Query    string `json:"query"`
}

func ContactController(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method != http.MethodPost {
		http.Error(w, "Post method is only allowed", http.StatusMethodNotAllowed)
		return
	}

	var contactForm ContactForm

	if err := json.NewDecoder(r.Body).Decode(&contactForm); err != nil {
		http.Error(w, "Error while decoding the json", http.StatusInternalServerError)
		return
	}

	client, err := service.CreateSMTPClient()

	if err != nil {
		http.Error(w, fmt.Sprintf("Error creating the smtp client %v", err), http.StatusInternalServerError)
		return
	}

	defer client.Quit()

	message := "FullName: " + contactForm.Fullname + "\nEmail: " + contactForm.Email + "\nQuery: " + contactForm.Query

	if err := service.SendMail(client, "Query", message); err != nil {
		http.Error(w, fmt.Sprintf("Error sending email %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"status": "success",
	})
}
