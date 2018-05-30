package models

import "time"

// Games ....
type Games struct {
	ID        int64      `json:"id" gorm:"AUTO_INCREMENT"`
	Host      int64      `json:"host,omitempty"`
	Guest     int64      `json:"guest,omitempty"`
	Winner    int64      `json:"winner,omitempty"`
	CreatedAt time.Time  `json:"created_at,omitempty"`
	UpdatedAt time.Time  `json:"updated_at,omitempty"`
	DeletedAt *time.Time `json:"deleted_at,omitempty"`
}
