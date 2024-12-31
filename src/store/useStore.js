import { create } from "zustand";

// Classes
import Paladin from "../classes/Paladin";
import Mage from "../classes/Mage";

const useStore = create((set) => ({
  // Équipes
  team_heroes: [
    new Mage("Mage 1"),
    new Paladin("Paladin 1"),
  ],
  team_enemies: [
    new Paladin("Paladin 2"),
    new Mage("Mage 2"),
  ],
  log: [],

  // Gagner de l'expérience
  gainXP: (team, heroIndex, amount) => {
    set((state) => {
      const targetTeam = team === "heroes" ? state.team_heroes : state.team_enemies;
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
      const sourceTeam = team === "heroes" ? state.team_heroes : state.team_enemies;
      const targetTeam = team === "heroes" ? state.team_enemies : state.team_heroes;

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
      const logMessage = sourceHero.useSkill(skillName, targetHero);

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
      const targetTeam = team === "heroes" ? state.team_heroes : state.team_enemies;
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
}));

export default useStore;