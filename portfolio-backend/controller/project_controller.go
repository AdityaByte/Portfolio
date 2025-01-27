package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/AdityaByte/portfolio-backend/model"
	"github.com/AdityaByte/portfolio-backend/repository"
	"github.com/AdityaByte/portfolio-backend/service"
)

func AddProject(repo *repository.MongoRepository) {
	ProjectModel := model.ProjectModel{
		Title:       "Title verification system",
		Description: "System for verifying the title of press registrar of india",
		Link:        "press-title-verification-system.vercel.com",
		GithubLink:  "https://github.com/AdityaByte",
	}

	service.AddProject(&ProjectModel, repo)
}

func GetProject(w http.ResponseWriter, r *http.Request, repo *repository.MongoRepository) {
	// projects, err := service.GetProject(&repository.MongoRepository{}) // by this we are creating new instance of it

	projects , err := service.GetProject(repo)

	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to get projects", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	encoder := json.NewEncoder(w)
	if err := encoder.Encode(projects); err != nil {
		log.Fatal(err)
		http.Error(w, "Error encoding project data", http.StatusInternalServerError)
		return
	}

}
