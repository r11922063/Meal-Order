import type { Meal } from '../type'

export default function MealItem(meal: Meal) {
  return (
    <div className="meal_item">
        <div className="meal_img">
          <img src={process.env.PUBLIC_URL + '/images/dumplings.jpg'} alt={meal.Meal_Name} />
          {/* TODO: change to meal.Image_url */}
          {/* <img src={meal.Image_url} alt={meal.Meal_Name} /> */}
        </div>
        <div className="meal_content">
            <span className="meal_name">{meal.Meal_Name}</span>
            {/* TODO: price / number or amount */}
            {/* <span>{(meal.price * meal.count).toLocaleString()} تومان</span> */}
        </div>
    </div>
  );
}