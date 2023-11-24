import express from 'express';
import { query } from "../models/dbasync.model.js";
import { query_callBack } from "../models/db.model.js"
import Meal from '../models/meal.model.js'
import multer from 'multer';

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

// 配置 Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + "hi.png");
    }
});
const upload = multer({ storage: storage });

const addMealItem = (req, res, next) => {
    console.log("addMealItem");
    const img = req.files['img'][0];
    const newMeal = req.body['newMeal'];
    console.log("img = ", img);
    console.log("newMeal = ", newMeal);



    // for (var key of req.body.entries()) {
    //     console.log("backend formData = ", key[0] + ", " + key[1]);
    // }

    // let newMeal = new Meal(meal);
    // // save image
    // try {
    //     newMeal.saveImg(img);
    // }
    // catch (err){
    //     console.log("Error saving new meal image: ", err);
    // }
    // // save newMeal to db
    // try {
    //     newMeal.insert();
    // }
    // catch (err){
    //     console.log("Error inserting new meal to db: ", err);
    // }
}



const testUploader = (req, res, next) => {
    console.log("backend test uploader");
    imagesUpload(
        '../../data/meal_imgs',
        null, false);
}



router.get('/', getAllMeals); 
router.post('/updateDefaultInventory', updateDefaultInventory);
router.post('/addMealItem', upload.fields([{ name: 'newMeal' }, { name: 'img' }]), addMealItem);

export default router;