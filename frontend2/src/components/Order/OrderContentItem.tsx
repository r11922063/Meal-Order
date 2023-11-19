import type { Meal, OrderContent } from '../../type'
import test_img from '../../assets/dumplings.jpg'
import style from '../../style/Order/OrderContentItem.module.css'
import { Link } from "react-router-dom";
import { BACKEND_URL } from '../../constant'
import { useState, useEffect } from "react";

export default function OrderContentItem({ orderContent }: { orderContent: OrderContent }) {
    useEffect(() => {
        console.log("[ORderContentItem]: orderContent = ", orderContent);
    }, []);
    return (
        <div className={style.orderContentItem_item}>
            <div className={style.orderContentItem_contentContainer}>
                <span className={style.orderContentItem_title}>{orderContent.Meal_Name}</span>
                {/* TODO: price / number or amount */}
                {/* <span>{(meal.price * meal.count).toLocaleString()} تومان</span> */}
            </div>

            <div className={style.orderContentItem_img}>
                <img src={test_img} alt={orderContent.Meal_Name} />
                {/* TODO: change to meal.Image_url */}
                {/* <img src={meal.Image_url} alt={meal.Meal_Name} /> */}
            </div>
        </div>
    );
}