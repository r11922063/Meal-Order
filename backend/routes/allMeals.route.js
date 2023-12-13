import express from 'express';
import { query } from "../models/dbasync.model.js";
import { query_callBack } from "../models/db.model.js"
import { Meal } from '../models/meal.model.js'
// import { blob_config } from '../config/blob.config.js';
import upload from '../models/upload.model.js'

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
    const mealData = req.body.newMeal;
    console.log("addMealItem, mealData = ", mealData);

    let newMeal = new Meal(mealData);
    // save image
    
    // save newMeal to db
    Meal.insertToDb(newMeal, query_callBack, res);
}

const uploadMealItemImage = (req, res, next) => {
    console.log("uploadMealItemImage");
    const image_url = req.file.url;
    console.log("image_url = ", image_url);
    res.json({image_url: image_url});
    // let img_url = req.body['img_url'];
    // console.log("img_url = ", img_url);
    // const img = req.files['img'][0];
    // console.log("img = ", img);

}

router.get('/', getAllMeals); 
router.post('/updateDefaultInventory', updateDefaultInventory);
router.post('/addMealItem', addMealItem);
// router.post('/uploadMealItemImage', blob_config.MEAL_IMG_UPLOAD.fields([{ name: 'img_url' }, { name: 'img' }]), uploadMealItemImage);
router.post('/uploadMealItemImage', upload.single('img'), uploadMealItemImage);

export default router;