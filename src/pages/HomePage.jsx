/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import useStore from "../store/useStore"; // Importer le store

// Components
import Character from "../components/Character";

function Homepage() {
  const {
    team_heroes,
    team_enemies,
    wave,
    log,
    gainXP,
    useSkill,
    spawnEnemies,
    removeDeadEnemies,
  } = useStore();

  // État pour savoir qui attaquer
  const [enemyTarget, setEnemyTarget] = useState(0); // Aucune cible sélectionnée au départ
  const [heroTarget, setHeroTarget] = useState(0); // Aucune cible sélectionnée au départ
  const [menu, setMenu] = useState("attack"); // Définis quel menu secondaire ouvrir
  const [menuDescription, setMenuDescription] = useState(true); // Définis quel menu secondaire ouvrir

  const [hoveredSkillDescription, setHoveredSkillDescription] = useState(""); // Description de la compétence survolée

  // Gérer les actions pour Paladin 1 et Mage 1
  const handleGainXP = (team, heroIndex, amount) => {
    gainXP(team, heroIndex, amount);
  };

  const handleUseSkill = (team, heroIndex, skill) => {
    // Gestion de l'xp
    // Dégâts
    if (skill.type == "damage") {
      if (team_enemies[enemyTarget].health - skill.value < 0) {
        gainXP(
          "heroes",
          heroIndex,
          Math.max(
            team_enemies[enemyTarget].health - skill.value,
            team_enemies[enemyTarget].health
          )
        );
        gainXP("heroes", heroIndex, 100);
      } else if (team_enemies[enemyTarget].health - skill.value == 0) {
        gainXP("heroes", heroIndex, skill.value + 100);
      } else {
        gainXP("heroes", heroIndex, skill.value);
      }
      // Soin
    } else if (skill.type == "heal") {
      let healthDiff =
        team_heroes[heroTarget].maxHealth - team_heroes[heroTarget].health;
      if (healthDiff > 0) {
        if (
          team_heroes[heroTarget].health + skill.value >
          team_heroes[heroTarget].maxHealth
        ) {
          gainXP(
            "heroes",
            heroIndex,
            team_heroes[heroTarget].maxHealth - team_heroes[heroTarget].health
          );
        } else {
          gainXP("heroes", heroIndex, skill.value);
        }
      }
    }
    useSkill(team, heroIndex, skill, enemyTarget);
    removeDeadEnemies();
    team_heroes[heroTarget].availableplay = false;
    if (heroTarget < team_heroes.length - 1) {
      setHeroTarget(heroTarget + 1);
    }
  };

  const handleSelectEnemyTarget = (targetIndex) => {
    setEnemyTarget(targetIndex);
    setMenuDescription(false);
  };

  const handleSelectHeroTarget = (targetIndex) => {
    setHeroTarget(targetIndex);
    setMenuDescription(true);
  };

  const handleSecondaryMenu = (menu) => {
    setMenu(menu);
  };

  const handleEndTurn = () => {
    for (let i = 0; i < team_heroes.length; i++) {
      team_heroes[i].availableplay = true;
    }

    // Met le menu attaque et selectionne le 1er hero
    setMenu("attack");
    handleSelectHeroTarget(0);
    setMenuDescription(false);
    removeDeadEnemies();
    handleEnemyAI();
  };

  // Tour de l'ennemis
  const handleEnemyAI = () => {
    team_enemies.forEach((enemy, enemyIndex) => {
      // Si l'ennemi est vivant et peut jouer
      if (enemy.health > 0) {
        const aliveHeroes = team_heroes.filter(hero => hero.health > 0); // Filtrer les héros vivants
        const targetHeroIndex = Math.floor(Math.random() * aliveHeroes.length); // Choisir un héros aléatoire parmi les héros vivants
        const randomSkillIndex = Math.floor(Math.random() * enemy.skills.length); // Choisir une compétence aléatoire
        const skillToUse = enemy.skills[randomSkillIndex]; // Faire attaquer l'ennemi (ici on suppose que l'ennemi a une méthode "attack")
        useSkill("enemies", enemyIndex, skillToUse, targetHeroIndex);
      }
    });
  };

  // Vérifier si tous les ennemis sont morts
  useEffect(() => {
    // Vérifier si tous les ennemis sont morts
    if (!team_enemies.some((enemy) => enemy.health > 0)) {
      handleEndTurn(); // Fin du tour si tous les ennemis sont morts
      spawnEnemies(); // Appeler spawnEnemies après le rendu
    }
  }, [team_enemies, spawnEnemies]); // Dépendances: appel uniquement quand team_enemies change

  return (
    <main className="homepage">
      <section className="container">
        <section className="game">
          <div>
            <h2> Niveau {wave} </h2>
          </div>

          <section className="game__characters">
            <div className="game__characters__heroes">
              {team_heroes.map((hero, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectHeroTarget(i)}
                  className={`heroes__card ${
                    heroTarget === i ? "selected" : ""
                  }`}
                >
                  <Character character={hero} team="heroes" />
                </button>
              ))}
            </div>
            <div className="game__characters__enemies">
              {team_enemies.map((ennemy, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectEnemyTarget(i)}
                  className={`enemies__card ${
                    enemyTarget === i ? "selected" : ""
                  }`}
                >
                  <Character key={i} character={ennemy} team="enemies" />
                </button>
              ))}
            </div>
          </section>
        </section>
        <section className="action">
          <div className="action__container action__main__menu">
            <button
              onClick={() => handleSecondaryMenu("attack")}
              className={
                team_heroes[heroTarget].availableplay === false
                  ? "unclickable"
                  : ""
              }
            >
              Attaque
            </button>
            <button
              onClick={() => handleSecondaryMenu("object")}
              className={
                team_heroes[heroTarget].availableplay === false
                  ? "unclickable"
                  : ""
              }
            >
              Objets
            </button>
            <button
              onClick={() => {
                handleSecondaryMenu("endturn");
                handleEndTurn();
              }}
            >
              {" "}
              Fin du tour{" "}
            </button>
            <button onClick={() => handleSecondaryMenu("")}> Abandon </button>
          </div>
          <div className="action__container action__secondary__menu">
            {menu === "attack" &&
            team_heroes[heroTarget].availableplay === true ? (
              team_heroes[heroTarget].skills.map((skill, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleUseSkill("heroes", heroTarget, skill);
                    setMenuDescription(!menuDescription);
                  }}
                  onMouseEnter={() => {
                    setHoveredSkillDescription(skill.description);
                    setMenuDescription(true);
                  }}
                >
                  {skill.name}
                </button>
              ))
            ) : menu === "object" ? (
              <button onClick={() => handleGainXP("heroes", heroTarget, 100)}>
                + 100 XP
              </button>
            ) : null}
          </div>
          <div className="action__container action__description">
            {menuDescription
              ? hoveredSkillDescription
              : log.slice(-8).map((msg, i) => <p key={i}> {msg}</p>)}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Homepage;
