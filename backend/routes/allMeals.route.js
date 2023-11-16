import express from 'express';
import { query } from "../models/dbasync.model.js";
import { useLocation } from "react-router-dom";

const router = express.Router();
const getAllMeals = async (req, res, next) => {
    const vendorId = req.query.vendorId;

    try {
        const [rows, fields] = await query('SELECT * FROM `Meal` \
                                            WHERE `Vendor_ID` = ?', [vendorId]);
        res.json(rows);
    }
    catch (err) {
        throw err;
    }
};

const updateDefaultInventory = (req, res, net) => {
    console.log("hi...");
    console.log("req = ", req.query);
    
    // let { state } = useLocation();
    // console.log("vendorId = ", state.vendorId);
    // console.log("count = ", state.count);
}

router.get('/', getAllMeals); 
router.get('/updateDefaultInventory', updateDefaultInventory);

export default router;