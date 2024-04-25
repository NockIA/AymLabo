package bdd

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func Seeder() {
	fmt.Println("Seed in progress")
	password, err := bcrypt.GenerateFromPassword([]byte("azertyuiop"), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Failde to hash password")
	}
	DbManager.AddDeleteUpdateDB("INSERT INTO players (playerUUID, email, pseudo, password) VALUES (?, ?, ?, ?);", uuid.New().String(), "testAccountForDev@gmail.com", "t", string(password))
	pseudos := []string{
		"ShadowBlade", "CyberPulse", "PhoenixRider", "NeonStrike", "MysticFury",
		"QuantumSpecter", "SkyRogue", "BlazeRunner", "DarkVoyager", "ThunderCaster",
		"RapidFire", "IceFang", "StormChaser", "SoulReaper", "EternalKnight",
		"TechNinja", "DragonSlayer", "GhostPirate", "SilverWing", "LunarGuardian",
		"TacticalAssassin", "VenomShadow", "WildWolf", "ShadowPhoenix", "BladeMaster",
		"CyberNinja", "Firestorm", "NeonNemesis", "MysticHunter", "StarStriker",
		"StormSorcerer", "FrostBite", "DarkKnight", "GhostRecon", "SpectralBlade",
		"Thunderbolt", "VortexAssassin", "IronClad", "SonicSamurai", "InfernoFury",
		"PlasmaPilot", "NightmareNinja", "OmegaOps", "Blackout", "CrusaderClash",
		"VoidVoyager", "ApexPredator",
	}
	images := []string{"bear.png", "panda.png", "rabbit.png"}
	for _, pseudo := range pseudos {
		source := rand.NewSource(time.Now().UnixNano())
		random := rand.New(source)
		randomIndex := rand.Intn(len(images))
		randomKillPerSeconde := 1 + rand.Float64()*(5)
		randomNumberOfWin := random.Intn(101)
		randomNumberOfLoose := random.Intn(101)
		randomNumberOfSoloGamePlay := random.Intn(101)
		randomTotalScore := (randomNumberOfWin + randomNumberOfLoose + randomNumberOfSoloGamePlay) * (500 + random.Intn(1500))
		var playerUUID string = uuid.New().String()
		password, err := bcrypt.GenerateFromPassword([]byte(pseudo), bcrypt.DefaultCost)
		if err != nil {
			fmt.Println("Failde to hash password")
		}
		DbManager.AddDeleteUpdateDB(`
			INSERT INTO players 
			(playerUUID, email, pseudo, password, killPerSeconde, numberOfWin, numberOfLoose, numberOfSoloGamePlay, avgAccuracy, totalScore, avatarProfile, numberOfGameWithStrike, bestStrike) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
		`, playerUUID, pseudo+"@gmail.com", pseudo, string(password), randomKillPerSeconde, randomNumberOfWin, randomNumberOfLoose, randomNumberOfSoloGamePlay, random.Intn(101), randomTotalScore, images[randomIndex], randomNumberOfSoloGamePlay+randomNumberOfLoose, random.Intn(75))
	}
	fmt.Println("Seed is finished")
}
