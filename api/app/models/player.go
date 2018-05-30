package models

import "time"

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
