import express from 'express';
import { query } from "../models/dbasync.model.js";
import { query_callBack } from "../models/db.model.js"
import { Meal } from '../models/meal.model.js'
import { blob_config } from '../config/blob.config.js';

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

const updateDefaultInventory = async (req, res, net) => {
    const mealId = req.body.mealId;
    const count = req.body.count;

    query_callBack('UPDATE `Meal` SET `Default_Inventory` = ?\
            WHERE `Meal_ID` = ?', [count, mealId],
            (err, result) => {
                if (err) 
                    console.log(`Error updating the default inventory: ${err}`);
                else
                    console.log("Updated row(s): ", result.affectedRows);
            });
}

const addMealItem = (req, res, next) => {
    const img = req.files['img'][0];
    const mealData = req.body['newMeal'];
    // console.log("addMealItem, img = ", img);
    // console.log("addMealItem, mealData = ", mealData);

    let newMeal = new Meal(JSON.parse(mealData));
    // console.log("newMeal = ", newMeal);
    // save image
    
    // save newMeal to db
    Meal.insertToDb(newMeal, query_callBack);
}

router.get('/', getAllMeals); 
router.post('/updateDefaultInventory', updateDefaultInventory);
router.post('/addMealItem', blob_config.MEAL_IMG_UPLOAD.fields([{ name: 'newMeal' }, { name: 'img' }]), addMealItem);

export default router;