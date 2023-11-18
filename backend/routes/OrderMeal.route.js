import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

// /vendor_id?id=id
const GetOrderMeal= async (req, res, next) => {
    try {
        const [rows, fields] = await query('select a.`Image_url` as `Vendor_img`,a.`Name`,a.`Address` \
                                                    ,b.`Meal_Name`,b.`Meal_ID`,b.`Description`,b.`Price`,b.`Inventory` \
                                                    ,b.`Image_url` from `Vendor` a inner join `Meal` b \
                                                on a.`Vendor_ID`= b.`Vendor_ID` \
                                                where a.`VENDOR_ID`=?',
                                            [req.query.vid]);
        res.json(rows);
    }
    catch (err) {
        throw err;
    }
}

router.get('/', GetOrderMeal);

export default router;