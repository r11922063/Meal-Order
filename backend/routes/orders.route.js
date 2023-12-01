import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

const getOrders = async (req, res, next) => {
    const display = req.body.display;
    if (display == 0) {
        await getOrdersInProgress(req, res, next);
    } else {
        await getOrdersCompleted(req, res, next);
    }
};

const getOrdersCompleted = async (req, res, next) => {
    const customer_id = req.body.customerID;
    const completed_order_time = req.body.completed_order_time;
    try {
        const query_str = 'SELECT orders.*, Vendor.Name AS Vendor_Name \
            FROM (SELECT * from`Order` WHERE Customer_ID = ? \
                AND (Pickup_Time >= ?) \
                AND (`Status` = ? OR `Status` = ? OR `Status` = ?)) AS orders \
            LEFT JOIN Vendor ON orders.Vendor_ID = Vendor.Vendor_ID;';
        const [rows, fields] = await query(query_str, 
            [customer_id, completed_order_time, "PICKED_UP", "CANCELLED_UNCHECKED", "CANCELLED_CHECKED"]);
        res.json(rows);
    }
    catch (err) {
        throw err;
    }
};

const getOrdersInProgress = async (req, res, next) => {
    const customer_id = req.body.customerID;
    try {
        const query_str = 'SELECT orders.*, Vendor.Name AS Vendor_Name \
            FROM (SELECT * from`Order` WHERE Customer_ID = ? AND (`Status` = ? OR `Status` = ? OR `Status` = ?)) AS orders \
            LEFT JOIN Vendor ON orders.Vendor_ID = Vendor.Vendor_ID;';
        const [rows, fields] = await query(query_str,
            [customer_id, "WAIT_FOR_APPROVAL", "PREPARING", "READY_FOR_PICKUP"]);
        res.json(rows);
    }
    catch (err) {
        throw err;
    }
};

const getOrderMeals = async (req, res, next) => {
    const order_meal_ids = req.body.orderMealIDs;
    var query_results = [];
    for (let i = 0; i < order_meal_ids.length; i++) {
        try {
            const query_str = 'SELECT Meal_ID, Meal_Name, Price, Image_url FROM `Meal` WHERE `Meal_ID` = ?';
            const [rows, fields] = await query(query_str, [order_meal_ids[i]]);
            query_results.push(...rows);
        }
        catch (err) {
            throw err;
        }
    }
    // query_results.forEach(query_results => {
    //     query_results['Image_url'] = process.env.IMAGE_PATH + query_results['Image_url'];
    //     // console.log('row: ', query_results['Image_url']);
    // })
    res.json(query_results);
};

const cancelOrder = async (req, res, net) => {
    const order_id = req.query.orderID;
    // console.log("in cancelOrder: order_id = ", order_id);
    try {
        const query_str = 'UPDATE `Order` SET `Status` = ? WHERE Order_ID = ?;'
        const [rows, fields] = await query(query_str, ["CANCELLED_UNCHECKED", order_id]);
        // console.log("changedRows = ", rows['changedRows']);
        res.json(rows['changedRows']);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

router.post('/', getOrders);
router.get('/cancelOrder', cancelOrder);
router.post('/orderMeals', getOrderMeals)

export default router;

