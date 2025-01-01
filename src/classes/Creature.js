export default class Creature {
  constructor(
    name,
    classType,
    level = 1,
    health = 100,
    strength = 10,
    intelligence = 10,
    vitality = 10
  ) {
    // Propriétés de base
    this.class = classType; // Nom de la classe (Paladin, Mage, etc.)
    this.name = name; // Nom de la créature
    this.level = level; // Niveau
    this.health = health; // Points de vie actuels
    this.maxHealth = health; // Points de vie maximum
    this.xp = 0; // Expérience actuelle
    this.skills = ["Coup de base"]; // Compétences connues
    this.armor = 0; // Armure de base
    this.activeArmor = 0; // Armure active (qui inclut les effets temporaires)
    this.statusEffects = []; // Liste des effets de statut actifs

    // Stats principales
    this.strength = strength; // Force
    this.intelligence = intelligence; // Intelligence
    this.vitality = vitality; // Vitalité

    // Propriétés pour le futur
    this.allSkills = []; // Liste complète des compétences débloquables (future feature)
    this.items = []; // Inventaire des objets (future feature)
  }

  // Gagner de l'expérience
  gainXP(amount) {
    this.xp += amount;
    while (this.xp >= this.xpToNextLevel()) {
      this.levelUp();
    }
  }

  // Calculer l'expérience nécessaire pour le prochain niveau
  xpToNextLevel() {
    return this.level * 100; // Exemple : 100 XP par niveau
  }

  // Monter de niveau
  levelUp() {
    this.xp -= this.xpToNextLevel();
    this.level++;
    this.maxHealth += 20 + this.vitality * 2; // Augmentation basée sur la vitalité
    this.maxMana += 10 + this.intelligence * 2;
    this.health = this.maxHealth; // Restaurer la santé
    this.mana = this.maxMana; // Restaurer le mana
    console.log(`${this.name} passe au niveau ${this.level}!`);
  }

  // Méthode pour appliquer un effet de statut
  addStatusEffect(effect) {
    if (effect.onApply) {
      effect.onApply(this); // Appliquer immédiatement l'effet si nécessaire
    }
    this.statusEffects.push(effect);
    console.log(`${this.name} est affecté par ${effect.type} pour ${effect.duration} tours.`);
  }
  

  // Réduire la durée des effets après chaque action
  processStatusEffects() {
    this.statusEffects = this.statusEffects.filter((effect) => {
      effect.applyEffect(this); // Appliquer l'effet
      return effect.reduceDuration(this); // Réduire la durée et retirer si nécessaire
    });
  }
  

  // Subir des dégâts
  takeDamage(amount) {
    const totalArmor = this.armor + this.activeArmor; // Ajouter l'armure active à l'armure de base
    const effectiveDamage = Math.max(0, amount - totalArmor); // Réduction des dégâts par l'armure active
    this.health -= effectiveDamage;
    console.log(
      `${this.name} subit ${effectiveDamage} points de dégâts (réduction d'armure : ${totalArmor}).`
    );
    if (this.health <= 0) {
      console.log(`${this.name} est vaincu.`);
    }
  }

  // Afficher les statistiques
  displayStats() {
    console.log(`${this.name} [${this.class}] - Niveau ${this.level}`);
    console.log(`Santé : ${this.health}/${this.maxHealth}`);
    console.log(`Mana : ${this.mana}/${this.maxMana}`);
    console.log(`Armure : ${this.armor}`);
    console.log(
      `Force : ${this.strength}, Intelligence : ${this.intelligence}, Vitalité : ${this.vitality}`
    );
    console.log(`XP : ${this.xp}/${this.xpToNextLevel()}`);
    console.log(`Compétences : ${this.skills.join(", ")}`);
    console.log(
      `Effets de statut : ${
        this.statusEffects.map((e) => e.type).join(", ") || "Aucun"
      }`
    );
  }
}