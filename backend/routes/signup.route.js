import express from 'express';
import { query } from "../models/dbasync.model.js";
import Multer from 'multer';

const router = express.Router();
const upload = Multer();

const CheckUser = async (email, identity) => {
    if (identity === "customer") {
        const [rows, ] = await query('Select `Customer_ID` from `Customer` where `Email` = ?', [email]);
        if (rows.length > 0) return rows[0]['Customer_ID'];
    }
    else {
        const [rows, ] = await query('Select `Vendor_ID` from `Vendor` where `Email` = ?', [email]);
        if (rows.length > 0) return rows[0]['Vendor_ID'];
    }
    throw "No User";
}

const AddUser = async ({email, name, password, type, address, img, identity}) => {
    try {
        if (identity === "customer") {
            await query('INSERT INTO `Customer` (`Email`, `Name`, `Password`) VALUES (?, ?, ?)', [email, name, password]);
        }
        else {
            await query('INSERT INTO `Vendor` (`Email`, `Name`, `Password`, `Type`, `Address`, `Status`) \
                        VALUES (?, ?, ?, ?, ?, ?)', [email, name, password, type, address, true]);
        }
        return await CheckUser(email, identity);
    } catch (error) {
        throw error;
    }
}

const SignUp = async (req, res, next) => {
    const { email, name, password, type, address, identity } = JSON.parse(req.body.data);
    const img = req.file;
    try {
        const id = await AddUser({ email, name, password, type, address, img, identity });
        return res.json({id: id});
    } catch (error) {
        return res.json(null);
    }
}

router.post('/', upload.single('img'), SignUp);

export default router;