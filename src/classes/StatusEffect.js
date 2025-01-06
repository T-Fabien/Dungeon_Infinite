export default class StatusEffect {
  constructor(type, amount, duration, onApply = null, onEnd = null) {
    if (!type || typeof type !== "string") {
      throw new Error("Un type valide est requis pour StatusEffect.");
    }
    if (typeof amount !== "number") {
      throw new Error(
        "Un montant numérique valide est requis pour StatusEffect."
      );
    }
    if (typeof duration !== "number" || duration <= 0) {
      throw new Error("La durée doit être un nombre supérieur à zéro.");
    }

    this.type = type; // Type d'effet (ex: "Poison", "Armure")
    this.amount = amount; // Valeur de l'effet
    this.duration = duration; // Nombre de tours
    this.onApply = onApply; // Fonction optionnelle à l'application
    this.onEnd = onEnd; // Fonction optionnelle à la fin
  }

  // Appliquer l'effet chaque tour
  applyEffect(target) {
    if (!target || typeof target.takeDamage !== "function") {
      throw new Error("La cible doit être une instance valide de Creature.");
    }
    switch (this.type) {
      case "poison":
        target.takeDamage(this.amount);
        console.log(`${target.name} subit ${this.amount} dégâts de poison.`);
        break;

      case "shield":
        target.activeArmor = this.amount;
        console.log(
          `${target.name} gagne ${this.amount} d'armure temporaire pendant 3 tours.`
        );
        break;

      case "heal":
        console.log(
          `${target.name} se soigne de ${
            Math.min(target.maxHealth, target.health + this.amount) - target.health
          } points de vie.`
        );
        target.health = Math.min(target.maxHealth, target.health + this.amount);
        break;

      default:
        console.log(`Effet inconnu : ${this.type}.`);
    }
  }

  // Réduire la durée de l'effet
  reduceDuration(target) {
    // Si la durée est terminée, appliquer la fonction de fin (onEnd) si elle existe
    if (this.duration <= 0) {
      if (this.type === "Armure") {
        target.activeArmor -= this.amount; // Retirer l'armure temporaire à la fin de l'effet
        console.log(
          `${target.name} perd ${this.amount} points d'armure temporaire.`
        );
      }

      if (this.onEnd) {
        this.onEnd(target); // Appliquer les effets de fin, comme la réduction d'armure, etc.
      }
      console.log(`L'effet ${this.type} sur ${target.name} a pris fin.`);
      return false; // L'effet est terminé et doit être retiré
    }
    this.duration--; // Réduire la durée de l'effet à chaque tour

    return true; // L'effet reste actif
  }
}
