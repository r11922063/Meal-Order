/**
 * About the Counter for the ShopCart Page.
 */

import { CgAdd, CgRemove } from "react-icons/cg";
import style from "../../style/shared/Counter.module.css";
import { CustomerOrderDetail } from '../../type';


export default function Counter({ mealID, count, setCount, maxinv, setMealList, mealList, cashAmount, setcashAmount, MealPrice }:
    { mealID: number, count: number, setCount: (c: number) => void, maxinv: number, setMealList: (x: CustomerOrderDetail[]) => void, mealList: CustomerOrderDetail[], cashAmount: number, setcashAmount: (x: number) => void, MealPrice: number }) {

    const handleInput = (text: any) => {
        const number = Number(text);
        if (!isNaN(number)) {
            if(+number===0 || +number>maxinv){
                alert('Warning!單品項數量不得為0或超過庫存!');   
            }
            setCount(number);
            setcashAmount(cashAmount - MealPrice * count + MealPrice * number);
            let temp_mealList: CustomerOrderDetail[] = mealList;
            for (let i = 0; i < mealList.length; i++) {
                if (temp_mealList[i]['Meal_ID'] === mealID) {
                    temp_mealList[i]['Amount'] = number;
                }
            }
            setMealList(temp_mealList);
            
            console.log(mealList)
            console.log(cashAmount)
            console.log(count)
                
        }
    };

    return (
        <div className={style.counter_buttons}>
            <span
                onClick={() => {
                    if(count>maxinv){
                        setCount(maxinv);
                        let temp_mealList: CustomerOrderDetail[] = mealList;
                        for (let i = 0; i < mealList.length; i++) {
                            if (temp_mealList[i]['Meal_ID'] === mealID) {
                                temp_mealList[i]['Amount'] = maxinv;
                            }
                        }
                        setMealList(temp_mealList);
                        setcashAmount(cashAmount - MealPrice * count + MealPrice * maxinv);
                    }
                    else{
                        setCount(Math.max(1, count - 1));
                        let temp_mealList: CustomerOrderDetail[] = mealList;
                        for (let i = 0; i < mealList.length; i++) {
                            if (temp_mealList[i]['Meal_ID'] === mealID) {
                                temp_mealList[i]['Amount'] = Math.max(1, count - 1);
                            }
                        }
                        setMealList(temp_mealList);
                        setcashAmount(cashAmount - MealPrice * count + MealPrice * (Math.max(1, count - 1)));
                    }
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
                    setCount(Math.max(Math.min(maxinv, count + 1),1));
                    let temp_mealList: CustomerOrderDetail[] = mealList;
                    for (let i = 0; i < mealList.length; i++) {
                        if (temp_mealList[i]['Meal_ID'] === mealID) {
                            temp_mealList[i]['Amount'] = Math.max(Math.min(maxinv, count + 1),1);
                        }
                    }
                    setMealList(temp_mealList);
                    setcashAmount(cashAmount - MealPrice * count + MealPrice * (Math.max(Math.min(maxinv, count + 1),1)))
                }}
                className={style.counter_minus}
            >
                <CgAdd />
            </span>

        </div>
    );
}