import type { CustomerOrder, CustomerOrderContent } from '../../type'
import style from '../../style/Order/OrderItem.module.css'
import { BACKEND_URL } from '../../constant'
import { useState, useEffect } from "react";
import OrderInfoItem from "./OrderInfoItem";
import OrderContentItem from "./OrderContentItem";

export default function OrderItem({ order }: { order: CustomerOrder }) {
    const [orderMeals, setOrderMeal] = useState<CustomerOrderContent[]>([]);
    let orderMealIDs: Array<number> = [];

    const [disclosure, setDisclosure] = useState(false);

    const handleDisclosureClick = () => {
        setDisclosure(!disclosure);
        // console.log("disclosure = ", disclosure);
    };

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
                // console.log("[fetchOrderMeals] Result: ", res);
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
                <OrderInfoItem key={order.Order_ID} order={order} handleDisclosureClick={handleDisclosureClick} disclosure={disclosure} />
            </div>
            <div>
                {disclosure ?
                    <div className={style.orderItem_mealContainer}>
                        {orderMeals.length > 0 ? (
                            <div className={style.orderItem_mealItemBox}>
                                {orderMeals.map((orderMeal, index) => (
                                    <OrderContentItem key={orderMeal.Meal_ID} orderContent={orderMeal} />
                                ))}
                            </div>
                        ) : (
                            <div className="orderMeals_empty">\
                                <span className="orderMeals_empty_title">Error: No meals in this order.</span>
                            </div>
                        )}
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
        
    );
}