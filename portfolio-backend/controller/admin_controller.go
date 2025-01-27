package controller

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/AdityaByte/portfolio-backend/model"
	"github.com/AdityaByte/portfolio-backend/repository"
	"github.com/AdityaByte/portfolio-backend/service"
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

	defer r.Body.Close()

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

func AddProjectController(w http.ResponseWriter, r *http.Request, repo *repository.MongoRepository) {

	log.Println("Request recieved")

	if r.Method != http.MethodPost {
		http.Error(w, "Post method is allowed only", http.StatusMethodNotAllowed)
		return
	}

	// Here we are sending the data from the frontend in the form of multipartform which contains formdata

	err := r.ParseMultipartForm(10 << 20) // Max size is 10 mb

	if err != nil {
		http.Error(w, "Error while decoding the formdata", http.StatusInternalServerError)
		return
	}

	title := r.FormValue("title")
	description := r.FormValue("description")
	projectLink := r.FormValue("projectLink")
	githubLink := r.FormValue("githubLink")

	file, fileHeader, err := r.FormFile("file")

	if err != nil {
		http.Error(w, "Error retriving file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	fileBytes, err := io.ReadAll(file)

	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		return
	}

	fileModel := model.FileMetaData{
		Name: fileHeader.Filename,
		Type: http.DetectContentType(fileBytes),
		Data: fileBytes,
	}

	projectModel := model.ProjectModel{
		Title:       title,
		Description: description,
		Link:        projectLink,
		GithubLink:  githubLink,
		File:        fileModel,
	}

	if err = service.AddProject(&projectModel, repo); err != nil {
		http.Error(w, "Error occured while saving project", http.StatusInternalServerError)
		return
	}

	defer r.Body.Close()

	w.WriteHeader(http.StatusCreated)
}
