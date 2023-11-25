import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomerOrder } from '../type'
import { BACKEND_URL } from '../constant'
import style from '../style/Vendor/Vendor.module.css'
import VendorOrderTab from "../components/VendorOrder/VendorOrderTab";
const Today = new Date();

const weekday =['週日', '週一', '週二', '週三', '週四', '週五', '週六']; 

const DayArray = new Array();

for (let step = 0; step < 3; step++){
    // DayArray.push(day.getFullYear().toString() + "," + (day.getMonth()+1).toString() + "," + day.getDate().toString());
    let day = new Date(Today);
    day.setDate(day.getDate() + step);
    DayArray.push(day);
}

export default function Vendor() {
    const params = useParams();
    const [orders, setOrders] = useState<CustomerOrder[]>([]);
    const vendor_id = params.vendorId;

    useEffect(() => {
        async function fetchOrders(vendorId: string) {
            try {
                const url: string = BACKEND_URL + `/vendor?vendorId=${vendor_id}`;
                const res = await fetch(url).then(res => { return res.json(); });
                // console.log("[fetechOrders] Result: ", res);
                console.log()
                setOrders(res);
            } catch (e) {
                console.log("Error fetching all_orders from backend: ", e);
            }
        };
        fetchOrders(vendor_id!);
    }, [vendor_id]);

    return (
        <div>
            <h1> 我的訂單 </h1>
            <select className={style.DropDown}> 
                {DayArray.map(ele => (
                    <option value={ele} key={ele}>
                        {((new Date(ele)).getMonth()+1).toString() + " 月 " + (new Date(ele)).getDate().toString() + " 日 " + weekday[(new Date(ele).getDay())]}
                    </option>))
                }
            </select>
            <VendorOrderTab orders={orders} />
        </div>
    );
}