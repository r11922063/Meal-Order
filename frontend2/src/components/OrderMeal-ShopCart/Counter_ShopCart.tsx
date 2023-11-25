import { CgAdd, CgRemove } from "react-icons/cg";
import style from "../../style/shared/Counter.module.css";
import { CustomerOrderDetail } from '../../type';


export default function Counter({ mealID, count, setCount, maxinv, setMealList, mealList, cashAmount, setcashAmount, MealPrice }:
    { mealID: number, count: number, setCount: (c: number) => void, maxinv: number, setMealList: (x: CustomerOrderDetail[]) => void, mealList: CustomerOrderDetail[], cashAmount: number, setcashAmount: (x: number) => void, MealPrice: number }) {

    const handleInput = (text: any) => {
        const number = Number(text);
        if (!isNaN(number)) {
            setCount(number);
            setMealList(mealList);
            setcashAmount(cashAmount);
            console.log("count updated");
        }
    };

    return (
        <div className={style.counter_buttons}>
            <span
                onClick={() => {
                    setCount(Math.max(0, count - 1));
                    let temp_mealList: CustomerOrderDetail[] = mealList;
                    for (let i = 0; i < mealList.length; i++) {
                        if (temp_mealList[i]['Meal_ID'] === mealID) {
                            temp_mealList[i]['Amount'] = Math.max(0, count - 1);
                        }
                    }
                    setMealList(temp_mealList);
                    setcashAmount(cashAmount - MealPrice * count + MealPrice * (Math.max(0, count - 1)));
                }}
                className={style.counter_plus}
            >
                <CgRemove />
            </span>

            <span className={style.counter_number} contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) => handleInput(e.currentTarget.textContent)} >{count}
            </span>

            <span
                onClick={() => {
                    setCount(Math.min(maxinv, count + 1));
                    let temp_mealList: CustomerOrderDetail[] = mealList;
                    for (let i = 0; i < mealList.length; i++) {
                        if (temp_mealList[i]['Meal_ID'] === mealID) {
                            temp_mealList[i]['Amount'] = Math.min(maxinv, count + 1);
                        }
                    }
                    setMealList(temp_mealList);
                    setcashAmount(cashAmount - MealPrice * count + MealPrice * (Math.min(maxinv, count + 1)))
                }}
                className={style.counter_minus}
            >
                <CgAdd />
            </span>

        </div>
    );
}