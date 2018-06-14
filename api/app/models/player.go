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

// PlayerWithTeam ...
type PlayerWithTeam struct {
	ID        int64      `json:"id"`
	Name      string     `json:"name,omitempty"`
	TeamID    int64      `json:"team_id,omitempty"`
	Status    string     `json:"status,omitempty"`
	TeamName  string     `json:"team_name,omitempty"`
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

		err = db.Debug().Create(player).Error
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
func GetPlayers(TeamID int64) ([]PlayerWithTeam, error) {
	// var players []Players
	var playerWithTeam []PlayerWithTeam
	var err error

	if TeamID > 0 {
		err = db.Debug().Model(&Players{}).Where("team_id=?", TeamID).Scan(&playerWithTeam).Error
	} else {
		err = db.Debug().Table("players").Select("players.id, players.name, players.team_id, players.status, teams.name as team_name").Joins("LEFT JOIN teams ON teams.id = players.team_id").Scan(&playerWithTeam).Error
	}

	return playerWithTeam, err
}
