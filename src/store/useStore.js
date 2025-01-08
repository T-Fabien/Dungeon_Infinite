import { create } from "zustand";

// Classes
import Paladin from "../classes/Paladin";
import Mage from "../classes/Mage";

// Boss par vague
const bossWaves = {
  10: new Mage("Boss Paladin", 200),
  20: new Paladin("Boss Mage", 300),
  30: new Paladin("Mega Boss", 500),
};

const useStore = create((set) => ({
  // Équipes
  team_heroes: [
    new Paladin("Paladin 1"),
    new Mage("Mage 1"),
    new Paladin("Paladin 2"),
    new Mage("Mage 2"),
    new Mage("Mage 3"),
  ],
  team_enemies: [
    new Mage("Mage 1"),
  ],
  wave: 1,
  log: [],

  // Gagner de l'expérience
  gainXP: (team, heroIndex, amount) => {
    set((state) => {
      const targetTeam =
        team === "heroes" ? state.team_heroes : state.team_enemies;
      const targetHero = targetTeam[heroIndex];

      const initialLevel = targetHero.level;
      targetHero.gainXP(amount);

      const levelUpMessage =
        targetHero.level > initialLevel
          ? `et atteint le niveau ${targetHero.level}`
          : "";

      return {
        log: [
          ...state.log,
          `${targetHero.name} gagne ${amount} XP ${levelUpMessage}.`,
        ],
        [team === "heroes" ? "team_heroes" : "team_enemies"]: [...targetTeam],
      };
    });
  },

  // Utiliser une compétence
  useSkill: (team, heroIndex, skillName, targetIndex = null) => {
    set((state) => {
      const sourceTeam =
        team === "heroes" ? state.team_heroes : state.team_enemies;
      const targetTeam =
        team === "heroes" ? state.team_enemies : state.team_heroes;

      const sourceHero = sourceTeam[heroIndex];
      const targetHero = targetIndex !== null ? targetTeam[targetIndex] : null;

      // Vérifier si la compétence existe et est utilisable
      if (!sourceHero.skills.includes(skillName)) {
        return {
          log: [
            ...state.log,
            `${sourceHero.name} tente d'utiliser ${skillName}, mais ne connaît pas ce sort.`,
          ],
        };
      }

      // Effectuer l'action en fonction de la compétence
      const logMessage = sourceHero.useSkill(sourceHero, skillName, targetHero);

      // Mettre à jour les états
      return {
        log: [...state.log, logMessage],
        team_heroes: [...state.team_heroes],
        team_enemies: [...state.team_enemies],
      };
    });
  },

  // Subir des dégâts
  takeDamage: (team, heroIndex, amount) => {
    set((state) => {
      const targetTeam =
        team === "heroes" ? state.team_heroes : state.team_enemies;
      const targetHero = targetTeam[heroIndex];

      targetHero.takeDamage(amount);

      return {
        log: [
          ...state.log,
          `${targetHero.name} subit ${amount} points de dégâts.`,
        ],
        [team === "heroes" ? "team_heroes" : "team_enemies"]: [...targetTeam],
      };
    });
  },


  // Fonction pour supprimer les ennemis morts
  removeDeadEnemies: () => {
    set((state) => {
      const aliveEnemies = state.team_enemies.filter((enemy) => enemy.health > 0);      
      return {
        team_enemies: aliveEnemies,
      };
    });
  },

  // Gerer le spawn des ennemis
  spawnEnemies: () => {
    set((state) => {
      let newEnemies = [];
      const currentWave = state.wave + 1; // Vague actuelle après incrémentation
  
      // Vérifier si la vague a un boss
      if (bossWaves[currentWave]) {
        // Ajouter le boss à l'équipe ennemie
        newEnemies.push(bossWaves[currentWave]);
      } else {
        let enemyCount = 1 + Math.floor(currentWave / 10); // Limiter à 5 ennemis max par vague
  
        // Gérer les vagues de 0 à 10 (uniquement des Mages)
        if (currentWave <= 10) {
          for (let i = 0; i < enemyCount; i++) {
            newEnemies.push(new Mage(`Mage Enemy : ${i + 1}`, Math.floor(currentWave / 10) + 1 ,100 + currentWave * 5));
          }
        }
  
        // Gérer les vagues de 10 à 20 (uniquement des Paladins)
        else if (currentWave <= 20) {
          for (let i = 0; i < enemyCount; i++) {
            newEnemies.push(new Paladin(`Paladin ${i + 1} (Wave ${currentWave})`));
          }
        }
  
        // Gérer les vagues de 20+ (30% Mage, 70% Paladin)
        else {
          for (let i = 0; i < enemyCount; i++) {
            const randomValue = Math.random(); // Valeur aléatoire entre 0 et 1
  
            // 30% de chance pour un Mage et 70% pour un Paladin
            if (randomValue < 0.3) {
              newEnemies.push(new Mage(`Mage ${i + 1} (Wave ${currentWave})`));
            } else {
              newEnemies.push(new Paladin(`Paladin ${i + 1} (Wave ${currentWave})`));
            }
          }
        }
      }
  
      // Retourner l'état mis à jour
      return {
        team_enemies: newEnemies,
        wave: currentWave,
        log: [
          ...state.log,
          `Vague ${currentWave} : ${newEnemies.length} ennemis générés !`,
        ],
      };
    });
  },
  
}));

export default useStore;
