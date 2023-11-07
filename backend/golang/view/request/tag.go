package request

type TagsRequest struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type TagRequest struct {
	Name string `json:"name"`
}
