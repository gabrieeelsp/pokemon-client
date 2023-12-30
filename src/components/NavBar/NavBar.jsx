import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import style from './NavBar.module.css';
import { SearchBar } from '../../components';

import { useDispatch } from 'react-redux';

import { BiExit } from 'react-icons/bi';
import { reset } from '../../redux/actions';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleExit = () => {
        dispatch(reset());
        navigate('/');
    }

    return (
        <>
            <div className={style.navBar}>
                <div className={style.navLeft}>
                    <div className={style.logo}>
                        <img src="/logo.png" />
                    </div>
                    <div className={style.navLinks}>
                        <NavLink to='/home' className={style.link} >Home</NavLink>
                        <NavLink to='/create' className={style.link} >Nuevo</NavLink>
                        <BiExit onClick={handleExit} className={style.link} />
                    </div>

                </div>
                <div className={style.navRight}>
                    { useLocation().pathname === '/home' && <SearchBar /> }
                </div>
            </div>
            
        </>
    )
}

export default NavBar;