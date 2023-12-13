import express from 'express';
import { query } from "../models/dbasync.model.js";
import upload from '../models/upload.model.js'
import 'dotenv/config';

const router = express.Router();

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

const AddUser = async ({email, name, password, type, address, imgURL, identity}) => {
    try {
        if (identity === "customer") {
            await query('INSERT INTO `Customer` (`Email`, `Name`, `Password`) VALUES (?, ?, ?)', [email, name, password]);
        }
        else {
            await query('INSERT INTO `Vendor` (`Email`, `Name`, `Password`, `Type`, `Address`, `Image_url`, `Status`) \
                        VALUES (?, ?, ?, ?, ?, ?, ?)', [email, name, password, type, address, imgURL, true]);
        }
        return await CheckUser(email, identity);
    } catch (error) {
        throw error;
    }
}

const SignUp = async (req, res, next) => {
    const { email, name, password, type, address, identity } = JSON.parse(req.body.data);
    const imgURL = identity === 'vendor' ? `${req.file.url.split('?')[0] + '?' + process.env.AZURE_BLOB_SAS}` : '';
    try {
        const id = await AddUser({ email, name, password, type, address, imgURL, identity });
        return res.json({id: id});
    } catch (error) {
        return res.json(null);
    }
}

router.post('/', upload.single('img'), SignUp);

export default router;