import StatusEffect from "./StatusEffect";

export default class Skill {
  constructor(name, description, value, type, targetType = "single") {
    this.name = name;
    this.description = description;
    this.value = value;
    this.type = type;
    this.targetType = targetType;
  }
  execute(caster, target) {
    switch (this.type) {
      case "damage":
        if (target) {
          const damage = Math.max(
            0,
            this.value - target.armor - target.activeArmor
          );
          target.takeDamage(this.value);
          return `${caster.name} utilise ${this.name} sur ${target.name}, infligeant ${damage} dégâts.`;
        }
        return `${this.name} nécessite une cible.`;
      case "heal":
        if (target) {
          const healedValue =
            Math.min(target.maxHealth, target.health + this.value) -
            target.health;
          target.heal(this.value);
          return `${caster.name} utilise ${this.name},se soignant de ${healedValue} points de vie.`;
        }
        return `${caster.name} utilise ${this.name} sur ${target.name}, infligeant ${this.value} dégâts.`;
      case "shield":
        if (target) {
          target.addStatusEffect(new StatusEffect(this.type, this.value, 3));
          return `${caster.name} utilise ${this.name} sur ${target.name}, gagnant ${this.value} d'armure.`;
        }
    }
  }
}
