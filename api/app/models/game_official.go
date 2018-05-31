package models

import "time"

// GameOfficials ....
type GameOfficials struct {
	ID          int64      `json:"id" gorm:"AUTO_INCREMENT"`
	GameStatsID int64      `json:"game_stats_id,omitempty"`
	Referee     string     `json:"referee,omitempty"`
	Umpire      string     `json:"umpire,omitempty"`
	Scorer      string     `json:"scorer,omitempty"`
	CreatedAt   time.Time  `json:"created_at,omitempty"`
	UpdatedAt   time.Time  `json:"updated_at,omitempty"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}
