package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/AdityaByte/portfolio-backend/controller"
	"github.com/AdityaByte/portfolio-backend/repository"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// func main() {
// 	log.Println("Application started...")

// 	// controller.AddProject()
// 	r := mux.NewRouter()

// 	c := cors.New(cors.Options{
// 		AllowedOrigins: []string{"*"}, // Allow all origins
// 		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
// 	})

// 	r.HandleFunc("/projects", controller.GetProject).Methods("GET")

// 	r.HandleFunc("/admin", controller.AdminController).Methods("POST")
// 	handler := c.Handler(r)

// 	err := http.ListenAndServe(":4000", handler)

// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	log.Println("Server is started at port 4000")
// }

func main() {
	log.Println("Application started successfully...")

	repo, err := repository.NewMongoRepository()

	if err != nil {
		log.Fatalf("Error initializing repository %v", err)
	}

	sigChan := make(chan os.Signal, 1)

	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	r := mux.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	r.HandleFunc("/projects", controller.GetProject).Methods("GET")
	r.HandleFunc("/admin", controller.AdminController).Methods("POST")

	handler := c.Handler(r)

	server := &http.Server{
		Addr:    ":4000",
		Handler: handler,
	}

	go func() {
		if err := server.ListenAndServe(); err != nil {
			log.Fatalf("Error starting server %v", err)
		}
		log.Println("Server is started at port 4000...")
	}()

	sigReceived := <-sigChan
	log.Printf("Received signal: %v, shutting down gracefully...", sigReceived)

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("Error shutting down server %v", err)
	}

	log.Println("Server shutdown complete")

	if err = repo.CloseConnection(); err != nil {
		log.Fatalf("Error closing mongo connection %v", err)
	}

	log.Println("Mongo connection closed successfully")
}
