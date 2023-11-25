import MealBlock from './MealBlock_ShopCart';
import { useEffect,useState } from 'react';
import { useParams} from 'react-router-dom';
import { BACKEND_URL } from '../../constant';

export default function MealBlocks(){
    const param = useParams();
    const customerId = param.customerId;
    const [InTimeOrderList,setInTimeOrderList] = useState<number[]>([]);
    const [OutTimeOrderList,setOutTimeOrderList] = useState<number[]>([]);
    const send = true;
    const notsend = false;

    useEffect(()=>{
        const getAllOrders = async (Customer_ID:number)=>{
            const url = `${BACKEND_URL}/shopCart?Customer_ID=${Customer_ID}`;
            
            try{
                const result = await fetch(url).then((res)=>{return res.json();});
                let tempList1= []
                let tempList2 =[];
                for (let i=0;i<result.length;i++){
                    if((new Date(result[i]['Pickup_Time'])).getTime()>(new Date()).getTime()){
                        tempList1.push(result[i]['Order_ID'])
                    }else{
                        tempList2.push(result[i]['Order_ID'])
                    }
                }
                setInTimeOrderList(tempList1.sort().reverse());
                setOutTimeOrderList(tempList2.sort().reverse());
            }
            catch(err){
                throw err;
            }
        }
        const abortController = new AbortController();
        getAllOrders(+customerId!);
        return()=>{
            abortController.abort();
        }
    },[customerId])

    return(
        <>
            <div className='MealBlocks'>
                {InTimeOrderList.map(ele=>(
                    <MealBlock key={ele} Order_ID={ele} intime={send}/>
                ))}
            </div>
            <div className='MealBlocks'>
                {OutTimeOrderList.map(ele=>(
                    <MealBlock key={ele} Order_ID={ele} intime={notsend}/>
                ))}
            </div>
        </>

    );
}