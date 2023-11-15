import { useState } from "react";
import style from '../style/shared/DropDown.module.css'


const Today = new Date();

const weekday =['週日', '週一', '週二', '週三', '週四', '週五', '週六']; 
let DateTimeMap = new Map();

let day = new Date(Today);
day.setHours(0);
day.setMinutes(0);

const DayArray = new Array();

for (let step = 0; step < 7; step++){
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

export default function DateFilter(){
    const today = new Date();
    const str = today.getFullYear().toString()+","+(today.getMonth()+1).toString()+","+today.getDate().toString();
    const [date, setdate] = useState(str);
    const tt = DateTimeMap.get(str);
    const [time, settime] = useState(tt[0]);
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
                        console.log(t_)
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
        </div>
    
    );
    
}
