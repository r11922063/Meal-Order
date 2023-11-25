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
    const [update_order_state, setUpdateOrderState] = useState(true);

    function changeTab(tab: number) {
        if (tab !== display) {
            setDisplay(tab);
        }
    }

    async function cancelOrder(order_id: number) {
        async function toCancelOrder() {
            let success = false;
            const abortController = new AbortController();
            try {
                const url: string = BACKEND_URL + `/orders/cancelOrder?orderID=${order_id}`;
                const res = await fetch(url, { 
                    signal: abortController.signal }).then(res => { return res.json(); }); // changedRows
                success = res > 0;
            } catch (e) {
                console.log("Error: cancel order from backend: ", e);
            }
            abortController.abort();
            return success;
        }
        // console.log("click cancel button!");
        setUpdateOrderState(!update_order_state);
        return await toCancelOrder();
    }

    useEffect(() => {
        async function fetchOrders(customerId: string) {
            try {
                const url: string = BACKEND_URL + `/orders?customerID=${customer_id}&display=${display}`;
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

        const abortController = new AbortController();
        fetchOrders(customer_id!);
        return () => {
            abortController.abort();
        }
    }, [customer_id, display, update_order_state]);

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
                    <OrderTab key={0} orders={orders_in_progress} handleOrderCancellation={cancelOrder} />
                </TabPanel>
                <TabPanel>
                    <OrderTab key={1} orders={orders_completed} handleOrderCancellation={cancelOrder} />
                </TabPanel>
            </Tabs>
            
        </>
    );
}