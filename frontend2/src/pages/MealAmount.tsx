import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Meal } from '../type'
import AllMealMealItem from "../components/Meal/AllMealMealItem";
import { BACKEND_URL } from '../constant'
import style from '../style/Meal/AllMeal.module.css'
import BaseSelect from '../components/shared/BaseSelect'

export default function MealAmount() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const { vendorId } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    BACKEND_URL + `/allMeals?vendorId=${vendorId}`
                ).then(res => { return res.json(); });

                setMeals(res);
            } catch (e) {
                console.log("Error fetching all_meals from backend: ", e);
            }
        };
        fetchData();
    }, []);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberryyyyyyyyyyyyy' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const [selected, setSelected] = useState("");
    const onChange = (e: any) => {
        setSelected(e.value);
    };
    
    const displayItem = (selected: any) => {
        const item = options.find(x => x.value === selected);
        return item ? item : { value: "", label: "請選擇時間" };
    };

    return (
        <>
        < BaseSelect options={options} onChangeFunc={onChange} 
                     value={displayItem(selected)} />

        <div className={style.meal_container}>
            {/* Render items */}
            {meals.length > 0 ? (
                <div className={style.meal_itemBox}>
                    {meals.map((meal) => (
                    <AllMealMealItem key={meal.Meal_ID} meal={meal} />
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