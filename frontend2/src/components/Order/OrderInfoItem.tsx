import type { OrderTimeInfo } from '../../type'
import style from '../../style/Order/OrderInfoItem.module.css'
import { useState, useEffect } from "react";

export default function OrderInfoItem({ order_id, vendor_name, order_pickup_time, order_cancel_dl }: 
    { order_id: number, vendor_name: string, order_pickup_time: Date, order_cancel_dl: Date }) {
    const [pickup_time_str, setPickupTimeStr] = useState("");
    const [cancel_dl_str, setCancelDLStr] = useState("");

    useEffect(() => {

        function buildTimeInfo(date_time: Date) {
            const WEEKDAYS: Array<string> = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
            let time_info: OrderTimeInfo = {
                year: date_time.getFullYear().toString(),
                month: date_time.getMonth().toString(),
                date: date_time.getDate().toString(),
                day: WEEKDAYS[date_time.getDay()],
                hour: ((date_time.getHours() > 12) ?
                    date_time.getHours() - 12 : date_time.getHours()).toString(),
                minute: date_time.getMinutes().toString(),
                dayPeriod: (date_time.getHours() > 12) ? "下午" : "上午",
            };
            return time_info;
        };

        function buildTimeStr(time_info: OrderTimeInfo) {
            return `${time_info.month} 月 ${time_info.date} 日 ${time_info.day}, ${time_info.dayPeriod} ${time_info.hour}:${time_info.minute}`;
        }

        let pickup_time: OrderTimeInfo = buildTimeInfo(order_pickup_time);
        let cancel_dl: OrderTimeInfo = buildTimeInfo(order_cancel_dl);
        setPickupTimeStr(buildTimeStr(pickup_time));
        setCancelDLStr(buildTimeStr(cancel_dl));
    }, [order_pickup_time, order_cancel_dl]);

    return (
        <div className={style.orderInfoItem_container}>
            <span className={style.orderInfoItem_title}>{vendor_name}</span>
            <span className={style.orderInfoItem_note}>{'訂單編號 #' + order_id}</span>
            <span className={style.orderInfoItem_note}>{'取餐時間：' + pickup_time_str}</span>
            <span className={style.orderInfoItem_warning}>{'最後取消時間：' + cancel_dl_str}</span>
        </div>

    );
}