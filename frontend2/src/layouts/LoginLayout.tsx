import LoginNavBar from '../components/LoginNavBar'
import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
    return (
        <>
            <LoginNavBar/>
            <main style={ {marginTop: 100, marginLeft: 35, marginRight: 35} }>
                <Outlet/>
            </main>
        </>
    );
}