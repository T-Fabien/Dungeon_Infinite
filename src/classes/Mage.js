export default class Mage {
  constructor(name) {
    this.class = "Fire_Mage";
    this.name = name;
    this.level = 1;
    this.health = 80;
    this.xp = 0;
    this.skills = ["Boule de feu"];
    this.maxHealth = 80;
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

  useSkill(skillName, target) {
    if (!this.skills.includes(skillName)) {
      console.log(`${this.name} ne connaît pas cette compétence.`);
      return;
    }

    switch (skillName) {
      case "Boule de feu":
        console.log(`${this.name} utilise Boule de feu sur ${target.name}!`);
        target.takeDamage(30); // Inflige des dégâts au target
        break;
      default:
        console.log(`Compétence ${skillName} non implémentée.`);
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} subit ${amount} points de dégâts.`);
    if (this.health <= 0) {
      console.log(`${this.name} est vaincu.`);
    }
  }
}