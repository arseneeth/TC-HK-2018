package main

import (
	"errors"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/caarlos0/env"
	"github.com/dgrijalva/jwt-go"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	auth_storage "github.com/arsenyjin/TC-HK-2018/smartcontract"
)

const EXP = 72

type AppConfig struct {
	Port        string `env:"PORT,required"`
	Secret      string `env:"SECRET,required"`
	Key         string `env:"KEY,required"`
	Node        string `env:"NODE,required"`
	AuthStorage string `env:"AUTHSTORAGE,required"`
	Gas         uint64 `env:"GAS,required"`
}

type User struct {
	Name   string `json:"name"`
	Wallet string `json:"wallet"`
}

type LoginUser struct {
	Name      string `json:"name"`
	Hash      string `json:"hash`
	Signature string `json:"signature`
}

func register(c echo.Context) error {
	user := new(User)
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "invalid json" + err.Error(),
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
	var name [32]byte
	copy(name[:], []byte(user.Name))

	tx, err := auth_storage_instance.SignUp(&bind.TransactOpts{
		From:     auth.From,
		Signer:   auth.Signer,
		GasLimit: config.Gas,
	}, name, wallet)
	if err != nil {
		return c.JSON(http.StatusConflict, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, tx.Hash().Hex())
}

func login(c echo.Context) error {
	login_user := new(LoginUser)
	if err := c.Bind(login_user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "invalid json",
		})
	}

	if login_user.Name == "" || login_user.Signature == "" || login_user.Hash == "" {
		return c.JSON(http.StatusUnprocessableEntity, map[string]string{
			"error": "invalid user details",
		})
	}

	log.Println("login_user:", login_user)

	config, err := getConfig(c)
	if err != nil {
		log.Fatal(err)
	}

	blockchain, err := ethclient.Dial(config.Node)
	if err != nil {
		log.Fatalf("unable to connect to network:%v\n", err)
	}

	auth_storage_instance, err := auth_storage.NewAuthStorage(common.HexToAddress(config.AuthStorage), blockchain)
	if err != nil {
		log.Fatalf("failed to instantiate a contract: %v", err)
	}

	var name [32]byte
	copy(name[:], []byte(login_user.Name))

	wallet_hex, err := auth_storage_instance.TestSignIn(&bind.CallOpts{}, name)
	if err != nil {
		return c.JSON(http.StatusConflict, map[string]string{
			"error": err.Error(),
		})
	}

	//---------------------------------------------------
	// publicKeyBytes := crypto.FromECDSAPub(publicKeyECDSA)
	// data := []byte("hello")
	// hash := crypto.Keccak256Hash(data)
	// fmt.Println(hash.Hex()) // 0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8
	//
	// sigPublicKey, err := crypto.Ecrecover(hash.Bytes(), signature)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	//
	// matches := bytes.Equal(sigPublicKey, publicKeyBytes)
	// fmt.Println(matches) // true
	//---------------------------------------------------

	signatureWithNoRecoverID := login_user.Signature[:len(login_user.Signature)-1] // remove recovery ID
	verified := crypto.VerifySignature(wallet_hex.Bytes(), []byte(login_user.Hash), []byte(signatureWithNoRecoverID))
	if !verified {
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"error": "unauthorized",
		})
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = login_user.Name
	claims["exp"] = time.Now().Add(time.Hour * EXP).Unix()

	t, err := token.SignedString([]byte(config.Secret))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token": t,
	})
}

func restricted(c echo.Context) error {
	return c.String(http.StatusOK, "secret page")
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

	api_v1 := e.Group("/api/v1")
	api_v1.POST("/register", register)
	api_v1.POST("/login", login)

	users := api_v1.Group("/users")
	users.Use(middleware.JWT([]byte(config.Secret)))
	users.GET("/account", restricted)

	e.Logger.Fatal(e.Start(":" + config.Port))
}
