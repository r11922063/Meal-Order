import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Meal } from '../type'
import MealAmountMealItem from "../components/Meal/MealAmountMealItem";
import { BACKEND_URL } from '../constant'
import style from '../style/Meal/AllMeal.module.css'
import BaseSelect from '../components/shared/BaseSelect'
import BaseButton from "../components/shared/BaseButton";

export default function MealAmount() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const { vendorId } = useParams();

    // For BaseSelector
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

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    BACKEND_URL + `/mealAmount?vendorId=${vendorId}`
                ).then(res => { return res.json(); });

                setMeals(res);
            } catch (e) {
                console.log("Error fetching all_meals from backend: ", e);
            }
        };
        fetchData();

        async function fetchDateOption(){
            // TODO: setOption
        }
        fetchDateOption();
    }, []);

    useEffect(() => {
        console.log("meals changed");
        for (const meal of meals){
            console.log(`Meal ${meal.Meal_Name}: ${meal.Inventory[1]}`);
        }
    }, [meals]);


    // For BaseButton
    const updateOnClick = () => {
        const update_url = `${BACKEND_URL}/mealAmount/updateAllInventory`;
        const meals_data = [];
        console.log("updateOnClick");
        for (const meal of meals){
            console.log(`Meal ${meal.Meal_Name}: ${meal.Inventory[1]}`);
        }

        for (const meal of meals)
            meals_data.push({ mealId: meal.Meal_ID, inventory: meal.Inventory });
        
        fetch(update_url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meals_data)
        }).then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
    }

    return (
        <>
        < BaseSelect options={options} onChangeFunc={onChange} 
                     value={displayItem(selected)} />

        <div className={style.meal_container}>
            {/* Render items */}
            {meals.length > 0 ? (
                <div>
                <div className={style.meal_itemBox}>
                    {meals.map((meal) => (
                    <MealAmountMealItem key={meal.Meal_ID} meal={meal} setMeals={setMeals} />
                    ))}
                </div>

                 <BaseButton text="更新" onClickFunc={() => updateOnClick()}/>
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