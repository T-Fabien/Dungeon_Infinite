import { useState } from "react";
import useStore from "../store/useStore"; // Importer le store

// Components
import Character from "../components/Character";

function Homepage() {
  const { team_heroes, team_enemies, log, gainXP, useSkill } = useStore();

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
    team_heroes[heroTarget].availableplay = false;
  };

  const handleSelectEnemyTarget = (targetIndex) => {
    setEnemyTarget(targetIndex);
  };

  const handleSelectHeroTarget = (targetIndex) => {
    setHeroTarget(targetIndex);
    console.log(menuDescription);
  };

  const handleSecondaryMenu = (menu) => {
    setMenu(menu);
  };

  const handleMenuDescription = () => {
    setMenuDescription(!menuDescription);
  };

  return (
    <main className="homepage">
      <section className="container">
        <section className="game">
          <h2> Niveau 250</h2>
          <section className="game__characters">
            <div className="game__characters__heroes">
              {team_heroes.map((hero, i) => (
                <button key={i} onClick={() => handleSelectHeroTarget(i)}>
                  <Character character={hero} team="heroes" />
                </button>
              ))}
            </div>
            <div className="game__characters__enemies">
              {team_enemies.map((ennemy, i) => (
                <button key={i} onClick={() => handleSelectEnemyTarget(i)}>
                  <Character key={i} character={ennemy} team="enemies" />
                </button>
              ))}
            </div>
          </section>
        </section>
        <section className="action">
          <div className="action__container action__main__menu">
            {team_heroes[heroTarget].availableplay === true ? (
              <button onClick={() => handleSecondaryMenu("attack")}>
                Attaque
              </button>
            ) : (
              <button
                onClick={() => handleSecondaryMenu("attack")}
                className="unclickable"
              >
                Attaque
              </button>
            )}
            <button onClick={() => handleSecondaryMenu("object")}>
              Objets
            </button>
            <button onClick={() => handleSecondaryMenu("")}> Fuite </button>
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
                  onMouseEnter={() =>
                  {
                    setHoveredSkillDescription(skill.description)
                    setMenuDescription(true);
                  }
                  }
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
            { menuDescription
              ? hoveredSkillDescription
              : log.slice(-8).map((msg, i) => <p key={i}> {msg}</p>)}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Homepage;
