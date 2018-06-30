package controllers

import (
	"github.com/XanderDwyl/scoreleague/api/app/models"
	"gopkg.in/gin-gonic/gin.v1"
)

// GetGames ...
func GetGames(c *gin.Context) {
	var game models.Games

	var gameID int64
	gameErr := c.BindJSON(&game)
	if gameErr == nil {
		gameID = game.ID
	}

	games, err := models.GetGames(gameID)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "List of Games", gin.H{"data": games})
}

// // PlayerRegistration ...
// func PlayerRegistration(c *gin.Context) {
// 	var player models.Players

// 	err := c.BindJSON(&player)
// 	if err != nil {
// 		OutputJSON(c, "error", err.Error())
// 		return
// 	}

// 	player, err = player.Create()
// 	if err != nil {
// 		OutputJSON(c, "error", err.Error())
// 		return
// 	}

// 	OutputDataJSON(c, "success", "Player is successfully registered", gin.H{"data": player})

// }
