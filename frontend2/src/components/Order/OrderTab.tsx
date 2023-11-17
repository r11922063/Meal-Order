import type { Order } from '../../type'
import style from '../../style/Order/OrderTab.module.css'
import OrderItem from "../../components/Order/OrderItem";

export default function OrderTab({ orders }: { orders: Array<Order> }) {
    return (
        <div className={style.orderTab_container}>
            {/* Render items */}
            {orders.length > 0 ? (
                <div className={style.orderTab_itemBox}>
                    {orders.map((order) => (
                        <OrderItem key={order.Order_ID} order={order} />
                    ))}
                </div>
            ) : (
                <div className="orders_empty">\
                    <span className="orders_empty_title">No orders.</span>
                </div>
            )}
        </div>

    );
}