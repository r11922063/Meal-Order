import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

const getOrders = async (req, res, next) => {
    const customerId = req.query.customerId;
    const display = req.query.display;
    console.log("display = ", display);
    console.log("in getAllOrders");
    if (display == 1) {
        await getOrdersCompleted(req, res, next);
    } else {
        await getOrdersInProgress(req, res, next);
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

const cancenlOrder = (req, res, net) => {
    console.log("cancel order, orderID = ", req.query.orderID);
}

router.get('/', getOrders);
router.get('/cancelOrder', cancenlOrder);

export default router;

