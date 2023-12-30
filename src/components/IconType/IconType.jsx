import style from './IconType.module.css';
import Bug from './icons/Bug.png';
import Dark from './icons/Dark.png';
import Dragon from './icons/Dragon.png';
import Electric from './icons/Electric.png';
import Fairy from './icons/Fairy.png';
import Fighting from './icons/Fighting.png';
import Fire from './icons/Fire.png';
import Flying from './icons/Flying.png';
import Ghost from './icons/Ghost.png';
import Grass from './icons/Grass.png';
import Ground from './icons/Ground.png';
import Ice from './icons/Ice.png';
import Normal from './icons/Normal.png';
import Poison from './icons/Poison.png';
import Psychic from './icons/Psychic.png';
import Rock from './icons/Rock.png';
import Shadow from './icons/Shadow.png';
import Steel from './icons/Steel.png';
import Unknown from './icons/Unknown.png';
import Water from './icons/Water.png';

const icons = {
    bug: Bug,
    dark: Dark,
    dragon: Dragon,
    electric: Electric,
    fairy: Fairy,
    fighting: Fighting,
    fire: Fire,
    flying: Flying,
    ghost: Ghost,
    grass: Grass,
    ground: Ground,
    ice: Ice,
    normal: Normal,
    poison: Poison,
    psychic: Psychic,
    rock: Rock,
    shadow: Shadow,
    steel: Steel,
    unknown: Unknown,
    water: Water
}

const IconType = (props) => {
    const { type, size, disabled } = props;

    return (
        <>
            { (size === 'x-small') && <img src={icons[type]} className={`${style.xsmall} ${disabled ? style.disabled : ''}`} />}
            { (!size || size === 'small') && <img src={icons[type]} className={`${style.small} ${disabled ? style.disabled : ''}`} />}
        </>
    )
}

export default IconType;