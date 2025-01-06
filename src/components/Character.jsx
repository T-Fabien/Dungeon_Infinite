import PropTypes from "prop-types";

// Characters
import paladins_1 from "../assets/characters/paladins_1.png";
import fire_mage from "../assets/characters/fire_mage.png";

// Status effects
import fire from "../assets/statut/fire.png";

// Other
import shield from "../assets/shield.png";
import star from "../assets/star.png";

function Character({ character, team }) {

  
  return (
        <>
          <h3>{character.name}</h3>
          {character.class === "Paladin" && <img src={paladins_1} alt="" />}
          {character.class === "Fire_Mage" && <img src={fire_mage} alt="" />}
          <div className={`game__characters__heroes__stats`}>
            <div className="bar__container">
              <div className="icon shield__icon">
                <img src={shield} alt="" />
                <p>
                  {Math.max(
                    0,
                    (character.armor ?? 0) + (character.activeArmor ?? 0)
                  )}
                </p>
              </div>
              <div className="bar health__bar">
                <div
                  className="bar__fill"
                  style={{
                    width: `${(character.health / character.maxHealth) * 100}%`,
                  }}
                ></div>
                <div className="bar__text">
                  {character.health} / {character.maxHealth}
                </div>
              </div>
            </div>
            {team === "heroes" && (
              <div className="bar__container">
                <div className="icon star__icon">
                  <img src={star} alt="" />
                  <p>{character.level}</p>
                </div>
                <div className="bar exp__bar">
                  <div
                    className="bar__fill"
                    style={{
                      width: `${
                        (character.xp / (character.level * 100)) * 100
                      }%`,
                    }}
                  ></div>
                  <div className="bar__text">
                    {character.xp} / {character.level * 100}
                  </div>
                </div>
              </div>
            )}

            <div className={`game__characters__${team}__status`}>
              <div className={`game__characters__${team}__status__icon`}>
                <img src={fire} alt="" />
                <p>3</p>
              </div>
              <div className={`game__characters__${team}__status__icon`}>
                <img src={fire} alt="" />
                <p>3</p>
              </div>
              <div className={`game__characters__${team}__status__icon`}>
                <img src={fire} alt="" />
                <p>3</p>
              </div>
              <div className={`game__characters__${team}__status__icon`}>
                <img src={fire} alt="" />
                <p>3</p>
              </div>
            </div>
          </div>
        </>
      )
}

// Validation des props
Character.propTypes = {
  character: PropTypes.object.isRequired,
  team: PropTypes.string.isRequired,
};

export default Character;
