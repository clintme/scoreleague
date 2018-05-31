package models

import "time"

// Games ....
type Games struct {
	ID        int64      `json:"id" gorm:"AUTO_INCREMENT"`
	Host      string     `json:"host,omitempty"`
	Guest     string     `json:"guest,omitempty"`
	Status    int64      `json:"status,omitempty"`
	CreatedAt time.Time  `json:"created_at,omitempty"`
	UpdatedAt time.Time  `json:"updated_at,omitempty"`
	DeletedAt *time.Time `json:"deleted_at,omitempty"`
}
