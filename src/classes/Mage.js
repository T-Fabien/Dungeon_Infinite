import Creature from "./Creature";
import Skill from "./Skill";

export default class Mage extends Creature {
  constructor(name) {
    super(name, "Fire_Mage"); // Appel au constructeur de la classe parent
    this.maxhealth = 80;
    this.skills = [
      new Skill("Boule de Feu", "Envoie une boule feu", 40, "damage"),
    ];
    this.armor = 0;
  }

  gainXP(amount) {
    this.xp += amount;
    while (this.xp >= this.xpToNextLevel()) {
      this.levelUp();
    }
  }

  xpToNextLevel() {
    return this.level * 100; // Par exemple : 100 XP par niveau
  }

  levelUp() {
    this.xp -= this.xpToNextLevel();
    this.maxHealth += 10; // Augmente les PV max
    this.health = this.maxHealth; // Restaurer la santé

    this.level++;

    console.log(`${this.name} passe au niveau ${this.level}!`);
  }
  // Utiliser une compétence
  useSkill(sourceTarget, skillName, targetHero) {

    const skill = this.skills.find((s) => s.name === skillName.name);
    if (!skill) {
      return `${this.name} tente d'utiliser ${skillName}, mais cette compétence n'existe pas.`;
    }

    let result ; 
    if (skill.type !== "damage") {
      result = skill.execute(this, sourceTarget); // Appelle la logique dans la classe `Skill`
    }
    else {
      result = skill.execute(this, targetHero)
    }
    this.processStatusEffects(); // Réduit la durée des effets après l'utilisation
    return result;
  }
}