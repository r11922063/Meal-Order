import { NavLink } from 'react-router-dom';
import style from '../style/NavBar.module.css';

export default function LoginNavBar() {
    return (
        <nav className={style.navbar}>
            <NavLink to="." end>FoodApp</NavLink>
        </nav>
    );
};