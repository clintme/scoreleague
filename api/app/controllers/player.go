package controllers

import (
	"time"

	"github.com/XanderDwyl/scoreleague/api/app/models"
	"gopkg.in/gin-gonic/gin.v1"
)

type playerInfo struct {
	ID        int64
	Name      string
	TeamID    int64
	Status    string
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
	Team      models.Teams
}

// GetPlayers ...
func GetPlayers(c *gin.Context) {
	var player models.Players
	// var team models.Teams

	playerErr := c.BindJSON(&player)
	if playerErr != nil {
		OutputJSON(c, "error", "Team is not specified")
		return
	}

	players, err := models.GetPlayers(player.TeamID)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "List of Player", gin.H{"players": players})
}

// PlayerRegistration ...
func PlayerRegistration(c *gin.Context) {
	var player models.Players

	err := c.BindJSON(&player)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	player, err = player.Create()
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "Player is successfully registered", gin.H{"data": player})

}
