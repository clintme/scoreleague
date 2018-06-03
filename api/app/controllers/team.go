package controllers

import (
	"github.com/XanderDwyl/scoreleague/api/app/models"
	"gopkg.in/gin-gonic/gin.v1"
)

// GetTeam ...
func GetTeam(c *gin.Context) {

	teams, err := models.GetTeams()
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "Team List", gin.H{"teams": teams})
}

// TeamRegistration ...
func TeamRegistration(c *gin.Context) {
	var team models.Teams

	err := c.BindJSON(&team)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	team, err = team.Create()
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "Team Created", gin.H{"data": team})
}
