import VendorNavBar from '../components/NavBar/VendorNavBar';
import { Outlet } from 'react-router-dom';
import style from "../style/Layout/CustomerVendorLayout.module.css";

export default function VendorLayout() {
    return (
        <>
            <VendorNavBar />
            <main className={style.Layout}>
                <Outlet />
            </main>
        </>
    );
}