import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomerOrder } from '../type'
import { BACKEND_URL } from '../constant'
import style from '../style/Vendor/Vendor.module.css'
import VendorOrderTab from "../components/VendorOrder/VendorOrderTab";
import AutoRefreshComponent from "../components/VendorOrder/AutoRefreshComponent";

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
    const [selectedDate, setSelectedDate] = useState<string>(((new Date()).getFullYear()).toString() + " 年 " + ((new Date()).getMonth()+1).toString() + " 月 " + (new Date()).getDate().toString() + " 日 " + weekday[(new Date().getDay())]);
    const vendor_id = params.vendorId;
    //console.log("selectedDate: ", selectedDate);

    useEffect(() => {

        async function fetchOrders(vendorId: string, day: string) {
            try {
                //console.log("Day: ", day);
                //console.log("Year: ", year, "Month: ", month, "Date: ", date);
                const arr = day.split(' ')
                const year = +arr[0], month = +arr[2], date = +arr[4];
                const url: string = BACKEND_URL + `/vendor?vendorId=${vendorId}&year=${year}&month=${String(month).padStart(2, '0')}&date=${String(date).padStart(2, '0')}`;
                const res = await fetch(url).then(res => { return res.json(); });
                // console.log("[fetechOrders] Result: ", res);
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
                        //console.log("e.target.value: ", ((new Date(ele)).getFullYear()).toString() + " 年 " + ((new Date(ele)).getMonth()+1).toString() + " 月 " + (new Date(ele)).getDate().toString() + " 日 " + weekday[(new Date(ele).getDay())]);
                    }}> 
                {DayArray.map(ele => (
                    <option value={ele} key={ele}>
                        {((new Date(ele)).getFullYear()).toString() + " 年 " + ((new Date(ele)).getMonth()+1).toString() + " 月 " + (new Date(ele)).getDate().toString() + " 日 " + weekday[(new Date(ele).getDay())]}
                    </option>))
                }
            </select>
            <VendorOrderTab orders={orders}/>
            <AutoRefreshComponent />
        </div>
    );
}