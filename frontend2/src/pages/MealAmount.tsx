import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Meal } from '../type'
import MealAmountMealItem from "../components/Meal/MealAmountMealItem";
import { BACKEND_URL } from '../constant'
import style from '../style/Meal/AllMeal.module.css'
import BaseButton from "../components/shared/BaseButton";
import { MealAmountOption, MealAmountSelectOption } from "../type";
import MealAmountSelect from '../components/Meal/MealAmountSelect'

export default function MealAmount() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const { vendorId } = useParams();

    const today = new Date().getDay();
    // For BaseSelector
    const [options, setOptions] = useState<MealAmountSelectOption>([]);
    const [selected, setSelected] = useState<MealAmountOption>({ value: (today-1+3)%7+1, label: "請選擇時間" });
    const optionOnChange = (e: any) => {
        const option_found = options.find((option: MealAmountOption) => {
            return option.value.toString() === e.target.value;
        });
        setSelected(
            option_found? option_found : selected
        );
    };

    useEffect(() => {
        function fetchDayOption(){
            var _options: MealAmountSelectOption = [];
            // +3 ~ +6
            const day_offsets = [3, 4, 5, 6];
            for (const offset of day_offsets){
                const day_num = (today-1 + offset)%7+1;
                var date_string = new Date(+new Date().setHours(0, 0, 0,0)+ 86400000*offset).toLocaleDateString('zh-TW',
                {  month: 'long', day: 'numeric', weekday: 'long' });
                date_string = date_string.replace('星期', '週');
                _options.push({ value: day_num, label: date_string });
            }
            setOptions(_options);
        }
        fetchDayOption();

        async function fetchMealData() {
            try {
                const res = await fetch(
                    BACKEND_URL + `/mealAmount?vendorId=${vendorId}}`
                ).then(res => { return res.json(); });
    
                setMeals(res);
            } catch (e) {
                console.log("Error fetching all_meals from backend: ", e);
            }
        };
        fetchMealData();
    }, []);

    // For update button
    const updateOnClick = () => {
        const update_url = `${BACKEND_URL}/mealAmount/updateAllInventory`;
        const meals_data: Record<string, number | Record<string, number>>[] = [];
        console.log("updateOnClick");
        for (const meal of meals){
            console.log(`Meal ${meal.Meal_Name}: ${meal.Inventory[selected.value]}`);
        }
        for (const meal of meals)
            meals_data.push({ mealId: meal.Meal_ID, inventory: meal.Inventory });
        
        fetch(update_url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meals_data)
        }).then((res) => {
            if (!res.ok){
                console.log(res.status);
                throw new Error('Network response was not ok');
            }
            var selected_day = "";
            for (const option of options){
                if (option.value == selected.value)
                    selected_day = option.label;
            }
            if (selected_day != "")
                alert(`${selected_day} 的餐點數量更新成功！`);
            // return res.json();
        })
        //   .then((data) => {
        //     alert(`${selected} 的餐點數量更新成功！`);
        //     console.log(data);
        // })
          .catch((err) => console.log(err));
    }

    return (
        <>
        < MealAmountSelect options={options} onChangeFunc={optionOnChange} 
                     value={selected.value} />

        <div className={style.meal_container}>
            {meals.length > 0 ? (
                <div>
                    <div className={style.meal_itemBox}>
                        {meals.map((meal) => (
                        <MealAmountMealItem key={meal.Meal_ID} meal={meal} setMeals={setMeals} day={selected} />
                        ))}
                    </div>
                
                    <div className={style.meal_updateButtonBox}>
                        <BaseButton text="更新" onClickFunc={() => updateOnClick()}/>
                    </div>
                </div>

            ) : (
                <div className="all_meals_empty">
                    <span className="all_meals_empty_title">No meals.</span>
                </div>
            )}
        </div>
        </>
    );
    
}