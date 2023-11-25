import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();

const GetVendors = async (req, res, next) => {
    try{
        if (req.query.vendortype == '所有類型'){
            const [rows, fields] = await query('SELECT `Image_url`, `Name`, `Address`, Vendor_ID  \
                                                FROM `Vendor` WHERE `Status` = 1 AND `Name` LIKE ?',
                                                ['%'+req.query.searchinput+'%']);
                                                
            res.json(rows);
        }
        else{
            const [rows, fields] = await query('SELECT `Image_url`, `Name`, `Address`, Vendor_ID  \
                                                FROM `Vendor` WHERE `Type` = ? AND `Status` = 1 AND `Name` LIKE ?', 
                                                [req.query.vendortype, '%'+req.query.searchinput+'%']);
            res.json(rows);
        }
    }
    catch (err) {
        throw err
    }
}

router.get('/', GetVendors);

export default router;