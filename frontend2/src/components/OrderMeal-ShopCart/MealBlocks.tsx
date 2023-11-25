/**
 * About the Order Block(Gathering the Meal Blocks) in ShopCart Page
 */

import { useEffect,useState } from 'react';
import { useParams} from 'react-router-dom';
import MealBlock from './MealBlock_ShopCart';
import { BACKEND_URL } from '../../constant';
import style from '../../style/OrderMeal-ShopCart/ShopCart.module.css'

export type Sort ={
    Order_ID:number,
    Pickup_TIme:string
}

export default function MealBlocks(){
    const param = useParams();
    const customerId = param.customerId;
    const [InTimeOrderList,setInTimeOrderList] = useState<Sort[]>([]);
    const [OutTimeOrderList,setOutTimeOrderList] = useState<Sort[]>([]);
    const send = true;
    const notsend = false;

    useEffect(()=>{
        const getAllOrders = async (Customer_ID:number)=>{
            const url = `${BACKEND_URL}/shopCart?Customer_ID=${Customer_ID}`;
            
            try{
                const result = await fetch(url).then((res)=>{return res.json();});
                let tempList1= [];
                let tempList2 =[];
                for (let i=0;i<result.length;i++){
                    if((new Date(result[i]['Pickup_Time'])).getTime()>(new Date()).getTime()){
                        tempList1.push(result[i])
                    }else{
                        tempList2.push(result[i])
                    }
                }
                setInTimeOrderList(tempList1.sort(function(a, b){
                    return ((new Date(a['Pickup_Time'])).getTime()-(new Date(b['Pickup_Time'])).getTime())
                }));
                setOutTimeOrderList(tempList2.sort(function(a, b){
                    return ((new Date(a['Pickup_Time'])).getTime()-(new Date(b['Pickup_Time'])).getTime())
                }));
            }
            catch(err){
                throw err;
            }
        }
        const abortController = new AbortController();
        getAllOrders(+(customerId!));
        return()=>{
            abortController.abort();
        }
    },[customerId])
    if( (InTimeOrderList.length!=0) || (OutTimeOrderList.length!=0)){
        return(
            <>
                <div className='MealBlocks'>
                    {InTimeOrderList.map(ele=>(
                        <MealBlock key={ele['Order_ID']} Order_ID={ele['Order_ID']} intime={send}/>
                    ))}
                </div>
                <div className='MealBlocks'>
                    {OutTimeOrderList.map(ele=>(
                        <MealBlock key={ele['Order_ID']} Order_ID={ele['Order_ID']} intime={notsend}/>
                    ))}
                </div>
            </>
        );
    }else{
        return (
            <>
                <div className={style.noOrder}>
                    <div>
                        <h2>～目前購物車無資料，請回到點餐頁進行您的點餐～</h2>
                    </div>
                    <div>
                        <img src={require('../../assets/bow.png')} alt='error' height='100vw'></img>
                    </div>
                </div>
            </>
        );
    }
    
}