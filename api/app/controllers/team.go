package controllers

import (
	"github.com/XanderDwyl/scoreleague/api/app/models"
	"gopkg.in/gin-gonic/gin.v1"
)

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

	OutputJSON(c, "success", "Team Created")
}
