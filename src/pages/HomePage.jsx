import { useState, useEffect } from "react";
import useStore from "../store/useStore"; // Importer le store

// Components
import Character from "../components/Character";

function Homepage() {
  const {
    team_heroes,
    team_enemies,
    incrementTurn,
    turn,
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSkill(team, heroIndex, skill, enemyTarget);

    // Gestion de l'xp
    if(skill.type == "damage"){
      if(team_enemies[enemyTarget].health <= 0){
        gainXP("heroes", heroIndex, skill.value);
        gainXP("heroes", heroIndex, 100);
      }
      else {
        gainXP("heroes", heroIndex, skill.value);
      }
    } else if (skill.type == "heal"){
      gainXP("heroes", heroIndex, skill.value);
    }

    removeDeadEnemies();
    team_heroes[heroTarget].availableplay = false;

    if(heroTarget < team_heroes.length - 1) {
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
    incrementTurn();
    for (let i = 0; i < team_heroes.length; i++) {
      team_heroes[i].availableplay = true;
    }

    // Met le menu attaque et selectionne le 1er hero
    setMenu("attack");
    handleSelectHeroTarget(0);
    setMenuDescription(false);
    removeDeadEnemies();
  };


  // Vérifier si tous les ennemis sont morts
useEffect(() => {
  // Vérifier si tous les ennemis sont morts
  if (!team_enemies.some(enemy => enemy.health > 0)) {
    handleEndTurn(); // Fin du tour si tous les ennemis sont morts
    spawnEnemies(); // Appeler spawnEnemies après le rendu
  }
}, [team_enemies, spawnEnemies]); // Dépendances: appel uniquement quand team_enemies change
 
  return (
    <main className="homepage">
      <section className="container">
        <section className="game">
          <div>
            <p>Tour : {turn} </p>
            <h2> Niveau {wave} </h2>
          </div>

          <section className="game__characters">
            <div className="game__characters__heroes">
              {team_heroes.map((hero, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectHeroTarget(i)}
                  className={`heroes__card ${heroTarget === i ? 'selected' : ''}`}
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
                  className={`enemies__card ${enemyTarget === i ? 'selected' : ''}`}
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
