import { NavLink } from 'react-router-dom';
import style from '../style/NavBar.module.css';

export default function CustomerNavBar() {
    return (
        <nav className={style.navbar}>
            <NavLink to="." end>FoodApp</NavLink>
        </nav>
    );
};