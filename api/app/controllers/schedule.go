package controllers

import (
	"github.com/XanderDwyl/scoreleague/api/app/models"
	"gopkg.in/gin-gonic/gin.v1"
)

// GetMatchSchedules ...
func GetMatchSchedules(c *gin.Context) {
	var schedule models.Schedules
	var scheduleID int64
	scheduleErr := c.BindJSON(&schedule)
	if scheduleErr == nil {
		scheduleID = schedule.ID
	}

	matchSchedule, err := models.GetMatchSchedules(scheduleID)
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
