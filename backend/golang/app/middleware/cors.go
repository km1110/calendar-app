package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"http://localhost:3000/",
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
			"Content-Length",
			"application/json",
			"Accept-Encoding",
			"X-CSRF-Token",
			"Authorization",
			"withCredentials",
		},
		ExposeHeaders: []string{
			"Location",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
