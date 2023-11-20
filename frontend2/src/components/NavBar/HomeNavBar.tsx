import { NavLink } from 'react-router-dom';
import style from '../../style/NavBar/NavBar.module.css';

export default function HomeNavBar() {
    return (
        <nav className={style.navbar}>
            <NavLink to="." end>FoodApp</NavLink>
            <ul>
                <li><NavLink to="/">登入</NavLink></li>
                <li><NavLink to="signup">註冊</NavLink></li>
            </ul>
        </nav>
    );
};