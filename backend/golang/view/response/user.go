package response

type CreateUserResponse struct {
	Id           string `json:"id"`
	Firebase_uid string `json:"firebase_uid"`
	Username     string `json:"username"`
	Email        string `json:"email"`
}
