import type { Meal, Order, OrderContent } from '../../type'
import style from '../../style/Order/OrderItem.module.css'
import { BACKEND_URL } from '../../constant'
import { useState, useEffect } from "react";
import OrderInfoItem from "./OrderInfoItem";
import OrderContentItem from "./OrderContentItem";

export default function OrderItem({ order }: { order: Order }) {
    const [orderMeals, setOrderMeal] = useState<OrderContent[]>([]);
    let orderMealIDs: Array<number> = [];

    useEffect(() => {
        async function fetchOrderMeals() {
            orderMealIDs = [];
            order.Meal_List.forEach((orderMeal) => {
                orderMealIDs.push(orderMeal.Meal_ID);
            });
            // console.log("[OrderItem: fetchOrderMeals] orderMealIDs = ", orderMealIDs);
            try {
                const res = await fetch(
                    BACKEND_URL + `/orders/orderMeals?orderMealIDs=${orderMealIDs}`
                ).then(res => { return res.json(); });
                console.log("[fetchOrderMeals] Result: ", res);
                setOrderMeal(res);
            } catch (e) {
                console.log("Error fetching all_orders from backend: ", e);
            }
        };
        fetchOrderMeals();
    }, []);

    return (
        <div className={style.orderItem_container}>
            <div className={style.orderItem_InfoItemBox}>
                <OrderInfoItem key={order.Order_ID} order={order} />
            </div>

            <div className={style.orderItem_mealContainer}>
                {/* TODO: toggle (meals) */}
                {/* Render items */}
                {orderMeals.length > 0 ? (
                    <div className={style.orderItem_mealItemBox}>
                        {orderMeals.map((orderMeal, index) => (
                            <OrderContentItem key={`${order.Order_ID}-${index++}`} orderContent={orderMeal} />
                        ))}
                    </div>
                ) : (
                    <div className="orderMeals_empty">\
                        <span className="orderMeals_empty_title">Error: No meals in this order.</span>
                    </div>
                )}
            </div>
            
        </div>
        
    );
}