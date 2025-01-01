import Creature from "./Creature";
import StatusEffect from "./StatusEffect";

export default class Paladin extends Creature {
  constructor(name) {
    super(name, "Paladin", 1); // Appel au constructeur de la classe parent
    this.health = 120; // Les paladins commencent avec plus de santé
    this.maxHealth = 120;
    this.skills = ["Coup de base", "Lumière sacrée", "Bouclier divin"];
    this.armor = 10; // Le Paladin commence avec de l'armure
  }

  // Vérifier et débloquer des compétences
  unlockSkill() {
    const skillMap = {
      2: "Jugement céleste",
      3: "TEst",
      4: "testee",
      5: "Frappe divine",
    };
    const newSkill = skillMap[this.level] || null;
    if (newSkill) {
      this.skills.push(newSkill);
      console.log(`${this.name} débloque la compétence : ${newSkill}`);
    }
  }

  // Monter de niveau
  levelUp() {
    super.levelUp();
    this.armor += 5; // Bonus spécifique au Paladin
    this.unlockSkill();
  }

  // Utiliser une compétence
  useSkill(skillName, target) {
    switch (skillName) {
      case "Coup de base": {
        const damage = 10 + this.strength * 2; // Force x2 comme dégâts de base
        const damageWithReduction = Math.max(0, damage - (target.armor + target.activeArmor));; // Réduit les dégâts par l'armure
        
        if (target) {
          target.takeDamage(damage);
          this.processStatusEffects(); // Réduit la durée des effets après l'attaque
          return `${this.name} attaque ${target.name}, infligeant ${damageWithReduction} dégâts(réduction d'armure : ${target.armor + target.activeArmor}).`;
        }
        return `${this.name} ne peut pas attaquer sans cible.`;
      }
  
      case "Bouclier divin": {
          const armorBuff = 20 + this.level * 5; // Armure augmentée en fonction du niveau
  
          this.addStatusEffect(
            new StatusEffect("Armure", armorBuff, 3, null, null)
          );
          this.processStatusEffects(); // Réduit la durée des effets après l'attaque
          return `${this.name} utilise Bouclier divin, gagnant ${armorBuff} points d'armure pour 3 tours.`;
        }
      default:
        return `${this.name} tente d'utiliser ${skillName}, mais cette compétence n'est pas implémentée.`;
    }
  }
  
  
  
  
}