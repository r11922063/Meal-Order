import VendorNavBar from '../components/NavBar/VendorNavBar';
import { Outlet, useParams } from 'react-router-dom';
import style from "../style/Layout/CustomerVendorLayout.module.css";
import useWebSocket from "react-use-websocket";
import { WS_URL } from '../constant';
import { CustomerOrder } from '../type';

export default function VendorLayout() {
    const params = useParams();
    const vendorId = params.vendorId;
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<CustomerOrder>(WS_URL, {
        queryParams: { id: vendorId!, identity: "vendor" },
        share: true,
    });
    return (
        <>
            <VendorNavBar />
            <main className={style.Layout}>
                <Outlet context={{ sendJsonMessage, lastJsonMessage, readyState }}/>
            </main>
        </>
    );
}