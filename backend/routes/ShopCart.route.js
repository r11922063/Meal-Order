import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

const getAllOrders = async(req,res,next)=>{
    try{
        const cmd = 'Select `Order_ID`,`Pickup_Time` from `Order` \
                    where `Status` = "IN_CART" \
                    and `Customer_ID` = ? ' ;
        const Customer_ID = req.query.Customer_ID;
        const [rows,] = await query(cmd,[Customer_ID]);
        res.json(rows);
    }
    catch(err){
        throw err;
    }
}

const getOneOrder = async(req,res,next)=>{
    try{
        const cmd = 'with temp_t as (select ma.`Order_ID`,t1.`Name`, ma.`Pickup_Time`, ma.`Meal_List`, ma.`Cash_Amount` \
                    from `Order` ma inner join `Vendor` t1 where ma.`Vendor_ID` = t1.`Vendor_ID`) \
                    select * from temp_t where `Order_ID` = ?'
        const Order_ID = req.query.Order_ID;
        const [rows,] = await query(cmd,[Order_ID])
        res.json(rows);
    }
    catch(err){
        throw err;
    }
}

const getMealDetail = async(req, res, next) =>{
    try{
        const cmd = 'select `Meal_ID`, `Meal_Name`, `Price`, JSON_EXTRACT(`Inventory`,' + "'$."+'"?"'+
        "') as `Inv`,`Image_url` from `Meal` where `Meal_ID`=?";
        const Meal_ID = req.query.Meal_ID;
        const day = req.query.day;
        const [rows, fields] = await query(cmd,[+day,+Meal_ID]);
        res.json(rows);
    }
    catch(err){
        throw err;
    }
}

const postSubmitOrder = async (req, res, next) =>{
    const cmd1 = 'Select JSON_EXTRACT(`Inventory`,'+"'$."+'"?"'+"')<? as 'BanSubmit' from `Meal` where Meal_ID = ?"
    const cmd2_1 = 'Update `Order` set `Meal_List` = ?, `Status`= "WAIT_FOR_APPROVAL",`Cash_Amount`=? where `Order_ID` = ?;'
    const cmd2_2 = 'Update `Meal` set `Inventory` = JSON_REPLACE(INVENTORY,'+"'$."+'"?"'+"',round(JSON_EXTRACT(`Inventory`,'$."+'"?"'+"')-?)) where Meal_ID = ?"
    const Order_ID = req.body.Order_ID;
    const day = req.body.mealshowday;
    const Meal_List = req.body.Meal_List;
    const Cash_Amount = req.body.Cash_Amount;
    try{
        let BanSubmit=false;
        for (let i=0; i<Meal_List.length; i++){
            const [rows1,] = await query(cmd1,[day,Meal_List[i]['Amount'],Meal_List[i]['Meal_ID']]);
            if(rows1[0]['BanSubmit']){
                BanSubmit = true;
                break;
            }
        }
        if (BanSubmit){
            res.json({msg:true});
        }
        else{
            await query(cmd2_1,[JSON.stringify(Meal_List),Cash_Amount,Order_ID]);
            for (let i=0; i<Meal_List.length; i++){
                await query(cmd2_2,[day,day,Meal_List[i]['Amount'],Meal_List[i]['Meal_ID']]);
            }
            res.json({msg:false})
        }
    }catch(err){
        throw err;
    }
}

const DeleteOrder = async (req, res, next) =>{
    const cmd = 'delete from `Order` where `Order_ID`=?'
    try{
        const Order_ID = req.body.Order_ID;
        await query(cmd,[Order_ID]);
    }catch(err){
        throw err;
    }
}

const DeleteMealItem = async (req,res,next) =>{
    const cmd = 'Update `Order` set `Meal_List` = ?, `Cash_Amount`= ? where `Order_ID` = ?;'
    const Order_ID = req.body.Order_ID;
    let Meal_List = req.body.Meal_List;
    const Meal_ID = req.body.Meal_ID;
    let Cash_Amount = +req.body.Cash_Amount;
    const Meal_Price = req.body.Meal_Price;
    try{
        if(Meal_List.length==1){
            DeleteOrder(req);
        }else{
            for (let i=0;i<Meal_List.length;i++){
                if(Meal_List[i]['Meal_ID']==Meal_ID){
                    Cash_Amount = Cash_Amount - Meal_Price*Meal_List[i]['Amount'];
                    console.log(Cash_Amount)
                    Meal_List.splice(i,1);
                    break;
                }
            }
        }
        await query(cmd,[JSON.stringify(Meal_List),parseInt(Cash_Amount),Order_ID]);
        }catch(err){
        throw err;
    }
}

router.get('/',getAllOrders);
router.get('/oneorder',getOneOrder);
router.get('/detail',getMealDetail);
router.post('/SubmitOrder',postSubmitOrder);
router.post('/DeleteOrder',DeleteOrder);
router.post('/DeleteMealItem',DeleteMealItem)

export default router;