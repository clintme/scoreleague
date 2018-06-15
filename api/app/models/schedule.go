package models

import (
	"time"
)

// Schedules ....
type Schedules struct {
	ID            int64      `json:"id" gorm:"AUTO_INCREMENT"`
	HostID        string     `json:"host_id,omitempty"`
	GuestID       string     `json:"guest_id,omitempty"`
	ScheduledDate time.Time  `json:"scheduled_date,omitempty"`
	Status        int64      `json:"status,omitempty"`
	CreatedAt     time.Time  `json:"created_at,omitempty"`
	UpdatedAt     time.Time  `json:"updated_at,omitempty"`
	DeletedAt     *time.Time `json:"deleted_at,omitempty"`
}

// MatchSchedule ...
type MatchSchedule struct {
	ID            int64     `json:"id,omitempty"`
	ScheduledDate time.Time `json:"scheduled_date,omitempty"`
	Name          string    `json:"name,omitempty"`
	Status        int64     `json:"status"`
}

// ScheduleTable ...
type ScheduleTable struct{}

// Create ...
func (schedule *Schedules) Create() (Schedules, error) {
	if schedule.ID == 0 {
		var err error

		// scheduleData := ScheduleTable{}
		// schedules, err := scheduleData.GetScheduleByName(schedule.Name)
		// if err == nil && schedules.ID > 0 {
		// 	return *schedule, errors.New("Schedule only allowed to play in one team")
		// }

		err = db.Debug().Create(schedule).Error
		if err != nil {
			schedule.ID = 0
		}

		return *schedule, err
	}

	return *schedule, nil
}

// GetMatchSchedules ...
func GetMatchSchedules(ID int64) ([]MatchSchedule, error) {
	var matchSchedule []MatchSchedule
	var err error

	if ID > 0 {
		err = db.Debug().Table("schedules").Select("schedules.id, schedules.scheduled_date, teams.name, schedules.status").Joins("LEFT JOIN teams ON teams.id = schedules.host_id or teams.id = schedules.guest_id").Where("id=?", ID).Scan(&matchSchedule).Error
	} else {
		err = db.Debug().Table("schedules").Select("schedules.id, schedules.scheduled_date, teams.name, schedules.status").Joins("LEFT JOIN teams ON teams.id = schedules.host_id or teams.id = schedules.guest_id").Scan(&matchSchedule).Error
	}

	return matchSchedule, err
}
