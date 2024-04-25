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
	for _, pseudo := range pseudos {
		source := rand.NewSource(time.Now().UnixNano())
		random := rand.New(source)
		randomTTK := 0.01 + rand.Float64()*(1.5)
		var playerUUID string = uuid.New().String()
		password, err := bcrypt.GenerateFromPassword([]byte(pseudo), bcrypt.DefaultCost)
		if err != nil {
			fmt.Println("Failde to hash password")
		}
		DbManager.AddDeleteUpdateDB("INSERT INTO players (playerUUID, email, pseudo, password, timeToKill, numberOfWin, numberOfLoose, numberOfSoloGamePlay) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", playerUUID, pseudo+"@gmail.com", pseudo, string(password), randomTTK, random.Intn(101), random.Intn(101), random.Intn(101))
	}
	fmt.Println("Seed is finished")
}
