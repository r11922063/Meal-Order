import HomeNavBar from '../components/HomeNavBar'
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
    return (
        <>
            <HomeNavBar/>
            <main style={ {marginTop: 100, marginLeft: 35, marginRight: 35} }>
                <Outlet/>
            </main>
        </>
    );
}