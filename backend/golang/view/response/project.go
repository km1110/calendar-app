package response

type ProjectResponse struct {
	Id          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type ProjectsResponse struct {
	Id    string `json:"id"`
	Title string `json:"title"`
}
