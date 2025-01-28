package controller

import (
	"encoding/json"
	"net/http"

	"github.com/AdityaByte/portfolio-backend/repository"
)

func GetProjectController(w http.ResponseWriter, r *http.Request, repo *repository.MongoRepository) {
	if r.Method != http.MethodGet {
		http.Error(w, "GET method is allowed only", http.StatusMethodNotAllowed)
		return
	}

	projects, err := repo.GetProjects()
	if err != nil {
		http.Error(w, "Error fetching projects from database", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(projects); err != nil {
		http.Error(w, "Error encoding response to JSON", http.StatusInternalServerError)
	}
}
