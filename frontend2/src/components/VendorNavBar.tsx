import { NavLink } from 'react-router-dom';
import borderwidth from '../assets/border-width.svg';
import style from '../style/NavBar.module.css';

export default function VendorNavBar() {
    return (
        <nav className={style.navbar}>
            <NavLink to="." end>FoodApp</NavLink>
            <ul>
                <li><NavLink to="mealamount">供餐數量設定</NavLink></li>
                <li><NavLink to="allmeals">所有餐點</NavLink></li>
                <li><NavLink to="settlement">月結算</NavLink></li>
                <li><button><img src={borderwidth} height="32" width="30"/></button></li>
            </ul>
        </nav>
    );
};