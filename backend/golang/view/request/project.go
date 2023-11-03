package request

type ProjectRequest struct {
	Id    string `json:"id"`
	Title string `json:"title"`
}

type CreateProjectRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type UpdateProjectRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}
