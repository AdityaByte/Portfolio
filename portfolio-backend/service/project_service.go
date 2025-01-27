package service

import (
	"log"

	"github.com/AdityaByte/portfolio-backend/model"
	"github.com/AdityaByte/portfolio-backend/repository"
)

func AddProject(projectModel * model.ProjectModel, repo *repository.MongoRepository) {

	// repo, err := repository.NewMongoRepository()

	// if err != nil {
	// 	log.Fatal(err)
	// }
	
	err := repo.SaveProject(projectModel)

	if err != nil {
		log.Fatal(err)
	}

}


func GetProject(repo *repository.MongoRepository) ([]model.ProjectModel, error) {
	// repo, err := repository.NewMongoRepository()

	// if err != nil {
	// 	log.Fatal(err)
	// }

	projects, err := repo.GetProjects()

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return projects, nil
}