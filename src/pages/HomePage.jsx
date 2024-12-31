import { useState } from "react";
import useStore from "../store/useStore"; // Importer le store

import castle from "../assets/castle.png";
import paladins_1 from "../assets/paladins_1.png";
import paladins_2 from "../assets/paladins_2.png";

import fire_mage from "../assets/fire_mage.png";

function Homepage() {
  const { team_heroes, team_enemies, log, gainXP, useSkill } =
    useStore();

  // État pour savoir qui attaquer
  const [target, setTarget] = useState(0); // Aucune cible sélectionnée au départ

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

  return (
    <main className="homepage">
      <section className="game">
        <img src={castle} className="castle" alt="" />
        {/* Team Heroes */}

        <section className="heroes">
          {team_heroes.map((hero, index) => (
            <div key={index}>
              {hero.class === "Paladin" && <img src={paladins_1} alt="" />}
              {hero.class === "Fire_Mage" && <img src={fire_mage} alt="" />}
              <h2>{hero.name}</h2>
              <p>Level : {hero.level}</p>
              <p>
                Xp : {hero.xp} / {hero.level * 100}
              </p>
              <p>
                HP: {hero.health} / {hero.maxHealth}
              </p>
              <p>
                Mana: {hero.mana} / {hero.maxMana}
              </p>
              <button onClick={() => handleGainXP("heroes", index, 120)}>
                Gagner XP
              </button>
              {
                hero.skills.map((skill, i) => (
                  <button key={i} onClick={() => handleUseSkill("heroes",index, skill)}>
                  {skill}
                </button>
                ))
              }

            </div>
          ))}

          <div>
            <h3>Choisissez une cible :</h3>
            <button onClick={() => handleSelectTarget(0)}>Paladin 2</button>
            <button onClick={() => handleSelectTarget(1)}>Mage 2</button>
          </div>

          {team_enemies.map((enemies, index) => (
            <div key={index}>
              {enemies.class === "Paladin" && <img src={paladins_2} alt="" />}
              {enemies.class === "Fire_Mage" && <img src={fire_mage} className="reverse" alt="" />}
              <h2>{enemies.name}</h2>
              <p>Level : {enemies.level}</p>
              <p>
                HP: {enemies.health} / {enemies.maxHealth}
              </p>
              <p>
                Mana: {enemies.mana} / {enemies.maxMana}
              </p>
              <button onClick={() => handleGainXP("enemies", index, 120)}>
                Gagner XP
              </button>
              {
                enemies.skills.map((skill, i) => (
                  <button key={i} onClick={() => handleUseSkill("enemies", index, skill)}>
                  {skill}
                </button>
                ))
              }
            </div>
          ))}
        </section>
      </section>
      <section className="log">
        <h2>Journal des Actions</h2>
        <ul>
          {log.slice(-4).map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Homepage;
