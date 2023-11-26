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
    const [completed_order_time, setCompletedOrderTime] = useState("");

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
        const res = await toCancelOrder();
        setUpdateOrderState(!update_order_state);
        return res;
    }

    /* Set the date_time one month ago in mysql format */
    useEffect(() => {
        const toSqlDatetime = (inputDate: Date) => {
            const date = new Date(inputDate)
            const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            return dateWithOffest
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
        }

        let oneMonthAgo = new Date();
        oneMonthAgo.setMonth(new Date().getMonth() - 1);
        setCompletedOrderTime(toSqlDatetime(oneMonthAgo));
    }, []);

    /* fetch orders */
    useEffect(() => {

        async function fetchOrders() {
            if (display === 0 || (display === 1 && completed_order_time.length > 0)) {
                const url: string = BACKEND_URL + "/orders";
                let res;
                try {
                    res = await fetch(url, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json", },
                        body: JSON.stringify({
                            customerID: customer_id,
                            display: display,
                            completed_order_time: completed_order_time
                        })
                    }).then((res) => { return res.json() });
                } catch (e) {
                    console.log("Error fetching all_orders from backend: ", e);
                    throw e;
                }
                if (display === 0) {
                    setOrdersInProgress(res);
                    setOrdersCompleted([]);
                } else {
                    setOrdersInProgress([]);
                    setOrdersCompleted(res);
                }
            }
        };

        const abortController = new AbortController();
        fetchOrders();
        return () => {
            abortController.abort();
        }
    }, [customer_id, display, update_order_state, completed_order_time]);

    function tabListStyleSwitch(tab_id: number) {
        if (tab_id === display) return styleTabListChosen;
        else return styleTabListUnchosen;
    }

    const styleTabListChosen = {
        color: "black",
        fontWeight: "bold",
        backgroundColor: "gainsboro"
    };

    const styleTabListUnchosen = {
        color: "black",
        fontWeight: "bold",
    };

    return (
        <>
            <h2 className={style.order_title}>
                我的訂單
            </h2>
            <Tabs>
                <TabList>
                    <Tab style={ tabListStyleSwitch(0) } onClick={() => changeTab(0)}>進行中</Tab>
                    <Tab style={ tabListStyleSwitch(1) } onClick={() => changeTab(1)}>近期完成</Tab>
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