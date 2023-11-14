import type { Meal } from '../type'
import test_img from '../assets/dumplings.jpg'
import style from '../style/shared/MealItem.module.css'

export default function MealItem(meal: Meal) {
  return (
    <div className={style.mealItem_item}>
        <div className={style.mealItem_content}>
            <span className={style.mealItem_title}>{meal.Meal_Name}</span>
            {/* TODO: price / number or amount */}
            {/* <span>{(meal.price * meal.count).toLocaleString()} تومان</span> */}
        </div>
        <div className={style.mealItem_img}>
          <img src={test_img} alt={meal.Meal_Name} />
          {/* TODO: change to meal.Image_url */}
          {/* <img src={meal.Image_url} alt={meal.Meal_Name} /> */}
        </div>
        
    </div>
  );
}