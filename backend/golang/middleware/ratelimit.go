package middleware

import (
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/ulule/limiter/v3"
	ginlimiter "github.com/ulule/limiter/v3/drivers/middleware/gin"
	"github.com/ulule/limiter/v3/drivers/store/memory"
)

func RateLimiterMiddleware() gin.HandlerFunc {
	rl, err := strconv.Atoi(os.Getenv("RATE_LIMIT"))

	if err != nil {
		rl = 100
	}

	rate := limiter.Rate{
		Period: 1 * time.Minute,
		Limit:  int64(rl),
	}

	store := memory.NewStore()
	instance := limiter.New(store, rate)

	return ginlimiter.NewMiddleware(instance)
}
