package main

import (
	"errors"
	"log"
	"net/http"
	"strings"

	"github.com/caarlos0/env"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	// "github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	// "github.com/dgrijalva/jwt-go"
	// "golang.org/x/crypto/bcrypt"

	auth_storage "github.com/arsenyjin/TC-HK-2018/smartcontract"
)

const EXP = 72

type AppConfig struct {
	Port        string `env:"PORT,required"`
	Secret      string `env:"SECRET,required"`
	Key         string `env:"KEY,required"`
	Node        string `env:"NODE,required"`
	AuthStorage string `env:"AUTHSTORAGE,required"`
}

type User struct {
	Name   string `json:"name"`
	Wallet string `json:"wallet"`
}

func register(c echo.Context) error {
	user := new(User)
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "invalid json",
		})
	}

	if user.Name == "" || user.Wallet == "" {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "invalid user details",
		})
	}

	config, err := getConfig(c)
	if err != nil {
		log.Fatal(err)
	}

	blockchain, err := ethclient.Dial(config.Node)
	if err != nil {
		log.Fatalf("unable to connect to network:%v\n", err)
	}

	auth, err := bind.NewTransactor(strings.NewReader(config.Key), config.Secret)
	if err != nil {
		log.Fatalf("failed to create authorized transactor: %v", err)
	}

	auth_storage_instance, err := auth_storage.NewAuthStorage(common.HexToAddress(config.AuthStorage), blockchain)
	if err != nil {
		log.Fatalf("failed to instantiate a contract: %v", err)
	}

	wallet := common.HexToAddress(user.Wallet)
	// "DAI" as [32]bytes
	// symbol := "0x686573"
	// symbol_hex, _ := hexutil.Decode(symbol)
	// var token_symbol [32]byte
	// copy(token_symbol[:], symbol_hex)
	// name_hex, _ := hexutil.Decode(user.Name)
	var name [32]byte
	// copy(name[:], name_hex)
	copy(name[:], []byte(user.Name))

	log.Println("----------------------")
	log.Println("name:", name)
	log.Println("wallet:", wallet)
	log.Println("----------------------")

	register_res, err := auth_storage_instance.SignUp(&bind.TransactOpts{
		From:     auth.From,
		Signer:   auth.Signer,
		GasLimit: 100000,
	}, name, wallet)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("register result:", register_res)

	return c.JSON(http.StatusOK, "register - ok")

	// 	return c.JSON(http.StatusConflict, map[string]string{
	// 		"error": "user exists",
	// 	})
}

func login(c echo.Context) error {
	u := new(User)
	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "invalid json",
		})
	}

	if u.Name == "" || u.Wallet == "" {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "invalid user details",
		})
	}

	log.Println(u)

	return c.JSON(http.StatusOK, "login - ok")
}

func getConfig(c echo.Context) (*AppConfig, error) {
	config, ok := c.Get("config").(AppConfig)
	if !ok {
		return nil, errors.New("no config in context")
	}
	return &config, nil
}

func setConfig(config AppConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("config", config)
			next(c)
			return nil
		}
	}
}

func main() {
	config := AppConfig{}
	err := env.Parse(&config)
	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	e.Use(setConfig(config))

	api := e.Group("/api/v1")
	api.POST("/register", register)
	api.POST("/login", login)

	// user := api.Group("/user")
	// user.Use(middleware.JWT([]byte(secret)))
	// user.GET("/account", account)

	e.Logger.Fatal(e.Start(":" + config.Port))
}
