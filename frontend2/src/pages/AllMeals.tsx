import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Meal } from '../type'
import MealItem from "../components/MealItem";
import { BACKEND_URL } from '../constant'
import style from '../style/AllMeal.module.css'

export default function AllMeals() {
    const [meals, setMeals] = useState<Meal[]>([]);
    // TODO: get vendor_id
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    BACKEND_URL + `/allMeals?id=${id}`
                ).then(res => { return res.json(); });
                console.log("Result: ", res);

                setMeals(res);
            } catch (e) {
                console.log("Error fetching all_meals from backend: ", e);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <h1>AllMeals</h1>
        
        {/* Render items */}



        {meals.length > 0 ? (
            <div className="meal_container">
              <div className="meal_itemBox">
                {meals.map((meal) => (
                  <MealItem key={meal.Meal_ID} {...meal} />
                ))}
              </div>
              {/* <div className="meal_priceBox">
                <OfferBadge />
                <div className="meal_price">
                  <span>جمع سبد خرید</span>
                  <span>|</span>
                  <span>{state.totalPrice.toLocaleString()} تومان</span>
                </div>
                {state.totalPriceAfterOffer > 0 && (
                  <div className="meal_offer">
                    <span>قیمت با تخفیف</span>
                    <span>{state.totalPriceAfterOffer.toLocaleString()} تومان</span>
                  </div>
                )}
                <Offer />
                <Sendmeals />
                <div className="meal_send">
                  <span>مجموع مبلغ قابل پرداخت</span>
                  <span>{state.totalPriceFainal.toLocaleString()} تومان</span>
                </div>
                <button className="meal_button_buy">ادامه فرایند خرید</button>
                <button
                  onClick={() => dispath({ type: "EMPTY_BASKET" })}
                  className="meal_button_remove"
                >
                  حذف {state.basket.length} کالا از سبد خرید
                </button>
              </div> */}
            </div>
          ) : (
            <div className="all_meals_empty">
              {/* <img
                className="all_meals_empty_img"
                src="images/empty-cart.png"
                alt=""
              /> */}
              <span className="all_meals_empty_title">No meals.</span>
            </div>
          )}
        </>
    );
    
}