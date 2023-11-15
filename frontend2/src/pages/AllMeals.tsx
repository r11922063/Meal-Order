import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Meal } from '../type'
import AllMealMealItem from "../components/Meal/AllMealMealItem";
import { BACKEND_URL } from '../constant'
import style from '../style/Meal/AllMeal.module.css'

export default function AllMeals() {
    const [meals, setMeals] = useState<Meal[]>([]);
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
        <div className={style.meal_container}>
            {/* Render items */}
            {meals.length > 0 ? (
                <div className={style.meal_itemBox}>
                    {meals.map((meal) => (
                    <AllMealMealItem key={meal.Meal_ID} meal={meal} id={id} />
                    ))}
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
        </div>
        </>
    );
    
}