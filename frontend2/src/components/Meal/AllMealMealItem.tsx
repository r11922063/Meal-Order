import type { Meal } from '../../type'
import test_img from '../../assets/dumplings.jpg'
import style from '../../style/Meal/AllMealMealItem.module.css'
import Counter from '../shared/Counter'
import { BACKEND_URL } from '../../constant'
import { useState } from 'react'
import  BaseButton from '../shared/BaseButton'

const updateOnClick = (mealId: number, count: number) => {
  const update_url = `${BACKEND_URL}/allMeals/updateDefaultInventory`;
  fetch(update_url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mealId: mealId, count: count })
  }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

export default function AllMealMealItem({ meal }: {meal: Meal}) {
  const [count, setCount] = useState(meal.Default_Inventory);

  return (
    <div className={style.allMealMealItem_item}>
        <div className={style.allMealMealItem_contentContainer}>
            <span className={style.allMealMealItem_title}>{meal.Meal_Name}</span>
            {/* TODO: price / number or amount */}
            {/* <span>{(meal.price * meal.count).toLocaleString()} تومان</span> */}
        </div>

        <div className={style.allMealMealItem_otherContainer}>
          <div className={style.allMealMealItem_updateButtonBox}>
            <BaseButton text="更新" onClickFunc={() => updateOnClick(meal.Meal_ID, count)}/>
          </div>
          <div className={style.allMealMealItem_counterBox}>
            <div className={style.allMealMealItem_counter}>
              <Counter count={count} setCount={setCount} />
            </div>
            <div className={style.allMealMealItem_counterDescription}>預設庫存：</div>
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