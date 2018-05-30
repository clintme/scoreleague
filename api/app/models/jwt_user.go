package models

import (
	"time"

	"github.com/XanderDwyl/scoreleague/api/app/config"
	jwt "github.com/dgrijalva/jwt-go"
)

// JWTUser ...
type JWTUser struct {
	ID          int64      `json:"id"  gorm:"AUTO_INCREMENT"`
	UserID      int64      `json:"user_id" gorm:"unique_index"`
	ExpiresAt   int64      `json:"expires_at,omitempty"`
	CreatedAt   *time.Time `json:"created_at,omitempty"`
	UpdatedAt   *time.Time `json:"updated_at,omitempty"`
	AccessToken string     `json:"access_token,omitempty"`
	Email       string     `json:"email,omitempty"`
	jwt.StandardClaims
}

// CreateJWToken ...
func (u *JWTUser) CreateJWToken() (string, error) {
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), u)
	tokenString, err := token.SignedString([]byte(config.GetJWTSalt()))

	return tokenString, err
}
