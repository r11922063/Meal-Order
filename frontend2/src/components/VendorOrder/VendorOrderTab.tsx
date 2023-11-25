import type { CustomerOrder } from '../../type'
import style from '../../style/Vendor/Vendor.module.css'
import OrderItem from "./VendorOrderItem";

export default function OrderTab({ orders }: { orders: Array<CustomerOrder> }) {
    /*let myorder: CustomerOrder = {
        Order_ID : 1,
        Customer_ID : 1,
        Vendor_ID : 101,
        Status : 'WAIT_FOR_APPROVAL',
        Pickup_Time : '9999-12-31 21:59:59',
        Meal_List: [{"Meal_ID": 10001, "Amount": 10}, {"Meal_ID": 10002, "Amount": 25}],
        Cash_Amount: 300,
        Vendor_Name: "安好食",
    };
    let myorder2: CustomerOrder = {
        Order_ID : 2,
        Customer_ID : 1,
        Vendor_ID : 101,
        Status : 'CANCELLED_UNCHECKED',
        Pickup_Time : '9999-12-31 22:59:59',
        Meal_List: [{"Meal_ID": 10001, "Amount": 10}, {"Meal_ID": 10002, "Amount": 25}],
        Cash_Amount: 300,
        Vendor_Name: "安好食",
    };
    let myorder3: CustomerOrder = {
        Order_ID : 3,
        Customer_ID : 1,
        Vendor_ID : 101,
        Status : 'READY_FOR_PICKUP',
        Pickup_Time : '9999-12-31 20:59:59',
        Meal_List: [{"Meal_ID": 10001, "Amount": 10}, {"Meal_ID": 10002, "Amount": 25}],
        Cash_Amount: 300,
        Vendor_Name: "安好食",
    };
    let myorders: Array<CustomerOrder> = [myorder, myorder2, myorder3];*/
    orders.sort(function(x, y) {
        let a = x.Pickup_Time;
        let b = y.Pickup_Time;
        if(a > b) return 1;
        if(a < b) return -1;
        else return 0;
    });
    return (
        <div className="one_tab">
            {/* Render items */}
            {orders.length > 0 ? (
                <div className="orders">
                    {orders.map(order => {
                        if(order.Status === 'WAIT_FOR_APPROVAL' || order.Status === 'PREPARING') {
                            return (
                                <div className = {style.YellowContainer}>
                                    <OrderItem key={order.Order_ID} order={order} />
                                </div>
                            )
                        } else if (order.Status === 'CANCELLED_UNCHECKED') {
                            return (
                                <div className = {style.RedContainer}>
                                    <OrderItem key={order.Order_ID} order={order} />
                                </div>
                            )
                        } else if (order.Status === 'READY_FOR_PICKUP') {
                            return (
                                <div className = {style.GreenContainer}>
                                    <OrderItem key={order.Order_ID} order={order} />
                                </div>
                            )
                        }

                    })}
                </div>
                
            ) : (
                <div className="orders_empty">\
                    <span className="orders_empty_title">目前沒有訂單！</span>
                </div>
            )}
        </div>

    );
}