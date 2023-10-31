package utils

import (
	"math/rand"
	"time"

	"github.com/oklog/ulid"
)

func GenerateId() string {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixMicro())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	return id.String()
}
