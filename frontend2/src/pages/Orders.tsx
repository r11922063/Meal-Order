import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomerOrder } from '../type'
import { BACKEND_URL } from '../constant'
import OrderTab from "../components/Order/OrderTab";
import style from '../style/Order/Order.module.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Orders() {
    const params = useParams();
    const [display, setDisplay] = useState(0); // 0: in progress, 1: completed
    const [orders_completed, setOrdersCompleted] = useState<CustomerOrder[]>([]);
    const [orders_in_progress, setOrdersInProgress] = useState<CustomerOrder[]>([]);
    const customer_id = params.customerId;

    function changeTab(tab: number) {
        if (tab !== display) {
            setDisplay(tab);
        }
    }

    useEffect(() => {
        async function fetchOrders(customerId: string) {
            try {
                const url: string = BACKEND_URL + `/orders?customerId=${customer_id}&display=${display}`;
                const res = await fetch(url).then(res => { return res.json(); });
                // console.log("[fetechOrders] Result: ", res);
                console.log()
                if (display === 0) {
                    setOrdersInProgress(res);
                    setOrdersCompleted([]);
                } else {
                    setOrdersInProgress([]);
                    setOrdersCompleted(res);
                }
            } catch (e) {
                console.log("Error fetching all_orders from backend: ", e);
            }
        };
        fetchOrders(customer_id!);
    }, [customer_id, display]);

    return (
        <>
            <h2 className={style.order_title}>
                我的訂單
            </h2>
            <Tabs>
                <TabList>
                    <Tab onClick={() => changeTab(0)}>未完成</Tab>
                    <Tab onClick={() => changeTab(1)}>已完成</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab key={0} orders={orders_in_progress} />
                </TabPanel>
                <TabPanel>
                    <OrderTab key={1} orders={orders_completed} />
                </TabPanel>
            </Tabs>
            
        </>
    );
}

// Tab: {OrderItem, OrderItem, ...}