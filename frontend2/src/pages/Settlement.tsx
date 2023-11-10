import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "../style/Settlement.module.css"

let year: number = new Date().getFullYear();
let month: number = new Date().getMonth() + 1;
const PERIOD = 24
const yearlist: number[] = [year];
const yearmap = new Map<number, number[]>();

for (let i = 0; i < PERIOD; ++i) {
    if (month === 0) {
        year -= 1;
        yearlist.push(year);
        month = 12;
    }
    if (yearmap.has(year) === false) {
        yearmap.set(year, []);
    }
    (yearmap.get(year) as number[]).push(month);
    month -= 1;
}

type Order = {
    Order_ID: number,
    Pickup_Time: string,
    Name: string,
    Cash_Amout: number;
};

function OrderTable({ orders }: {orders: Order[]}) {
    const content = orders.map(order => {
        return (
            <tr key={ order.Order_ID }>
                <td> { order.Pickup_Time } </td>
                <td> { order.Order_ID } </td>
                <td> { order.Name } </td>
                <td> { order.Cash_Amout } </td>
            </tr>
        );
    });
    return (
        <table>
            <thead>
                <tr>
                    <th>日期 / 時間</th>
                    <th>訂單編號</th>
                    <th>餐廳</th>
                    <th>金額</th>
                </tr>
            </thead>
            <tbody>
                { content.length > 0 ? content : <tr><th colSpan={ 4 }> No data </th></tr> }
            </tbody>
        </table>
    );
}

export default function Settlement() {
    const { customerId } = useParams();
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [orders, setOrder] = useState<Order[]>([]);
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.Cash_Amout;
    });

    useEffect(() => {
        const FetchOrder = async (ID: string, Year: number, Month: number) => {
            try {
                const url: string = `http://localhost:8081/settlement?id=${ID}&identity=customer&year=${Year}&month=${String(Month).padStart(2, '0')}`;
                const result = await fetch(url).then((res) => { return res.json(); });
                setOrder(result);
            }
            catch (err) {
                throw err;
            }
        }
        const abortController = new AbortController();
        FetchOrder(customerId!, selectedYear, selectedMonth);
        return () => {
            abortController.abort();
        }
    }, [selectedYear, selectedMonth]);

    return (
        <div className={ style.settlement }>
            <h1>我的月結算</h1>
            <div className= { style.container1}>
                <div className= { style.container2 }>
                    <label className="year-label">
                        Year :
                        <select value={selectedYear} onChange={e => {
                            setSelectedYear(+e.target.value);
                            const minmonth: number = yearmap.get(+e.target.value)![yearmap.get(+e.target.value)!.length - 1];
                            const maxmonth: number = yearmap.get(+e.target.value)![0];
                            if (selectedMonth < minmonth) {
                                setSelectedMonth(minmonth);
                            }
                            else if (selectedMonth > maxmonth) {
                                setSelectedMonth(maxmonth);
                            } 
                        }}>
                            { yearlist.map(y => <option value={ y } key={ y }> { y } </option>)}
                        </select>
                    </label>
                    <label className="month-label">
                        Month :
                        <select value={selectedMonth} onChange={e => setSelectedMonth(+e.target.value) }>
                            { yearmap.get(selectedYear)!.map(m => <option value={ m } key={ `${selectedYear}/${m}` }> { m } </option>)}
                        </select>
                    </label>
                    <h3>總計 : NT$ { totalAmount }</h3>
                </div>
                <OrderTable orders={ orders! }/>
            </div>
        </div>
    );
}