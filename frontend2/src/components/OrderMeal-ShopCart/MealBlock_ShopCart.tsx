import { useEffect, useState } from 'react';
import style from '../../style/OrderMeal-ShopCart/ShopCart.module.css'
import {CustomerOrderDetail} from '../../type'
import MealItem from './MealItem_ShopCart';
import { BACKEND_URL } from '../../constant';

export default function MealBlock({Order_ID,intime}:{Order_ID:number,intime:boolean}){
    
    const [vendorName,setvendorName] = useState('');
    const [pickupTime,setPickupTime] = useState(new Date());
    const [cashAmount,setcashAmount] = useState(0);
    const [mealList,setMealList] = useState<CustomerOrderDetail[]>([]);
    let warning:boolean;

    const SubmitOrder = async (Order_ID:number,mealshowday:number,Meal_List:CustomerOrderDetail[], cashAmount:number) =>{
        const url = `${BACKEND_URL}/ShopCart/SubmitOrder`;
        let msg;
        try {
            msg = await fetch(url,{
                method:'POST',
                headers:{"Content-Type": "application/json",},
                body:JSON.stringify({
                    Order_ID:Order_ID,
                    mealshowday:mealshowday,
                    Meal_List:Meal_List,
                    Cash_Amount:cashAmount
                })
            }).then((res)=>{return res.json()});
        }catch(err){
            throw err
        }
        warning = msg['msg'];
    }

    const DeleteOrder = async (Order_ID:number) =>{
        const url = `${BACKEND_URL}/ShopCart/DeleteOrder`
        try{
            await fetch(url,{
                method:'POST',
                headers:{"Content-Type": "application/json",},
                body:JSON.stringify({
                    Order_ID:Order_ID
                })
            }).then((res)=>{return res.json()});
        }catch(err){
            throw err;
        }
    }

    useEffect(()=>{
        const abortController = new AbortController();
        const getOneOrder = async(Order_ID:number) =>{
            const url = `${BACKEND_URL}/shopCart/oneorder?Order_ID=${Order_ID}`
            try{
                const result = await fetch(url).then((res)=>{return res.json();})
                setvendorName(result[0]['Name']);
                setPickupTime(new Date(result[0]['Pickup_Time']));
                setMealList(result[0]['Meal_List']);
                setcashAmount(result[0]['Cash_Amount']);
                setMealList(result[0]['Meal_List']);
            }
            catch(err){
                throw err;
            }
        }
        getOneOrder(Order_ID);
       
        return()=>{
            abortController.abort();
        }
    },[Order_ID])

    let month = (pickupTime.getMonth()+1).toString();
    let date = pickupTime.getDate().toString();
    let day = pickupTime.getDay().toString();
    let daystrArray = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    let hour = pickupTime.getHours();
    let hour_str = '';
    if(hour<6){
        hour_str = '凌晨'+hour.toString();
    }
    else if((hour>=6)&&(hour<12)){
        hour_str = '早上'+hour.toString();
    }
    else if((hour==12)){
        hour_str = '中午'+hour.toString();
    }
    else if((hour>12)&&(hour<18)){
        hour_str = '下午'+(hour-12).toString();
    }
    else{
        hour_str = '晚上'+(hour-12).toString();
    }
    let minute = pickupTime.getMinutes().toString();
    if(minute=='0'){
        minute = '00'
    }else{
        minute = minute.toString();
    }
    
    if(intime){
        return(
            <>
                <div className={style.OneOrder}>
                    <div className={style.InfoAndButton}>
                        <div className={style.OrderInfo}>
                            <div>
                                <h1 className={style.ResName}>
                                    {vendorName}
                                </h1>
                                <p>
                                    取餐時間：{month} 月 {date} 日 {daystrArray[+day]}, {hour_str}:{minute}
                                </p>
                            </div>
                        </div>
                        <div className={style.button}>
                            <button className={style.Deletebutton} onClick={
                            async ()=>{
                            let check = window.confirm('確定一鍵刪除');
                            if(check){
                                DeleteOrder(Order_ID);
                                window.location.reload();
                            }
                        }}>一鍵刪除<img src={require('../../assets/delete.png')} height='17vw' ></img></button>
                        </div>
                    </div>
                    <div className={style.Meals}>
                        <div>
                            {mealList.map(ele=>(
                                <MealItem key={ele['Meal_ID']} Order_ID={Order_ID} mealList={mealList} 
                                setMealList={setMealList} Mealele={ele} mealshowday={(+day==0)?7:+day} initialcount={ele['Amount']} outofdate={false} 
                                cashAmount={cashAmount} setcashAmount={setcashAmount}/>
                            ))}
                        </div>

                    </div>
                    <div className={style.TotalAmount}>
                        <h4>
                            總計：NT${cashAmount}
                        </h4>
                    </div>
                    <div className={style.SendButton}>
                        <div >
                            <div>
                            </div>
                                <button className={style.sendButton} onClick={
                                    async ()=>{
                                        await SubmitOrder(Order_ID,(+day==0)?7:+day,mealList,cashAmount);
                                        if(warning){
                                            alert('您所預定的餐點中，有餐點數量已超過當下庫存量');
                                            window.location.reload();
                                        }
                                        else{
                                            window.location.reload();
                                        }
                                        }}>
                                    <img src={require('../../assets/checked.png')} height='17vw' ></img>確認送出
                                </button>    
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else{
        return(
            <div className={style.NotSendOrder}>
                <div className={style.OneOrder}>
                    <div className={style.InfoAndButton}>
                        <div className={style.OrderInfo}>
                            <div>
                                <h1 className={style.ResName}>
                                    {vendorName}(取餐時間已逾時)
                                </h1>
                                <p>
                                    取餐時間：{month} 月 {date} 日 {daystrArray[+day]}, {hour_str}:{minute}
                                </p>
                            </div>
                        </div>
                        <div className={style.button}>
                            <button className={style.Deletebutton} onClick={()=>{console.log('no');}}>
                            一鍵刪除<img src={require('../../assets/delete.png')} height='17vw' ></img></button>
                        </div>
                    </div>
                    <div className={style.Meals}>
                        <div>
                            {mealList.map(ele=>(
                                <MealItem key={ele['Meal_ID']}  Order_ID={Order_ID} mealList={mealList} 
                                setMealList={setMealList} Mealele={ele} mealshowday={(+day==0)?7:+day} initialcount={ele['Amount']} outofdate={true} 
                                cashAmount={cashAmount} setcashAmount={setcashAmount}/>
                            ))}
                        </div>
                    </div>
                    <div className={style.TotalAmount}>
                        <h4>
                            總計：NT${cashAmount}
                        </h4>
                    </div>
                    <div className={style.SendButton}>
                        <div >
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}