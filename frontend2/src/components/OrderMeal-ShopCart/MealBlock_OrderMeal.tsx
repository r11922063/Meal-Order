import { useState } from "react";
import MealItem from './MealItem_OrderMeal';
import { VendorAndMeal } from '../../type';
import style from '../../style/shared/DropDown.module.css';
import style1 from '../../style/OrderMeal-ShopCart/OrderMeal.module.css';

const Today = new Date();// Recent time 

/* For generating the drop-down options */
let DateTimeMap = new Map(); // Day-Time correspondence
const DayArray = new Array(); // Drop-Down of day options
const weekday =['週日', '週一', '週二', '週三', '週四', '週五', '週六']; // Transfer Date.getday() to chinese
const Mealinvsum=[false,false,false,false,false,false,false]; // Determine the meal is sold out or not
let temp_time = new Date(Today); // For generating the time options of drop down of time
temp_time.setHours(0);
temp_time.setMinutes(0);

for (let step = 0; step < 3; step++){
    let temp = new Date(temp_time);
    DayArray.push(temp_time.getFullYear().toString()+","+(temp_time.getMonth()+1).toString()+","+temp_time.getDate().toString());
    let TimeArray = [];
    for(let i=0;i<96;i++){
        if(temp_time>Today){
            TimeArray.push(temp_time.getFullYear().toString()+","
            +(temp_time.getMonth()+1).toString()+","+temp_time.getDate().toString()+","+temp_time.getHours().toString()+","+temp_time.getMinutes().toString()+","+'00');
        }
        temp_time.setMinutes(temp_time.getMinutes()+15);
    }
    DateTimeMap.set(temp.getFullYear().toString()+","+(temp.getMonth()+1).toString()+","+temp.getDate().toString(),TimeArray);
}

export default function MealBlock({meals}:{meals:VendorAndMeal[]}){
    
    for (let i=0;i<meals.length;i++){
        for (let j=1;j<8;j++){
            if (!Mealinvsum[j-1]){
                const meal_num = meals[i]['Inventory'];
                if(meal_num[j.toString() as keyof typeof meal_num]>0){
                    Mealinvsum[j-1]=true;
                }
            }
        }
    }

    const today = new Date();
    const str = today.getFullYear().toString()+","+(today.getMonth()+1).toString()+","+today.getDate().toString();
    const [date, setdate] = useState(str);
    const tt = DateTimeMap.get(str);
    const [time, settime] = useState(tt[0]);
    const [mealshowday,setmealshowday] = useState((Today.getDay())== 0 ? 7:(Today.getDay()));
    return(
        <div>
            <div className="DropDown">
                <select 
                    value={date}
                    className={style.DropDown} 
                    onChange={
                        e=>{
                            setdate(e.target.value);
                            settime(DateTimeMap.get(e.target.value)[0]);
                            setmealshowday(((new Date(e.target.value)).getDay())== 0 ? 7:((new Date(e.target.value)).getDay()));
                        }
                    }>
                    {DayArray.map(ele => (
                        <option value={ele} key={ele}>
                            {((new Date(ele)).getMonth()+1).toString()+" 月 "+ (new Date(ele)).getDate().toString()+" 日 "+weekday[(new Date(ele).getDay())]}
                        </option>))
                    }
                </select>
                <select className={style.DropDown}  value={time} onChange={e=>{
                    settime(e.target.value);
                }}>
                    {(DateTimeMap.get(date)).map(function(obj:string)
                        {
                        const num_time = obj.split(',')
                        const t_ = new Date(+num_time[0],+num_time[1],+num_time[2],+num_time[3],+num_time[4],+num_time[5])
                        let HourStr = t_.getHours()
                        let TimeStr = t_.getMinutes().toString();
                        if(TimeStr=='0'){TimeStr = TimeStr.toString() +'0'}
                        else{TimeStr = TimeStr.toString()}
                        let CombineKeyStr = date+"," + HourStr + "," + TimeStr + ",00"
                        let AMPM = '凌晨';
                        if((HourStr>=6)&&(HourStr<12)){AMPM = '早上';}
                        else if(HourStr==12){AMPM = '中午';}
                        else if((HourStr>12)&&(HourStr<18)){
                            AMPM = '下午';
                            HourStr = HourStr -12
                        }else if((HourStr>=18)){
                            AMPM = '晚上';
                            HourStr = HourStr -12
                        }
                        
                        let CombineStr = AMPM + " " + HourStr.toString() + ":" + TimeStr.toString()
                        return(
                        <option value={CombineKeyStr} key={CombineKeyStr}>
                            {CombineStr}
                        </option>
                        );}
                        )}
                </select>
            </div>
            <div className={style1.mealblock}>
                {meals.map(ele=>{
                    let meal_num = ele['Inventory'][mealshowday.toString() as keyof typeof ele['Inventory']]
                    if (meal_num>0){
                        return (
                            <div key={ele.Meal_ID.toString()} className={style1.insell}>
                                <MealItem meal={ele} inventory={meal_num} soldout={false} mealshowday={mealshowday} ordertime={time}/>
                            </div>
                        );
                    }
                    else{
                        return(
                            <div key={ele.Meal_ID.toString()} className={style1.soldout}>
                                <MealItem meal={ele} inventory={meal_num} soldout={true} mealshowday={mealshowday} ordertime={time}/>
                            </div>
                            );
                    }
                })}
            </div>
        </div>
    
    );
    
}

