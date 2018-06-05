package models

import (
	"errors"
	"time"
)

// Players ....
type Players struct {
	ID        int64      `json:"id" gorm:"AUTO_INCREMENT"`
	Name      string     `json:"name,omitempty"`
	TeamID    int64      `json:"team_id,omitempty"`
	Status    string     `json:"status,omitempty"`
	CreatedAt time.Time  `json:"created_at,omitempty"`
	UpdatedAt time.Time  `json:"updated_at,omitempty"`
	DeletedAt *time.Time `json:"deleted_at,omitempty"`
}

// PlayerTable ...
type PlayerTable struct{}

// Create ...
func (player *Players) Create() (Players, error) {
	if player.ID == 0 {
		var err error

		playerData := PlayerTable{}
		players, err := playerData.GetPlayerByName(player.Name)
		if err == nil && players.ID > 0 {
			return *player, errors.New("Player only allowed to play in one team")
		}

		err = db.Create(player).Error
		if err != nil {
			player.ID = 0
		}

		return *player, err
	}

	return *player, nil
}

// GetPlayerByName ...
func (repo *PlayerTable) GetPlayerByName(name string) (Players, error) {
	var players Players

	err := db.Debug().Where("name = ?", name).Limit(1).First(&players).Error

	return players, err
}

// GetPlayers ...
func GetPlayers() ([]Players, error) {
	var players []Players
	var err error

	// err = db.Debug().Model(&Teams{}).Order("updated_at desc").Scan(&teams).Error
	err = db.Debug().Model(&Players{}).Scan(&players).Error

	return players, err
}
