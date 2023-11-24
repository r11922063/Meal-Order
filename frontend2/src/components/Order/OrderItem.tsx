import type { CustomerOrder, CustomerOrderContent } from '../../type'
import style from '../../style/Order/OrderItem.module.css'
import triangle_style from '../../style/Order/TriangleButton.module.css'
import { BACKEND_URL } from '../../constant'
import { useState, useEffect } from "react";
import OrderInfoItem from "./OrderInfoItem";
import OrderContentItem from "./OrderContentItem";

export default function OrderItem({ order }: { order: CustomerOrder }) {
    const [order_meals, setOrderMeal] = useState<CustomerOrderContent[]>([]);
    const [disclosure, setDisclosure] = useState(false);
    const [bulk_order, setBulkOrder] = useState(false);
    const [order_pickup_time, setOrderPickupTime] = useState<Date>(new Date());
    const [order_cancel_dl, setOrderCancelDL] = useState<Date>(new Date());

    const handleDisclosureClick = () => {
        setDisclosure(!disclosure);
    };

    function cancelOrder() {
        console.log("click cancel button!");
        // TODO: cancel order
        // console.log(order_cancel_dl);
    }

    

    useEffect(() => {
        async function fetchOrderMeals() {
            let order_meal_ids: Array<number> = [];
            let total_meal_amount = 0;
            order.Meal_List.forEach((order_meal) => {
                order_meal_ids.push(order_meal.Meal_ID);
                total_meal_amount += order_meal.Amount;
            });
            // console.log("[OrderItem: fetchOrderMeals] orderMealIDs = ", orderMealIDs);
            setBulkOrder((total_meal_amount >= 20)? true : false);
            try {
                const res = await fetch(
                    BACKEND_URL + `/orders/orderMeals?orderMealIDs=${order_meal_ids}`
                ).then(res => { return res.json(); });
                setOrderMeal(res);
                // console.log("[fetchOrderMeals] order_meals: ", order_meals);
            } catch (e) {
                console.log("Error fetching all_orders from backend: ", e);
            }
        };
        
        fetchOrderMeals();
        setOrderPickupTime(new Date(order.Pickup_Time));
    }, [order]);

    useEffect(() => {
        function calOrderCancelDL() {
            let tmp: Date = order_pickup_time;
            if (bulk_order === true) {
                tmp.setHours(order_pickup_time.getHours() - 24);
            }
            else {
                tmp.setHours(order_pickup_time.getHours() - 1);
            }
            setOrderCancelDL(tmp);
        }

        calOrderCancelDL();
    }, [bulk_order, order_pickup_time]);


    return (
        <div className={style.orderItem_container}>
            <div className={style.orderItem_infoItemAndButtonContainer}>
                    <div className={style.orderItem_infoItemContainer}>
                        <OrderInfoItem
                            order_id={order.Order_ID}
                            vendor_name={order.Vendor_Name}
                            order_pickup_time={order_pickup_time}
                            order_cancel_dl={order_cancel_dl}
                        />
                    </div>

                    <div className={style.orderItem_buttonAndPriceContainer}>
                        <div className={style.orderItem_cancelBox}>
                            <button className={style.orderItem_cancelButton} onClick={() => cancelOrder()}>
                                <span>取消訂單</span>
                            </button>
                        </div>
                        <div className={style.orderItem_totalPriceAndDetail}>
                            <span>{`總計：${order.Cash_Amount} 元`}</span>
                            <button className={triangle_style.triangle_buttons} onClick={() => handleDisclosureClick()}>
                                {disclosure ?
                                    <div className={`${triangle_style.triangle_buttons__triangle} ${triangle_style.triangle_buttons__triangle_b}`}></div>
                                    :
                                    <div className={`${triangle_style.triangle_buttons__triangle} ${triangle_style.triangle_buttons__triangle_l}`}></div>
                                }
                            </button>
                        </div>
                    </div>
            </div>
            <div>
                {disclosure ?
                    <div className={style.orderItem_mealContainer}>
                        {order_meals.length > 0 ? (
                            <div className={style.orderItem_mealItemBox}>
                                {order_meals.map((order_meal, index) => (
                                    <OrderContentItem key={order_meal.Meal_ID} orderContent={order_meal} amount={order.Meal_List[index].Amount} />
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