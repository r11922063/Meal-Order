/**
 * About the Meal Block in Order Meal Page
 */

import { useState } from "react";
import MealItem from './MealItem_OrderMeal';
import { VendorAndMeal } from '../../type';
import style from '../../style/shared/DropDown.module.css';
import style1 from '../../style/OrderMeal-ShopCart/OrderMeal.module.css';

let Today = new Date();// Recent time 

/* For generating the drop-down options */
let DateTimeMap = new Map(); // Day-Time correspondence
const DayArray = new Array(); // Drop-Down of day options
const weekday = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']; // Transfer Date.getday() to chinese
const Mealinvsum = [false, false, false, false, false, false, false]; // Determine the meal is sold out or not
let temp_time = new Date(Today); // For generating the time options of drop down of time
temp_time.setHours(0);
temp_time.setMinutes(0);

for (let step = 0; step < 3; step++) {
    let temp = new Date(temp_time); // temp_time is used to add 15 mins at each iteration, while temp is used to map the date
    DayArray.push(temp_time.getFullYear().toString() + "," + (temp_time.getMonth() + 1).toString() + "," + temp_time.getDate().toString());
    let TimeArray = [];
    for (let i = 0; i < 96; i++) {
        if (temp_time > Today) {
            TimeArray.push(temp_time.getFullYear().toString() + ","
                + (temp_time.getMonth() + 1).toString() + "," + temp_time.getDate().toString() + "," + temp_time.getHours().toString() + "," + temp_time.getMinutes().toString() + "," + '00');
        }
        temp_time.setMinutes(temp_time.getMinutes() + 15);
    }
    DateTimeMap.set(temp.getFullYear().toString() + "," + (temp.getMonth() + 1).toString() + "," + temp.getDate().toString(), TimeArray);
}

export default function MealBlock({ meals }: { meals: VendorAndMeal[] }) {

    /* To determine whether the meal number >0 */
    for (let i = 0; i < meals.length; i++) {
        for (let j = 1; j < 8; j++) {
            if (!Mealinvsum[j - 1]) {
                const meal_num = meals[i]['Inventory'];
                if (meal_num[j.toString() as keyof typeof meal_num] > 0) { Mealinvsum[j - 1] = true; }
            }
        }
    }

    let today = new Date();
    const str = today.getFullYear().toString() + "," + (today.getMonth() + 1).toString() + "," + today.getDate().toString();
    const [date, setdate] = useState(str); // date: used to show the date(excluding hours, minutes, ...)
    const [time, settime] = useState(DateTimeMap.get(str)[0]); // time: used to show the date(including hours, minutes, ...)
    const [mealshowday, setmealshowday] = useState((Today.getDay()) == 0 ? 7 : (Today.getDay())); // mealshowday: the day, e.g. Mon., Tues.,...
    return (
        <div>
            <div className="DropDown">
                <select
                    value={date}
                    className={style.DropDown}
                    onChange={
                        e => {
                            setdate(e.target.value);
                            settime(DateTimeMap.get(e.target.value)[0]);
                            setmealshowday(((new Date(e.target.value)).getDay()) == 0 ? 7 : ((new Date(e.target.value)).getDay())); // Since the day 0 in Date Data represent Sun.
                        }
                    }
                >
                    {DayArray.map(ele => (
                        <option value={ele} key={ele}>
                            {((new Date(ele)).getMonth() + 1).toString() + " 月 " + (new Date(ele)).getDate().toString() + " 日 " + weekday[(new Date(ele).getDay())]}
                        </option>))
                    }
                </select>
                <select className={style.DropDown} value={time} onChange={e => {
                    settime(e.target.value);
                }}>
                    {(DateTimeMap.get(date)).map(function (obj: string) {
                        /* restore the time */
                        const num_time = obj.split(',');
                        const t_ = new Date(+num_time[0], +num_time[1], +num_time[2], +num_time[3], +num_time[4], +num_time[5]); 
                        /* generate option text */
                        let HourStr = t_.getHours()
                        let TimeStr = t_.getMinutes().toString();
                        if (TimeStr == '0') { TimeStr = TimeStr + '0' } // e.g. adjust 1:0 => 1:00
                        let CombineKeyStr = date + "," + HourStr + "," + TimeStr + ",00" // generate key value
                        let AMPM = '上午 '; // e.g. 19:00 => 下午 7:00 
                        if (HourStr > 12){ 
                            AMPM = '下午 ';
                            HourStr = HourStr-12;
                        }
                        let CombineStr = AMPM + " " + HourStr.toString() + ":" + TimeStr.toString() // Generate option value
                        return (
                            <option value={CombineKeyStr} key={CombineKeyStr}>
                                {CombineStr}
                            </option>
                        );
                    }
                    )}
                </select>
            </div>
            <div className={style1.mealblock}>
                {meals.map(ele => {
                    let meal_num = ele['Inventory'][mealshowday.toString() as keyof typeof ele['Inventory']] // Determine whether the meal is sold out 
                    if (meal_num > 0) {
                        return (
                            <div key={ele.Meal_ID.toString()} className={style1.insell}>
                                <MealItem meal={ele} inventory={meal_num} soldout={false} mealshowday={mealshowday} ordertime={time} />
                            </div>
                        );
                    }
                    else {
                        return (
                            <div key={ele.Meal_ID.toString()} className={style1.soldout}>
                                <MealItem meal={ele} inventory={meal_num} soldout={true} mealshowday={mealshowday} ordertime={time} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );

}

