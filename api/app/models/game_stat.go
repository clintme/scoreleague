package models

import "time"

// GameStats ....
type GameStats struct {
	ID         int64      `json:"id" gorm:"AUTO_INCREMENT"`
	GameID     int64      `json:"game_id,omitempty"`
	SetNO      int64      `json:"set_no,omitempty"`
	HostScore  int64      `json:"host_score,omitempty"`
	GuestScore int64      `json:"guest_score,omitempty"`
	Status     int64      `json:"status,omitempty"`
	CreatedAt  time.Time  `json:"created_at,omitempty"`
	UpdatedAt  time.Time  `json:"updated_at,omitempty"`
	DeletedAt  *time.Time `json:"deleted_at,omitempty"`
}
