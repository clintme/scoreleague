package models

import (
	"errors"
	"time"
)

// Teams ....
type Teams struct {
	ID          int64      `json:"id" gorm:"AUTO_INCREMENT"`
	Name        string     `json:"name,omitempty"`
	Captain     string     `json:"captain,omitempty"`
	Description string     `json:"description,omitempty"`
	Payment     int64      `json:"payment,omitempty"`
	Status      int64      `json:"status,omitempty" sql:"default:0"`
	CreatedAt   time.Time  `json:"created_at,omitempty"`
	UpdatedAt   time.Time  `json:"updated_at,omitempty"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}

// TeamTable ...
type TeamTable struct{}

// Create ...
func (team *Teams) Create() (Teams, error) {
	if team.ID == 0 {
		var err error

		teamData := TeamTable{}
		teams, err := teamData.GetTeamByName(team.Name)
		if err == nil && teams.ID > 0 {
			return *team, errors.New("Team name is already exist")
		}

		err = db.Create(team).Error
		if err != nil {
			team.ID = 0
		}

		return *team, err
	}

	return *team, nil
}

// GetTeamByName ...
func (repo *TeamTable) GetTeamByName(name string) (Teams, error) {
	var teams Teams

	err := db.Debug().Where("name = ?", name).Limit(1).First(&teams).Error

	return teams, err
}

// GetTeams ...
func GetTeams(ID int64) ([]Teams, error) {
	var teams []Teams
	var err error

	if ID == 0 {
		err = db.Debug().Model(&Teams{}).Scan(&teams).Error
	} else {
		err = db.Debug().Model(&Teams{}).Where("id=?", ID).Scan(&teams).Error
	}

	return teams, err
}
