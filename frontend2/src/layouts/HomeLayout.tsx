import HomeNavBar from '../components/NavBar/HomeNavBar'
import { Outlet } from 'react-router-dom';
import style from "../style/Layout/HomeLayout.module.css";

export default function HomeLayout() {
    return (
        <>
            <HomeNavBar />
            <main className={style.Layout}>
                <Outlet />
            </main>
        </>
    );
}