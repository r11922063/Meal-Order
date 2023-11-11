import { NavLink } from 'react-router-dom';
import borderwidth from '../assets/border-width.svg';
import style from '../style/NavBar.module.css';

export default function CustomerNavBar() {
    return (
        <nav className={style.navbar}>
            <NavLink to="." end>FoodApp</NavLink>
            <ul>
                <li><NavLink to="shopcart">購物車</NavLink></li>
                <li><NavLink to="orders">訂單</NavLink></li>
                <li><NavLink to="settlement">月結算</NavLink></li>
                <li><button><img src={borderwidth} height="32" width="30"/></button></li>
            </ul>
        </nav>
    );
};