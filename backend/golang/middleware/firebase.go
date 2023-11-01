package middleware

import (
	"context"
	"log"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

func FirebaseAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// init
		opt := option.WithCredentialsFile("serviceAccountKey.json")
		app, err := firebase.NewApp(context.Background(), nil, opt)
		if err != nil {
			log.Fatalf("error initializing app: %v", err)
		}

		ctx := c.Request.Context()

		// verify
		client, err := app.Auth(ctx)
		if err != nil {
			log.Fatalf("error getting Auth client: %v\n", err)
		}

		authHeader := c.Request.Header.Get("Authorization")
		idToken := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer"))

		token, err := client.VerifyIDToken(ctx, idToken)
		if err != nil {
			log.Fatalf("error verifying ID token: %v\n", err)
		}

		c.Set("firebaseUID", token.UID)
		c.Next()
	}
}
