import type { Meal } from '../../type'
import style from '../../style/Meal/AllMealMealItem.module.css'
import Counter from '../shared/Counter'
import { useEffect, useState } from 'react'
import type { MealAmountOption } from '../../type'

export default function MealAmountMealItem({ meal, setMeals, day }: 
                                           {meal: Meal, setMeals: any, day: MealAmountOption}) {
  const [count, setCount] = useState(meal.Inventory[day.value.toString()]);
  // const [count, setCount] = useState(meal.Default_Inventory);
  
  useEffect(() => {
    setCount(meal.Inventory[day.value.toString()]);
  }, [day]);

  useEffect(()=>{
    setMeals((prevValue: Meal[]) => {
      return prevValue.map((mealobj) => {
        if (mealobj.Meal_ID === meal.Meal_ID) {
          const day_string = day.value.toString();

          mealobj.Inventory[day_string] = count;
        }
        return mealobj;
      });
    });
  }, [count]);

  return (
    <div className={style.allMealMealItem_item}>
        <div className={style.allMealMealItem_contentContainer}>
            <span className={style.allMealMealItem_mealName}>{meal.Meal_Name}</span>
            {/* TODO: price / number or amount */}
            <span className={style.allMealMealItem_price}>NT${meal.Price}</span>
        </div>

        <div className={style.allMealMealItem_otherContainer}>
          <div className={style.allMealMealItem_counterBox}>
            <div className={style.allMealMealItem_counter}>
              <Counter count={count} setCount={setCount} />
            </div>
            <div className={style.allMealMealItem_counterDescription}>庫存：</div>
          </div>
          
        </div>

        <div className={style.allMealMealItem_imgBox}>
          <img src={require(`../../assets/meal_imgs/${meal.Image_url}`)} className={style.allMealMealItem_img} alt={meal.Meal_Name} />
        </div>
    </div>
  );
}