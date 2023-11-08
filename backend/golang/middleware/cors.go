package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",           // 開発環境
			"https://task-copilot.vercel.app", // 本番環境
			"https://task-copilot-dev.vercel.app",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"PATCH",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Authorization",
		},
		ExposeHeaders: []string{
			"Location",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})
}
