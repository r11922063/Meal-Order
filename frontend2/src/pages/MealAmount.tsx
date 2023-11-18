import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Meal } from '../type'
import MealAmountMealItem from "../components/Meal/MealAmountMealItem";
import { BACKEND_URL } from '../constant'
import style from '../style/Meal/AllMeal.module.css'
import BaseSelect from '../components/shared/BaseSelect'
import BaseButton from "../components/shared/BaseButton";
import { Option, SelectOption } from "../type";

export default function MealAmount() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const { vendorId } = useParams();

    // For BaseSelector
    const [options, setOptions] = useState<SelectOption>([]);
    const [selected, setSelected] = useState<Option>({ value: "", label: "請選擇時間" });
    const onChange = (e: any) => {
        setSelected(e.value);
    };
    const displayItem = (selected: any) => {
        const item = options.find(x => x.value === selected);
        return item ? item : { value: "", label: "請選擇時間" };
    };

    const today = new Date().getDay();
    async function fetchMealData(day_offset: number) {
        try {
            const res = await fetch(
                BACKEND_URL + `/mealAmount?vendorId=${vendorId}?day=${today+day_offset}`
            ).then(res => { return res.json(); });

            setMeals(res);
        } catch (e) {
            console.log("Error fetching all_meals from backend: ", e);
        }
    };

    useEffect(() => {
        function fetchDayOption(){
            var _options = []
            // +3 ~ +6
            const day_options_num = [3, 4, 5, 6];
            const day_options = day_options_num.map((num: number)=>( ((today+num) % 7 + 1) ));
            for (const day of day_options){
                const date_string = new Date(+new Date().setHours(0, 0, 0,0)+ 86400000*day).toLocaleDateString('fr-CA');
                _options.push({ value: day, label: date_string });
            }
            setOptions(_options);
        }
        fetchDayOption();
        fetchMealData(3);
    }, []);

    useEffect(() => {
        console.log("selected changed");
        fetchMealData(selected.value);
    },[selected]);

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