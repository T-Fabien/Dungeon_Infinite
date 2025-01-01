import { useState } from "react";
import useStore from "../store/useStore"; // Importer le store

// Components
import Character from "../components/Character";

function Homepage() {
  const { team_heroes, team_enemies, log, gainXP, useSkill } = useStore();

  // État pour savoir qui attaquer
  const [target, setTarget] = useState(0); // Aucune cible sélectionnée au départ
  const [menu, setMenu] = useState(null); // Définis quel menu secondaire ouvrir

  // Gérer les actions pour Paladin 1 et Mage 1
  const handleGainXP = (team, heroIndex, amount) => {
    gainXP(team, heroIndex, amount); // Gagner de l'XP pour Paladin 1
  };

  const handleUseSkill = (team, heroIndex, skill) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSkill(team, heroIndex, skill, target); // Mage 1 utilise "Boule de feu" sur la cible
  };

  const handleSelectTarget = (targetIndex) => {
    // Mettre à jour la cible sélectionnée (Paladin 2 ou Mage 2)
    setTarget(targetIndex);
  };

  const handleSecondaryMenu = (menu) => {
    // Mettre à jour la cible sélectionnée (Paladin 2 ou Mage 2)
    setMenu(menu);
  };

  return (
    <main className="homepage">
      <section className="container">
        <section className="game">
          <h2> Niveau 250</h2>
          <section className="game__characters">
            <Character characterTeamArray={team_heroes} team="heroes" />
            <Character characterTeamArray={team_enemies} team="enemies" />
          </section>
        </section>
        <section className="action">
          <div className="action__container action__main__menu">
            <button onClick={() => handleSecondaryMenu("attack")}>
              Attaque
            </button>
            <button onClick={() => handleSecondaryMenu("object")}>
              Objets
            </button>
            <button onClick={() => handleSecondaryMenu(null)}> Fuite </button>
            <button onClick={() => handleSecondaryMenu(null)}> Abandon </button>
          </div>
          <div className="action__container action__secondary__menu">
            {menu === "attack" &&
              team_heroes[0].skills.map((skill, i) => (
                <button
                  key={i}
                  onClick={() => handleUseSkill("heroes", 0, skill)}
                >
                  {skill}
                </button>
              ))}

            {menu === "object" &&
              team_heroes.map((hero, i) => (
                <button key={i} onClick={() => handleGainXP("heroes", i, 100)}>
                  + 100 XP
                </button>
              ))}
          </div>
          <div className="action__container action__description">
            {menu === "object" &&
              log.slice(-8).map((msg, i) => <p key={i}> {msg}</p>)}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Homepage;
