import type { Meal } from '../../type'
import test_img from '../../assets/dumplings.jpg'
import style from '../../style/Meal/AllMealAddMealItem.module.css'
import Counter from '../shared/Counter'
import { BACKEND_URL } from '../../constant'
import { useState } from 'react'
import AddMealButton from './AddMealButton'
import { GrAdd } from "react-icons/gr"

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

export default function AllMealAddMealItem() {
  const [count, setCount] = useState(0);

  return (
    <div className={style.addMealItem_item}>
      <div className={style.addMealItem_attributeContainer}>
        <div className={style.addMealItem_mealContainer}>
          <div className={style.addMealItem_contentContainer}>
            <div className={style.addMealItem_title}>
              <input type="text" placeholder="餐點名稱" required>
              </input>
            </div>
          </div>

          <div className={style.addMealItem_otherContainer}>
            <div className={style.addMealItem_counterBox}>
              <div className={style.addMealItem_counter}>
                <Counter count={count} setCount={setCount} />
              </div>
              <div className={style.addMealItem_counterDescription}>預設庫存：</div>
            </div>
          </div>
        </div>

        <div className={style.addMealItem_buttonContainer}>
          <AddMealButton text="新增餐點" onClickFunc={() => {}}/>
        </div>
      </div>

      <div className={style.addMealItem_imgBox}>
        <GrAdd/>
      </div>
    </div>
  );
}