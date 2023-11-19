import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomerOrder } from '../type'
import { BACKEND_URL } from '../constant'
import OrderTab from "../components/Order/OrderTab";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Orders() {
    const params = useParams();
    const [display, setDisplay] = useState(0); // 0: in progress, 1: completed
    const [ordersCompleted, setOrdersCompleted] = useState<CustomerOrder[]>([]);
    const [ordersInProgress, setOrdersInProgress] = useState<CustomerOrder[]>([]);
    const customerId = params.customerId;

    function changeTab(tab: number) {
        if (tab !== display) {
            setDisplay(tab);
        }
    }

    useEffect(() => {
        async function fetchOrders(customerId: string) {
            try {
                const url: string = BACKEND_URL + `/orders?customerId=${customerId}&display=${display}`;
                const res = await fetch(url).then(res => { return res.json(); });
                // console.log("[fetechOrders] Result: ", res);
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
        fetchOrders(customerId!);
    }, [customerId, display]);

    return (
        <>
            <h1>我的訂單</h1>
            <Tabs>
                <TabList>
                    <Tab onClick={() => changeTab(0)}>未完成</Tab>
                    <Tab onClick={() => changeTab(1)}>已完成</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab key={0} orders={ordersInProgress} />
                </TabPanel>
                <TabPanel>
                    <OrderTab key={1} orders={ordersCompleted} />
                </TabPanel>
            </Tabs>
            
        </>
    );
}

// Tab: {OrderItem, OrderItem, ...}