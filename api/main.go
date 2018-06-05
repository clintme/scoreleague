package main

import (
	"log"
	"os"
	"time"

	"github.com/XanderDwyl/scoreleague/api/app/controllers"
	"github.com/XanderDwyl/scoreleague/api/app/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-contrib/sessions"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"gopkg.in/gin-gonic/gin.v1"
)

func init() {
	log.SetFlags(log.Lshortfile)
	models.Setup()
}

func main() {
	router := gin.Default()
	allowOrigins := []string{
		"http://scoreleague.com",
		"https://scoreleague.com",
	}

	if os.Getenv("MODE") != "production" {
		allowOrigins = append(allowOrigins, "http://localhost:3005")
		allowOrigins = append(allowOrigins, "http://localhost:3001")
		allowOrigins = append(allowOrigins, "http://127.0.0.1:3005")
		allowOrigins = append(allowOrigins, "http://127.0.0.1:3001")
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowOrigins,
		AllowMethods:     []string{"PUT", "POST", "GET", "DELETE"},
		AllowHeaders:     []string{"Origin", "Access-Control-Allow-Origin", "Accept", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	store := sessions.NewCookieStore([]byte("Lod5c5F"))

	router.Use(sessions.Sessions("mysession", store))
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	router.Use(gin.Recovery())

	initializeRoutes(router)

	router.Run(":8080")
}

func initializeRoutes(origRouter *gin.Engine) {
	api := origRouter.Group("")

	api.GET("/", controllers.Index)
	api.POST("/login", controllers.Login)
	api.POST("/teams", controllers.GetTeam)
	api.POST("/teams/registration", controllers.TeamRegistration)
	api.GET("/players", controllers.GetPlayers)
	api.POST("/players/registration", controllers.PlayerRegistration)
	api.POST("/signup", controllers.Signup)
}
