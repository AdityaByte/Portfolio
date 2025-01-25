package main

import (
	"log"
	"net/http"
	"github.com/rs/cors"
	"github.com/AdityaByte/portfolio-backend/controller"
	"github.com/gorilla/mux"
)

func main() {
	log.Println("Application started...")

	// controller.AddProject()
	r := mux.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // Allow all origins
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	r.HandleFunc("/projects", controller.GetProject).Methods("GET")

	handler := c.Handler(r)

	err := http.ListenAndServe(":4000", handler)

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Server is started at port 4000")
}
