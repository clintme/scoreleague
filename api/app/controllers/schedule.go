package controllers

import (
	"github.com/XanderDwyl/scoreleague/api/app/models"
	"gopkg.in/gin-gonic/gin.v1"
)

// GetMatchSchedules ...
func GetMatchSchedules(c *gin.Context) {
	var schedule models.Schedules
	// var team models.Teams

	scheduleErr := c.BindJSON(&schedule)
	if scheduleErr != nil {
		OutputJSON(c, "error", "Schedule is not specified")
		return
	}

	matchSchedule, err := models.GetMatchSchedules(schedule.ID)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "Matches", gin.H{"data": matchSchedule})
}

// AddSchedule ...
func AddSchedule(c *gin.Context) {
	var schedule models.Schedules

	err := c.BindJSON(&schedule)
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	schedule, err = schedule.Create()
	if err != nil {
		OutputJSON(c, "error", err.Error())
		return
	}

	OutputDataJSON(c, "success", "Schedule is successfully added", gin.H{"data": schedule})

}
