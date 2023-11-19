import CustomerNavBar from "../components/NavBar/CustomerNavBar";
import { Outlet } from 'react-router-dom';
import style from "../style/Layout/CustomerVendorLayout.module.css";

export default function CustomerLayout() {
    return (
        <>
            <CustomerNavBar />
            <main className={style.Layout}>
                <Outlet />
            </main>
        </>
    );
}