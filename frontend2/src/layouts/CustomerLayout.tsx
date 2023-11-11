import CustomerNavBar from "../components/CustomerNavBar";
import {Outlet} from 'react-router-dom';

export default function CustomerLayout() {
    return (
        <>
            <CustomerNavBar/>
            <main style={ {marginTop: 100, marginLeft: 35, marginRight: 35} }>
                <Outlet/>
            </main>
        </>
    );
}