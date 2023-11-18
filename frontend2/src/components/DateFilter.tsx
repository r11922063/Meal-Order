import { useState } from "react";
import style from '../style/shared/DropDown.module.css';
import style1 from '../style/OrderMeal.module.css';

export type Meals = {
    Vendor_img: string,
    Meal_ID:number,
    Name: string,
    Address: string,
    Meal_Name: string, 
    Description?: string,
    Price: number,
    Inventory: {"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number}, 
    Image_url: string;
};

const Today = new Date();//Store the time now
let day = new Date(Today); //Store the time begin 0:00 today
day.setHours(0);
day.setMinutes(0);

const weekday =['週日', '週一', '週二', '週三', '週四', '週五', '週六']; 
let DateTimeMap = new Map();
const DayArray = new Array();

const Mealinvsum=[false,false,false,false,false,false,false];

for (let step = 0; step < 3; step++){
    let temp = new Date(day);
    DayArray.push(day.getFullYear().toString()+","+(day.getMonth()+1).toString()+","+day.getDate().toString());
    let TimeArray = [];
    for(let i=0;i<96;i++){
        if(day>Today){
            TimeArray.push(day.getFullYear().toString()+","
            +(day.getMonth()+1).toString()+","+day.getDate().toString()+","+day.getHours().toString()+","+day.getMinutes().toString()+","+day.getSeconds().toString());
        }
        day.setMinutes(day.getMinutes()+15);
    }
    DateTimeMap.set(temp.getFullYear().toString()+","+(temp.getMonth()+1).toString()+","+temp.getDate().toString(),TimeArray);
}

/*
function SoldOutShow({mealshowday}:{mealshowday:number}){
    if(!Mealinvsum[mealshowday-1]){
        alert('全數商品已銷售完畢!\n請選擇別天!')
    }
}
*/

export default function DateFilter({meals}:{meals:Meals[]}){
    
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
                        var HourStr = t_.getHours()
                        var TimeStr = t_.getMinutes().toString();
                        if(TimeStr=='0'){TimeStr = TimeStr.toString() +'0'}
                        else{TimeStr = TimeStr.toString()}
                        var CombineKeyStr =  HourStr + ":" + TimeStr
                        var AMPM = '凌晨';
                        if((HourStr>=6)&&(HourStr<12)){AMPM = '早上';}
                        else if(HourStr==12){AMPM = '中午';}
                        else if((HourStr>12)&&(HourStr<18)){
                            AMPM = '下午';
                            HourStr = HourStr -12
                        }else if((HourStr>=18)){
                            AMPM = '晚上';
                            HourStr = HourStr -12
                        }
                        
                        var CombineStr = AMPM + " " + HourStr.toString() + ":" + TimeStr.toString()
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
                    if (meal_num!=0){
                        return (
                            <div key={ele.Meal_ID.toString()} className={style1.insell}>
                                <h1>
                                    餐點名稱：{ele['Meal_Name']}
                                </h1>
                                <p>
                                    餐點描述：{ele['Description']}
                                </p>
                                <p>
                                    餐點價格：{ele['Price']}
                                </p>
                                <p>
                                    餐點庫存：{meal_num}
                                </p>
                                <img src={ele['Image_url']} alt='error' height='100vw'></img>
                            </div>
                        );
                    }
                    else{
                        return(
                            <div key={ele.Meal_ID.toString()} className={style1.soldout}>
                                <h1>
                                    餐點名稱：{ele['Meal_Name']}
                                </h1>
                                <p>
                                    餐點描述：{ele['Description']}
                                </p>
                                <p>
                                    餐點價格：{ele['Price']}
                                </p>
                                <p>
                                    餐點庫存：{meal_num}
                                </p>
                                <img src={ele['Image_url']} alt='error' height='100vw'></img>
                            </div>
                    );
                    }
                })}
            </div>
        </div>
    
    );
    
}

