package models

import "time"

// Schedules ....
type Schedules struct {
	ID            int64      `json:"id" gorm:"AUTO_INCREMENT"`
	HostID        string     `json:"host_id,omitempty"`
	GuestID       string     `json:"guest_id,omitempty"`
	ScheduledDate time.Time  `json:"scheduled_date,omitempty"`
	Status        int64      `json:"status,omitempty"`
	CreatedAt     time.Time  `json:"created_at,omitempty"`
	UpdatedAt     time.Time  `json:"updated_at,omitempty"`
	DeletedAt     *time.Time `json:"deleted_at,omitempty"`
}
