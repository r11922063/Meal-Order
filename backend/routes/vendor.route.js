import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

const getOrders = async (req, res, next) => {
    const vendorId = req.query.vendorId;
    try {
        const query_str = 'SELECT orders.*, Vendor.Name AS Vendor_Name \
            FROM (SELECT * from`Order` WHERE Vendor_ID = ? AND (`Status` = ? OR `Status` = ? OR `Status` = ? OR `Status` = ?)) AS orders \
            LEFT JOIN Vendor ON orders.Vendor_ID = Vendor.Vendor_ID;'
        // const query_str = 'SELECT * FROM `Order` WHERE `Customer_ID` = ? \
        //                     AND (`Status` = ? OR `Status` = ? OR `Status` = ?)';
        const [rows, fields] = await query(query_str, 
                [vendorId, "WAIT_FOR_APPROVAL", "PREPARING", "READY_FOR_PICKUP", "CANCELLED_UNCHECKED"]);
        console.log(rows);
        res.json(rows);
        // console.log("in completed");
        // console.log(res);
    }
    catch (err) {
        throw err;
    }
};


const getOrderMeals = async (req, res, next) => {
    const orderMealIDs = (req.query.orderMealIDs).split(',');
    var queryResults = [];
    console.log("MealIDs = ", orderMealIDs);
    for (let i = 0; i < orderMealIDs.length; i++) {
        try {
            const query_str = 'SELECT Meal_ID, Meal_Name, Price, Image_url FROM `Meal` WHERE `Meal_ID` = ?';
            const [rows, fields] = await query(query_str, [orderMealIDs[i]]);
            queryResults.push(...rows);
        }
        catch (err) {
            throw err;
        }
    }
    res.json(queryResults);
};

const cancenlOrder = (req, res, net) => {
    console.log("cancel order, orderID = ", req.query.orderID);
}

router.get('/', getOrders);
router.get('/cancelOrder', cancenlOrder);
router.get('/orderMeals', getOrderMeals)

export default router;

