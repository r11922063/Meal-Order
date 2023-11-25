import {CustomerOrderDetail} from "../../type";
import { BACKEND_URL } from "../../constant";
import { useEffect,useState } from "react";
import style from '../../style/OrderMeal-ShopCart/ShopCart.module.css'
import Counter from './Counter_ShopCart';

export default function MealItem({Order_ID, Mealele, mealshowday, initialcount, setMealList, mealList, outofdate, cashAmount, setcashAmount}:
    {Order_ID:number,Mealele:CustomerOrderDetail, mealshowday:number, initialcount:number, setMealList:(x:CustomerOrderDetail[])=>void,mealList:CustomerOrderDetail[], outofdate:boolean, cashAmount:number,setcashAmount:(x:number)=>void}){

    const Meal_ID = Mealele['Meal_ID'];
    const Amount = Mealele['Amount'];
    const [MealName,setMealName] = useState('');
    const [MealPrice,setMealPrice] = useState(0);
    const [MealInv,setMealInv] = useState(0);
    const [ImgUrl,setImgUrl] = useState('');
    const day = mealshowday; 

    const [count,setCount] = useState(initialcount);

    const DeleteMealItem = async (Order_ID:number,Meal_List:CustomerOrderDetail[],Meal_ID:number,cashAmount:number,MealPrice:number) => {
        const url = `${BACKEND_URL}/ShopCart/DeleteMealItem`
        try{
            await fetch(url,{
                method:'POST',
                headers:{"Content-Type": "application/json",},
                body:JSON.stringify({
                    Order_ID:Order_ID,
                    Meal_List:Meal_List,
                    Meal_ID:Meal_ID,
                    Cash_Amount:cashAmount,
                    Meal_Price:MealPrice
                })
            }).then((res)=>{return res.json()});
        }catch(err){
            throw err;
        }
    }

    useEffect(()=>{
        const getMealDetail = async (Meal_ID:number, mealshowday:number) => {
            const url = `${BACKEND_URL}/shopCart/detail?Meal_ID=${Meal_ID}&day=${mealshowday}`;
            try{
                const result = await fetch(url).then((res) => { return res.json(); });
                setMealName(result[0]['Meal_Name']);
                setMealPrice(result[0]['Price']);
                setMealInv(result[0]['Inv']);
                setImgUrl(result[0]['Image_url'])
            }catch (err){
                throw err;
            }
        }
        const abortController = new AbortController();
        getMealDetail(Meal_ID,day);
        return()=>{
            abortController.abort();
        }
    },[Meal_ID,day])
    
    if(outofdate){
        return(
            <>
                <div className={style.MealBox} id={(Meal_ID).toString()}>
                    <div className={style.MealBox_Text}>
                        <div className={style.TitleDollarInv}>
                            <div className={style.TitleDollar}>
                                <h3>餐點名稱:{MealName}</h3>
                                <p>NT${MealPrice}</p>
                            </div>
                            <div className={style.Inv}>
                                <p>庫存：{MealInv}</p>
                            </div>
                        </div>
                        <div className={style.NumDollarButton}>
                            <div className={style.test}>
                                共{Amount}個，小計{count*MealPrice}元
                            </div>
                        </div>
                    </div>
                    <div className={style.Meal_img} >
                        <img src={ImgUrl} alt='test' width='100%' height='100%'/>
                    </div>
                </div>
            </>
        );
    }else{
        return(
            <>
                <div className={style.MealBox} id={(Meal_ID).toString()}>
                    <div className={style.MealBox_Text}>
                        <div className={style.TitleDollarInv}>
                            <div className={style.TitleDollar}>
                                <h3>餐點名稱:{MealName}</h3>
                                <p>NT${MealPrice}</p>
                            </div>
                            <div className={style.Inv}>
                                <p>庫存：{MealInv}</p>
                            </div>
                        </div>
                        <div className={style.NumDollarButton}>
                            <div className={style.test}>
                                總共
                            </div>
                            <div className={style.counter}>
                                <Counter mealID={Meal_ID} count={count} setCount={setCount} maxinv={MealInv} setMealList={setMealList} mealList={mealList} cashAmount={cashAmount} setcashAmount={setcashAmount} MealPrice={MealPrice}/>
                            </div>
                            <div className={style.insertNum}>
                                項，小計{MealPrice*count}元
                            </div>
                            <div >
                                <button className={style.MealEleDel} onClick={async()=>{
                                    let check = window.confirm('確定刪除?');
                                    if(check){
                                        DeleteMealItem(Order_ID,mealList,Meal_ID,cashAmount,MealPrice);
                                        window.location.reload();
                                    }
                                }}>
                                    <img src={require('../../assets/delete.png')} height='25vw'></img>
                                </button>
                            </div>
    
                        </div>
                    </div>
                    <div className={style.Meal_img} >
                        <img src={ImgUrl} alt='test' width='100%' height='100%'/>
                    </div>
                </div>
            </>
        );
    }


    
}