import { useState } from "react";
import useStore from "../store/useStore"; // Importer le store

// Scene
import castle from "../assets/scene/castle.png";

// Characters
import paladins_1 from "../assets/characters/paladins_1.png";
import fire_mage from "../assets/characters/fire_mage.png";

// Status effects
import fire from "../assets/statut/fire.png";

// Other
import shield from "../assets/shield.png";
import star from "../assets/star.png";

function Homepage() {
  const { team_heroes, team_enemies, log, gainXP, useSkill } = useStore();

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
      <section className="container">
        <section className="game">
          <h2> Niveau 250</h2>
          <section className="game__characters">
            <div className="game__characters__heroes">
              {team_heroes.map((hero, index) => (
                <div key={index}>
                  <h3>{hero.name}</h3>
                  {hero.class === "Paladin" && <img src={paladins_1} alt="" />}
                  {hero.class === "Fire_Mage" && <img src={fire_mage} alt="" />}
                  <div className="game__characters__heroes__stats">
                    <div className="bar__container">
                      <div className="icon shield__icon">
                        <img src={shield} alt="" />
                        <p>250</p>
                      </div>
                      <div className="bar health__bar"></div>
                    </div>
                    <div className="bar__container">
                      <div className="icon star__icon">
                        <img src={star} alt="" />
                        <p>250</p>
                      </div>
                      <div className="bar exp__bar"></div>
                    </div>
                    <div className="game__characters__heroes__status">
                      <div className="game__characters__heroes__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                      <div className="game__characters__heroes__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                      <div className="game__characters__heroes__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                      <div className="game__characters__heroes__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="game__characters__enemies">
              {team_enemies.map((enemy, index) => (
                <div key={index}>
                  <h3>{enemy.name}</h3>
                  {enemy.class === "Paladin" && <img src={paladins_1} alt="" />}
                  {enemy.class === "Fire_Mage" && (
                    <img src={fire_mage} alt="" />
                  )}
                  <div className="game__characters__enemies__stats">
                    <div className="bar__container">
                      <div className="icon shield__icon">
                        <img src={shield} alt="" />
                        <p>250</p>
                      </div>
                      <div className="bar health__bar"></div>
                    </div>
                    <div className="bar__container">
                      <div className="icon star__icon">
                        <img src={star} alt="" />
                        <p>250</p>
                      </div>
                      <div className="bar exp__bar"></div>
                    </div>

                    <div className="game__characters__enemies__status">
                      <div className="game__characters__enemies__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                      <div className="game__characters__enemies__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                      <div className="game__characters__enemies__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                      <div className="game__characters__enemies__status__icon">
                        <img src={fire} alt="" />
                        <p>3</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
        <section className="action">
          <div className="action__container action__main__menu">
            <button> Attaque </button>
            <button> Objets </button>
            <button> Fuite </button>
            <button> Abandon </button>
          </div>
          <div className="action__container action__secondary__menu">
                  {team_heroes[0].skills.map((skill, i) => (
                    <button key={i} onClick={() => handleUseSkill("heroes", 0, skill)}>
                      {skill}
                    </button>
                  ))}
          </div>
          <div className="action__container action__description">
            
          Augmente votre armure de 30 pendant 3 tours
          </div>
        </section>
      </section>
    </main>
  );
}

export default Homepage;
