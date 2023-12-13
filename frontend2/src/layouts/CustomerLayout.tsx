import CustomerNavBar from "../components/NavBar/CustomerNavBar";
import { Outlet, useParams } from 'react-router-dom';
import style from "../style/Layout/CustomerVendorLayout.module.css";
import useWebSocket from "react-use-websocket";
import { WS_URL } from '../constant';
import { CustomerOrder } from '../type';

export default function CustomerLayout() {
    const params = useParams();
    const customerId = params.customerId;
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<CustomerOrder>(WS_URL, {
        queryParams: { id: customerId!, identity: "customer" },
        share: true,
    });
    return (
        <>
            <CustomerNavBar />
            <main className={style.Layout}>
                <Outlet context={{ sendJsonMessage, lastJsonMessage, readyState }}/>
            </main>
        </>
    );
}