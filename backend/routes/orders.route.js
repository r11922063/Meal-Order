import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

const getOrders = async (req, res, next) => {
    const customerId = req.query.customerId;
    const display = req.query.display;
    // console.log("display = ", display);
    // console.log("in getAllOrders");
    if (display == 0) {
        await getOrdersInProgress(req, res, next);
    } else {
        await getOrdersCompleted(req, res, next);
    }
};

const getOrdersCompleted = async (req, res, next) => {
    const customerId = req.query.customerId;
    try {
        const query_str = 'SELECT * FROM `Order` WHERE `Customer_ID` = ? \
                            AND (`Status` = ? OR `Status` = ? OR `Status` = ?)';
        const [rows, fields] = await query(query_str, 
                [customerId, "PICKED_UP", "CANCELLED_UNCHECKED", "CANCELLED_CHECKED"]);
        res.json(rows);
        // console.log("in completed");
        // console.log(res);
    }
    catch (err) {
        throw err;
    }
};

const getOrdersInProgress = async (req, res, next) => {
    const customerId = req.query.customerId;
    try {
        const query_str = 'SELECT * FROM `Order` WHERE `Customer_ID` = ? \
                            AND (`Status` = ? OR `Status` = ?)';
        const [rows, fields] = await query(query_str,
            [customerId, "PREPARING", "READY_FOR_PICKUP"]);
        res.json(rows);
        // console.log("in progress");
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
            queryResults.push(rows);
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

