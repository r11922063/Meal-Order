import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();
const getAllMeals = async (req, res, next) => {
    const vendor_id = req.query.id;

    try {
        const [rows, fields] = await query('SELECT * FROM `Meal` \
                                            WHERE `Vendor_ID` = ?', [vendor_id]);
        res.json(rows);
    }
    catch (err) {
        throw err;
    }
};

router.get('/', getAllMeals); 

export default router;