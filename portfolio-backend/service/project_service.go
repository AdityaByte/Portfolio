package service

import (
	"log"

	"github.com/AdityaByte/portfolio-backend/model"
	"github.com/AdityaByte/portfolio-backend/repository"
)


func AddProject(projectModel *model.ProjectModel, repo *repository.MongoRepository)  error  {

	err := repo.SaveProject(projectModel)

	if err != nil {
		return err
	}

	return nil
}


func GetProject(repo *repository.MongoRepository) ([]model.ProjectModel, error) {

	projects, err := repo.GetProjects()

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return projects, nil
}