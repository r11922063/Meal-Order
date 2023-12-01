import type { CustomerOrder } from '../../type'
import OrderItem from "./OrderItem";

export default function OrderTab({ orders, handleOrderCancellation }: 
    { orders: Array<CustomerOrder>, handleOrderCancellation: (order_id: number) => any }) {
    return (
        <div className="one_tab">
            {/* orders */}
            {orders.length > 0 ? (
                <div className="orders">
                    {orders.map((order) => (
                        <OrderItem key={order.Order_ID} order={order} handleOrderCancellation={handleOrderCancellation} />
                    ))}
                </div>
            ) : (
                <div className="orders_empty">
                    <span className="orders_empty_title">目前沒有訂單！</span>
                </div>
            )}
        </div>

    );
}