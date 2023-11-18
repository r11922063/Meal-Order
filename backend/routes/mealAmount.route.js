import express from 'express';
import { query } from "../models/dbasync.model.js";
import { query_callBack } from "../models/db.model.js"

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

const updateAllInventory = async (req, res, net) => {
    console.log("data: ", req.body);
    for (const meal of req.body){
        const mealId = meal.mealId;
        const day = meal.day;
        const inventory = meal.inventory;
        console.log("id = ", mealId, "day = ", day, "inv = ", inventory);
        // const inventory = JSON.stringify(meal.inventory).replaceAll("'", "`");
        query_callBack('UPDATE `Meal` SET `Inventory` =\
                        JSON_REPLACE(`Inventory`, `$."?"`, ?)\
                        WHERE `Meal_ID` = ?', [day, inventory, mealId],
            (err, result) => {
                if (err) 
                    console.log(`Error updating the inventory: ${err}`);
                else
                    console.log("Updated row(s): ", result.affectedRows);
        });
    }
    // const mealId = req.body.mealId;
    // const count = req.body.count;

    // query_callBack('UPDATE `Meal` SET `Default_Inventory` = ?\
    //         WHERE `Meal_ID` = ?', [count, mealId],
    //         (err, result) => {
    //             if (err) 
    //                 console.log(`Error updating the default inventory: ${err}`);
    //             else
    //                 console.log("Updated row(s): ", result.affectedRows);
    //         });
}

router.get('/', getAllMeals); 
router.post('/updateAllInventory', updateAllInventory);

export default router;