package model

type FileMetaData struct {
	Name string `bson:"name" json:"name"`
	Type string `bson:"type" json:"type"`
	Data string `bson:"data" json:"data"`
}