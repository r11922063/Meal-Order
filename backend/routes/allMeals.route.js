import express from 'express';
import { query } from "../models/dbasync.model.js";
import { useLocation } from "react-router-dom";

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

const updateDefaultInventory = (req, res, net) => {
    console.log("hi...");
    console.log("req = ", req.query);
    
    // let { state } = useLocation();
    // console.log("id = ", state.id);
    // console.log("count = ", state.count);
}

router.get('/', getAllMeals); 
router.get('/updateDefaultInventory', updateDefaultInventory);

export default router;