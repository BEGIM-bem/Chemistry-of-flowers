import React, { useState } from 'react';
import styles from './styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import ReorderIcon from '@material-ui/icons/Reorder';
import CloseIcon from '@material-ui/icons/Close';
import BackArrow from './icon/Frame 928.svg';
import { useSelector, useDispatch } from 'react-redux';
import { ERROR, logout } from '../../Logica/reducers/userReducer';
import { useNavigate } from "react-router-dom";


function NavBar() {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [clicked, setClicked] = useState(false)
    const isAuth = useSelector(state => state.user.isAuth)



    const handleClick = () => {
        setClicked(!clicked)
    }
    function goOut() {
        dispatch(logout())
        dispatch({ type: ERROR, error: '' })
        navigate('/authorization')
    }

    return (

        <nav className={styles.Navbar}>

            <h1 className={styles.Navbar__title} >Химия  цветов</h1>

            <div className={styles.menuIcon} onClick={handleClick} >
                {clicked ?
                    <CloseIcon style={{ color: '	#FFFFFF' }} />
                    :
                    <ReorderIcon style={{ color: '	#FFFFFF' }} />}

            </div>

            <ul className={clicked ? styles.Navbar__active : styles.Navbar__navMenu} >
                {MenuItems.map((item, index) => {

                    return (

                        <li className={styles.Navbar__item} key={index}>
                            <NavLink className={(navData) => (navData.isActive ? styles.active :
                                styles.Navbar__navLinks)} to={item.to}  >{item.title}
                            </NavLink>
                        </li>

                    )
                })}



            </ul>
            {isAuth && <div className={styles.BackArrow} onClick={() => goOut()}>
                <img src={BackArrow} className={styles.f} alt='not find icon!' />
            </div>}





        </nav>



    )
}

export default NavBar;