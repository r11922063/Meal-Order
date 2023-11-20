import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

const CheckUser = async (email, identity) => {
    if (identity === 'customer') {
        const [rows, ] = await query('Select `Customer_ID` from `Customer` where `Email` = ?', [email]);
        if (rows.length > 0) return rows[0]['Customer_ID'];
    }
    else {
        const [rows, ] = await query('Select `Vendor_ID` from `Vendor` where `Email` = ?', [email]);
        if (rows.length > 0) return rows[0]['Vendor_ID'];
    }
    throw "No User";
}

const Login = async (req, res, next) => {
    const { email, password, identity } = req.body;
    try {
        const id = await CheckUser(email, identity);
        return res.json({id: id});
    } catch (error) {
        return res.json(null);
    }
}

router.post('/', Login);

export default router;