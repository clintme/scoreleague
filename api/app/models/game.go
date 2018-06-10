package models

import "time"

// Games ....
type Games struct {
	ID         int64      `json:"id" gorm:"AUTO_INCREMENT"`
	ScheduleID int64      `json:"schedule_id,omitempty"`
	SetNO      int64      `json:"set_no,omitempty"`
	HostScore  int64      `json:"host_score,omitempty"`
	GuestScore int64      `json:"guest_score,omitempty"`
	Status     int64      `json:"status,omitempty"`
	CreatedAt  time.Time  `json:"created_at,omitempty"`
	UpdatedAt  time.Time  `json:"updated_at,omitempty"`
	DeletedAt  *time.Time `json:"deleted_at,omitempty"`
}
