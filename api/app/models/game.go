package models

import (
	"errors"
	"time"
)

// Games ....
type Games struct {
	ID         int64      `json:"id" gorm:"AUTO_INCREMENT"`
	ScheduleID int64      `json:"schedule_id,omitempty"`
	SetNO      int64      `json:"set_no,omitempty"`
	HostScore  int64      `json:"host_score,omitempty"`
	GuestScore int64      `json:"guest_score,omitempty"`
	Status     int64      `json:"status,omitempty"`
	CreatedAt  time.Time  `json:"created_at,omitempty"`
	UpdatedAt  time.Time  `json:"updated_at,omitempty"`
	DeletedAt  *time.Time `json:"deleted_at,omitempty"`
}

// MatchGames ...
type MatchGames struct {
	ScheduledID int64     `json:"scheduled_id,omitempty"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
	SetNo       int64     `json:"set_no"`
	Status      int64     `json:"status"`
}

// GameTable ...
type GameTable struct{}

// Create ...
func (game *Games) Create() (Games, error) {
	if game.ID == 0 {
		var err error

		gameData := GameTable{}
		games, err := gameData.GetGameBySchedSet(game)
		if err == nil && games.ID > 0 {
			return *game, errors.New("Game match is already set")
		}

		err = db.Debug().Create(game).Error
		if err != nil {
			game.ID = 0
		}

		return *game, err
	}

	return *game, nil
}

// Update ...
func (game *Games) Update(ID int64) (Games, error) {
	err := db.Debug().Model(&game).Where("id = ?", ID).Updates(Games{
		ScheduleID: game.ScheduleID,
		SetNO:      game.SetNO,
		HostScore:  game.HostScore,
		GuestScore: game.GuestScore,
		Status:     game.Status,
	}).Error
	if err != nil {
		return *game, errors.New("Error encounter while updating game entry")
	}

	return *game, err
}

// GetGameBySchedSet ...
func (repo *GameTable) GetGameBySchedSet(gameInfo *Games) (Games, error) {
	var games Games

	err := db.Debug().Where("schedule_id = ? AND set_no = ?", gameInfo.ScheduleID, gameInfo.SetNO).Limit(1).First(&games).Error

	return games, err
}

// // GetMatchSchedules ...
// func GetMatchSchedules(ID int64) ([]MatchSchedule, error) {
// 	var matchSchedule []MatchSchedule
// 	var err error

// 	if ID > 0 {
// 		err = db.Debug().Table("schedules").Select("schedules.id, schedules.scheduled_date, (select name from teams where id=schedules.host_id) as host, (select name from teams where id=schedules.guest_id) as guest, schedules.status").Joins("LEFT JOIN teams ON teams.id = schedules.host_id or teams.id = schedules.guest_id").Joins("LEFT JOIN games ON games.schedule_id = schedules.id").Where("schedules.id=?", ID).Scan(&matchSchedule).Error
// 	} else {
// 		err = db.Debug().Table("schedules").Select("schedules.id, schedules.scheduled_date, (select name from teams where id=schedules.host_id) as host, (select name from teams where id=schedules.guest_id) as guest, schedules.status, games.set_no, games.status as game_status").Joins("LEFT JOIN teams ON teams.id = schedules.id").Joins("LEFT JOIN games ON games.schedule_id = schedules.id").Scan(&matchSchedule).Error
// 	}

// 	return matchSchedule, err
// }

// GetGames ...
func GetGames(GameID int64) ([]MatchGames, error) {
	var matchGames []MatchGames
	var err error

	if GameID > 0 {
		err = db.Debug().Table("games").Select("schedules.id as scheduled_id, games.created_at, games.set_no, games.status").Joins("LEFT JOIN schedules ON schedules.id = games.schedule_id").Where("schedules.id=?", GameID).Scan(&matchGames).Error
	} else {
		err = db.Debug().Table("games").Select("schedules.id as scheduled_id, games.created_at, games.set_no, games.status").Joins("LEFT JOIN schedules ON schedules.id = games.schedule_id").Scan(&matchGames).Error
	}

	return matchGames, err
}
