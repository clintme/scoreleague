package controllers

import (
	"strconv"

	"github.com/XanderDwyl/scoreleague/api/app/models"
	"gopkg.in/gin-gonic/gin.v1"
)

// GetTeam ...
func GetTeam(c *gin.Context) {
	var team models.Teams
	var teams []models.Teams
	var err error

	teamErr := c.BindJSON(&team)

	if teamErr == nil {
		teams, err = models.GetTeams(team.ID)
	} else {
		teams, err = models.GetTeams(0)
	}

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

// EditTeam ...
func EditTeam(c *gin.Context) {
	var team models.Teams
	ID := c.Param("id")

	err := c.BindJSON(&team)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	teamID, err := strconv.ParseInt(ID, 10, 64)
	if err != nil {
		OutputJSON(c, "error", "there is a problem with the team ID. please check it again.")
		return
	}

	team, err = team.Update(teamID)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "Team is successfully edited", gin.H{"data": team})
}
