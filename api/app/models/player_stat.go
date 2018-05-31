package models

import "time"

// PlayerStats ....
type PlayerStats struct {
	ID        int64      `json:"id" gorm:"AUTO_INCREMENT"`
	GameID    int64      `json:"game_id,omitempty"`
	PlayerID  int64      `json:"player_id,omitempty"`
	Score     int64      `json:"score,omitempty"`
	CreatedAt time.Time  `json:"created_at,omitempty"`
	UpdatedAt time.Time  `json:"updated_at,omitempty"`
	DeletedAt *time.Time `json:"deleted_at,omitempty"`
}
