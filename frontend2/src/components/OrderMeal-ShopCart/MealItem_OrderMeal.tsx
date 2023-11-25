import {VendorAndMeal} from '../../type';
import style from '../../style/OrderMeal-ShopCart/OrderMeal.module.css';
import { useEffect, useState } from 'react';
import Counter from './Counter_OrderMeal';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constant';


export default function MealItem({meal,inventory,soldout,mealshowday,ordertime}:{meal:VendorAndMeal, inventory:number, soldout:boolean, mealshowday:number, ordertime:string}){
    //below is to get the insert information to database
    const param = useParams();//website parameters
    const Customer_ID = param.customerId; 
    const Vendor_ID = param.vendorId; 
    const pickuptime = ordertime;
    const [count, setCount] = useState(0);
    let warning:boolean;
    
    const AddCart = async (mealshowday:number,Customer_ID:number,Vendor_ID:number,pickuptime:string,count:number,meal_ID:number,Cash_Amount:number)=>{
        const url = `${BACKEND_URL}/orderMeal/addadjustMealList`;
        let t;
        try{
            t = await fetch(url,{
                method:'POST',
                headers:{"Content-Type": "application/json",},
                body:JSON.stringify({day:mealshowday,
                                    Customer_ID:Customer_ID,
                                    Vendor_ID:Vendor_ID,
                                    pickuptime:pickuptime,
                                    count:count,
                                    meal_ID:meal_ID,
                                    Cash_Amount:Cash_Amount
                })
            }).then((res) => {return res.json()});
        }catch(err){
            throw err;
        }
        warning = (t['msg']);
    }
    
    if(soldout){
        return(
            <div className={style.MealBox} id={(meal.Meal_ID).toString()}>
                <div className={style.MealBox_Text}>
                    <div className={style.TitleDollarInv}>
                        <div className={style.TitleDollar}>
                            <h3>餐點名稱:{meal.Meal_Name}</h3>
                            <p>NT${meal.Price}</p>
                        </div>
                        <div className={style.Inv}>
                            <p>庫存：{inventory}</p>
                        </div>
                    </div>
                    <div className={style.NumDollarButton}>
                        <div className={style.insertNum}>
                        </div>
                        <button className={style.baseButton_button_disable} disabled>
                            已售完
                        </button>
                    </div>
                </div>
                <div className={style.Meal_img} >
                    <img src={meal.Image_url} alt='test' width='100%' height='100%'/>
                </div>
            </div>
        );
    }
    else{
        return(
            <div className={style.MealBox} id={(meal.Meal_ID).toString()}>
                <div className={style.MealBox_Text}>
                    <div className={style.TitleDollarInv}>
                        <div className={style.TitleDollar}>
                            <h3>餐點名稱:{meal.Meal_Name}</h3>
                            <p>NT${meal.Price}</p>
                        </div>
                        <div className={style.Inv}>
                            <p>庫存：{inventory}</p>
                        </div>
                    </div>
                    <div className={style.NumDollarButton}>
                        <div className={style.test}>
                            新增
                        </div>
                        <div className={style.counter}>
                            <Counter count={count} setCount={setCount} maxinv={inventory}/>
                        </div>
                        <div className={style.insertNum}>
                            項，共計{meal.Price*count}元
                        </div>
                        <button className={style.baseButton_button} onClick={async ()=> {
                            await AddCart(mealshowday, +Customer_ID!, +Vendor_ID!, pickuptime,count,meal.Meal_ID,meal.Price*count)
                            if(warning){
                                alert('您選擇的餐點數量為零或已超過當下庫存量!');
                            }
                            }}>
                            加入購物車
                        </button>
                    </div>
                </div>
                <div className={style.Meal_img} >
                    <img src={meal.Image_url} alt='test' width='100%' height='100%'/>
                </div>
            </div>
        );
    }
    
}