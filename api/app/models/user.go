package models

import (
	"errors"
	"fmt"
	"regexp"
	"time"

	"github.com/XanderDwyl/scoreleague/api/app/config"
	jwt "github.com/dgrijalva/jwt-go"
)

var emailRegex *regexp.Regexp

func init() {
	emailRegex, _ = regexp.Compile(`^[^@]+@[^@]+$`)
}

// User ....
type User struct {
	ID                int64      `gorm:"AUTO_INCREMENT" json:"id"`
	Email             string     `gorm:"type:varchar(130);unique_index" json:"email,omitempty"`
	Password          string     `json:"password,omitempty"`
	VerificationToken string     `json:"verification_token,omitempty"`
	CreatedAt         *time.Time `json:"created_at,omitempty"`
	UpdatedAt         *time.Time `json:"updated_at,omitempty"`
	DeletedAt         *time.Time `json:"deleted_at,omitempty"`
}

// LoginRequest ...
type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// UserTable ...
type UserTable struct{}

// Create ...
func (u *User) Create() (User, error) {
	if u.ID == 0 {
		minPasswordLen := 6
		if u.Password == "" || len(u.Password) < minPasswordLen {
			return *u, fmt.Errorf("Password must have %d characters", minPasswordLen)
		}

		var err error
		u.Email, err = sanitizeEmail(u.Email)
		if err != nil {
			return *u, err
		}

		userData := UserTable{}
		user, err := userData.GetUserByEmail(u.Email)
		if err == nil && user.ID > 0 {
			return *u, errors.New("Email already exist")
		}

		origPassword := u.Password
		u.Password = hashedPassword(u.Password)
		err = db.Create(u).Error
		if err != nil {
			u.ID = 0
			u.Password = origPassword
		}

		return *u, err
	}

	return *u, nil
}

// GetUserByEmail ...
func (repo *UserTable) GetUserByEmail(email string) (User, error) {
	var user User

	err := db.Debug().Where("email = ?", email).Limit(1).First(&user).Error

	return user, err
}

// Login ...
func (u *LoginRequest) Login() (User, error) {
	var user User
	var err error

	err = db.Debug().Where("email = ?", u.Email).Limit(1).First(&user).Error
	if err != nil {
		return user, errors.New("The username you entered doesn't belong to an account. Please check your username and try again.")
	}

	err = db.Debug().Where("email = ?", u.Email).Where("password = ?", hashedPassword(u.Password)).Limit(1).First(&user).Error
	if err != nil {
		return user, errors.New("Sorry, your password is incorrect. Please double-check your password.")
	}

	return user, err
}

// CreateJWToken ...
func (u *User) CreateJWToken() (string, error) {
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), &JWTUser{
		ID:        u.ID,
		Email:     u.Email,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	})

	tokenString, err := token.SignedString([]byte(config.GetJWTSalt()))

	return tokenString, err
}
