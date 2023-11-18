import type { Meal } from '../../type'
import test_img from '../../assets/dumplings.jpg'
import style from '../../style/Meal/AllMealMealItem.module.css'
import Counter from '../shared/Counter'
import { useEffect, useState } from 'react'

export default function MealAmountMealItem({ meal, setMeals }: {meal: Meal, setMeals: any}) {
  const [count, setCount] = useState(meal.Default_Inventory);
  
  useEffect(()=>{
    setMeals((prevValue: Meal[]) => {
      return prevValue.map((mealobj) => {
        if (mealobj.Meal_ID === meal.Meal_ID) 
          mealobj.Inventory["1"] = count;
        return mealobj;
      });
    });
  }, [count]);

  return (
    <div className={style.allMealMealItem_item}>
        <div className={style.allMealMealItem_contentContainer}>
            <span className={style.allMealMealItem_title}>{meal.Meal_Name}</span>
            {/* TODO: price / number or amount */}
            {/* <span>{(meal.price * meal.count).toLocaleString()} تومان</span> */}
        </div>

        <div className={style.allMealMealItem_otherContainer}>
          <div className={style.allMealMealItem_counterBox}>
            <div className={style.allMealMealItem_counter}>
              <Counter count={count} setCount={setCount} />
            </div>
            <div>
              <p>庫存：</p>
            </div>
          </div>
          
        </div>

        <div className={style.allMealMealItem_img}>
          <img src={test_img} alt={meal.Meal_Name} />
          {/* TODO: change to meal.Image_url */}
          {/* <img src={meal.Image_url} alt={meal.Meal_Name} /> */}
        </div>
    </div>
  );
}