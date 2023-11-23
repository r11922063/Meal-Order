import { useState } from "react";
import style from '../style/shared/Vendor.module.css'
const Today = new Date();

const weekday =['週日', '週一', '週二', '週三', '週四', '週五', '週六']; 

const DayArray = new Array();

for (let step = 0; step < 3; step++){
    // DayArray.push(day.getFullYear().toString() + "," + (day.getMonth()+1).toString() + "," + day.getDate().toString());
    let day = new Date(Today);
    day.setDate(day.getDate() + step);
    DayArray.push(day);
}

export default function Vendor() {
    return (
        <div>
            <h1> 我的訂單 </h1>
            <select className={style.DropDown}> 
                {DayArray.map(ele => (
                    <option value={ele} key={ele}>
                        {((new Date(ele)).getMonth()+1).toString() + " 月 " + (new Date(ele)).getDate().toString() + " 日 " + weekday[(new Date(ele).getDay())]}
                    </option>))
                }
            </select>
            <div className={style.YellowContainer}>
                <p>This is your content inside the yellow container.</p>
            </div>
            <div className={style.GreenContainer}>
                <p>This is your content inside the green container.</p>
            </div>
            <div className={style.RedContainer}>
                <p>This is your content inside the red container.</p>
            </div>
        </div>
        
        
        
    );
}