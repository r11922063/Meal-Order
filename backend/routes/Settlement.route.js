import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

// /settlement?id=id&identity=identity&year=year&month=month
const GetSettlement = async (req, res, next) => {
    const start = `${req.query.year}-${req.query.month}-1 00:00:00`;
    const end = `${req.query.year}-${req.query.month}-${new Date(req.query.year, req.query.month, 0).getDate()} 23:59:59`;
    try {
        if (req.query.identity === 'customer') {
            const [rows, fields] = await query('SELECT `Order_ID`, `Pickup_Time`, `Cash_Amout`, v.`Name` \
                                                FROM `Order` o JOIN Vendor v WHERE o.`Customer_ID` = ? AND o.`Status` = ? \
                                                AND (o.`Pickup_Time` BETWEEN ? AND ?) AND o.`Vendor_ID` = v.`Vendor_ID`\
                                                ORDER BY `Pickup_Time`', 
                                                [req.query.id, '4', start, end]);
            res.json(rows);
        }
        else {
            const [rows, fields] = await query('SELECT `Order_ID`, `Pickup_Time`, `Cash_Amout` \
                                                FROM `Order` WHERE `Vendor_ID` = ? AND `Status` = ? \
                                                AND (`Pickup_Time` BETWEEN ? AND ?) \
                                                ORDER BY `Pickup_Time`', 
                                                [req.query.id, '4', start, end]);
            res.json(rows);
        }
    }
    catch (err) {
        throw err
    }
}

router.get('/', GetSettlement);

export default router;