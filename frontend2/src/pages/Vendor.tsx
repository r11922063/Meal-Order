import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomerOrder } from '../type'
import { BACKEND_URL } from '../constant'
import style from '../style/Vendor/Vendor.module.css'
import VendorOrderTab from "../components/VendorOrder/VendorOrderTab";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

const Today = new Date();

const weekday =['週日', '週一', '週二', '週三', '週四', '週五', '週六']; 

const DayArray = new Array();

for (let step = 0; step < 3; step++){
    let day = new Date(Today);
    day.setDate(day.getDate() + step);
    DayArray.push(day);
}
  

export default function Vendor() {
    const params = useParams();
    const [orders, setOrders] = useState<CustomerOrder[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(((new Date()).getFullYear()).toString() + " 年 " + ((new Date()).getMonth()+1).toString() + " 月 " + (new Date()).getDate().toString() + " 日 " + weekday[(new Date().getDay())]);
    const vendor_id = params.vendorId;
    const { sendJsonMessage, lastJsonMessage } = useOutletContext<WebSocketHook<CustomerOrder>>();
    
    useEffect(() => {
        if(lastJsonMessage) {
            if (lastJsonMessage.Status === "WAIT_FOR_APPROVAL") {
                // 新增訂單
                setOrders([...orders, lastJsonMessage]);
            }
            else if (lastJsonMessage.Status === "CANCELLED_UNCHECKED") {
                // 取消訂單
                setOrders(orders.map(order => {
                    return order.Order_ID === lastJsonMessage.Order_ID ? lastJsonMessage : order;
                }));
            }
            else {}
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        async function fetchOrders(vendorId: string, day: string) {
            try {
                const arr = day.split(' ')
                const year = +arr[0], month = +arr[2], date = +arr[4];
                const url: string = BACKEND_URL + `/vendor?vendorId=${vendorId}&year=${year}&month=${String(month).padStart(2, '0')}&date=${String(date).padStart(2, '0')}`;
                const res = await fetch(url).then(res => { return res.json(); });
                setOrders(res);
            } catch (e) {
                console.log("Error fetching all_orders from backend: ", e);
            }
        };
        fetchOrders(vendor_id!, selectedDate);
    }, [vendor_id, selectedDate]);

    return (
        <div>
            <h1> 我的訂單 </h1>            
            <select className={style.DropDown} 
                    onChange={e => {
                        let ele = e.target.value;
                        setSelectedDate(((new Date(ele)).getFullYear()).toString() + " 年 " + ((new Date(ele)).getMonth()+1).toString() + " 月 " + (new Date(ele)).getDate().toString() + " 日 " + weekday[(new Date(ele).getDay())]);
                    }}> 
                {DayArray.map(ele => (
                    <option value={ele} key={ele}>
                        {((new Date(ele)).getFullYear()).toString() + " 年 " + ((new Date(ele)).getMonth()+1).toString() + " 月 " + (new Date(ele)).getDate().toString() + " 日 " + weekday[(new Date(ele).getDay())]}
                    </option>))
                }
            </select>
            <VendorOrderTab orders={orders}/>
        </div>
    );
}