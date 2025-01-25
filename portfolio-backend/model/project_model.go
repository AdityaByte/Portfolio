package model

type ProjectModel struct {
	Title       string `bson:"projectTitle"json:"projectTitle" `
	Description string `bson:"projectDescription" json:"projectDescription"`
	Link        string `bson:"projectLink" json:"projectLink"`
	GithubLink  string `bson:"githubLink" json:"githubLink"`
}
