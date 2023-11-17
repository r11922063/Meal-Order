import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Order, OrderStatus } from '../type'
import { BACKEND_URL } from '../constant'
import style from '../style/Order/Order.module.css'
import OrderTab from "../components/Order/OrderTab";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Orders() {
    const [display, setDisplay] = useState(0); // 0: in progress, 1: completed
    const [orders, setOrders] = useState<Order[]>([]);
    const { customerId } = useParams();

    function changeTab(tab: number) {
        if (tab != display) {
            setDisplay(tab);
        }
    }

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch(
                    BACKEND_URL + `/orders?customerId=${customerId}&display=${display}`
                ).then(res => { return res.json(); });
                // console.log("Result: ", res);
                setOrders(res);
            } catch (e) {
                console.log("Error fetching all_orders from backend: ", e);
            }
        };
        fetchOrders();
    }, [display]);

    return (
        <>
            <h1>我的訂單</h1>
            <Tabs>
                <TabList>
                    <Tab onClick={() => changeTab(0)}>未完成</Tab>
                    <Tab onClick={() => changeTab(1)}>已完成</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab key={0} orders={orders} />
                </TabPanel>
                <TabPanel>
                    <OrderTab key={1} orders={orders} />
                </TabPanel>
            </Tabs>
            
        </>
    );
}