import VendorNavBar from '../components/VendorNavBar';
import {Outlet} from 'react-router-dom';

export default function VendorLayout() {
    return (
        <>
            <VendorNavBar/>
            <main style={ {marginTop: 100, marginLeft: 35, marginRight: 35} }>
                <Outlet/>
            </main>
        </>
    );
}