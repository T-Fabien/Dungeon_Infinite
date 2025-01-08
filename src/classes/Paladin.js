import Creature from "./Creature";
import Skill from "./Skill";
export default class Paladin extends Creature {
  constructor(name, maxHealth = 120) {
    super(name, "Paladin"); // Appel au constructeur de la classe parent
    this.health = maxHealth;
    this.maxHealth = maxHealth;
    this.skills = [
      new Skill("Coup de base", "Donne un coup d'épée", 30, "damage"),
      new Skill("Lumière sacrée", "On sait pas", 20, "heal"),
      new Skill("Bouclier divin", "Se donne 30 de shield pendant 3 tour", 30, "shield"),
    ];
    this.armor = 10; // Le Paladin commence avec de l'armure
  }

  // Vérifier et débloquer des compétences
  unlockSkill() {
    const skillMap = {
      2: new Skill("Jugement Céleste", "Donne un coup d'épée", 30, "damage"),
      5: new Skill("Frappe Divine", "Donne un coup d'épée", 30, "damage"),
    };
    const newSkill = skillMap[this.level] || null;
    if (newSkill) {
      this.skills.push(newSkill);
      console.log(`${this.name} débloque la compétence : ${newSkill.name}`);
    }
  }

  // Monter de niveau
  levelUp() {
    super.levelUp();
    this.armor += 5; // Bonus spécifique au Paladin
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