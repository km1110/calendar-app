package utils

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/oklog/ulid"
)

func GetFirebaseUID(c *gin.Context) (string, error) {
	firebaseUID, exists := c.Get("firebaseUID")
	if !exists {
		return "", fmt.Errorf("firebaseUID not provided")
	}

	return firebaseUID.(string), nil
}

func GenerateId() string {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixMicro())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	return id.String()
}
