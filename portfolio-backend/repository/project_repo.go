package repository

import (
	"context"
	"log"
	"os"

	"github.com/AdityaByte/portfolio-backend/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoRepository struct {
	client *mongo.Client
	collection *mongo.Collection
}

func NewMongoRepository() (*MongoRepository, error) {
	
	mongoURI := os.Getenv("MONGO_URI")

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	err = client.Connect(context.Background())

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	repo := &MongoRepository{
		client: client,
		collection: client.Database("godb").Collection("project"),
	}

	return repo, nil
}

func (repo *MongoRepository) SaveProject(data *model.ProjectModel) error {
	_, err := repo.collection.InsertOne(context.Background(), data)

	if err != nil {
		log.Println("Error inserting project", err)
		return err
	}

	log.Println("Project inserted successfully", data)
	return nil
}

func (repo *MongoRepository) GetProjects() ([]model.ProjectModel, error) {
	var projects []model.ProjectModel

	ctx := context.Background()

	cursor, err := repo.collection.Find(ctx, bson.D{})

	if err != nil {
		log.Println("Error Finding projects", err)
		return nil, err
	}

	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &projects); err != nil {
		log.Println("error decoding projects", err)
		return nil,err
	}

	return projects, nil
}

func (repo *MongoRepository) CloseConnection() error {

	err := repo.client.Disconnect(context.Background())

	if err != nil {
		log.Fatalf("Error while closing the mongodb connection", err)
		return err
	}

	log.Println("Connection closed successfully")
	return nil
}