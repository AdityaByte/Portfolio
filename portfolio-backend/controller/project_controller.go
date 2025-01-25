package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/AdityaByte/portfolio-backend/model"
	"github.com/AdityaByte/portfolio-backend/service"
)

func AddProject() {
	ProjectModel := model.ProjectModel{
		Title:       "Title verification system",
		Description: "System for verifying the title of press registrar of india",
		Link:        "press-title-verification-system.vercel.com",
		GithubLink:  "https://github.com/AdityaByte",
	}

	service.AddProject(&ProjectModel)
}

func GetProject(w http.ResponseWriter, r *http.Request) {
	projects, err := service.GetProject()

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
