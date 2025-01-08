import Creature from "./Creature";
import Skill from "./Skill";

export default class Mage extends Creature {
  constructor(name, level, maxHealth = 80) {
    super(name, "Fire_Mage", level); // Appel au constructeur de la classe parent
    this.health = maxHealth;
    this.maxHealth = maxHealth;
    this.skills = [
      new Skill("Boule de Feu", "Envoie une boule feu", 40, "damage"),
    ];
    this.armor = 0;

    // Vérifier et débloquer des compétences
    this.unlockSkill();
  }

  // Vérifier et débloquer des compétences
  unlockSkill() {
    const skillMap = {
      2: new Skill("Mur de Feu", "Envoie un mur de feu", 50, "damage"),
      5: new Skill("Météorite", "Envoie une météorite de feu", 80, "damage"),
    };
    
    // Vérifier pour chaque niveau jusqu'à celui du mage
    for (let i = 2; i <= this.level; i++) {
      if (skillMap[i] && !this.skills.some(skill => skill.name === skillMap[i].name)) {
        this.skills.push(skillMap[i]);
      }
    }
  }

  levelUp() {
    super.levelUp();
    this.armor += 5; // Bonus spécifique au Mage
    this.unlockSkill();
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