import { blob_config } from '../config/blob.config.js';

const Meal = function(meal) {
    this.Meal_ID = meal.Meal_ID,
    this.Vendor_ID = meal.Vendor_ID,
    this.Meal_Name = meal.Meal_Name, 
    this.Description = meal.Description,
    this.Price = meal.Price,
    this.Inventory = meal.Inventory,
    this.Image_url = meal.Image_url,
    this.Default_Inventory = meal.Default_Inventory
}

Meal.save_img = (meal, img) => {
    // Current implementation: use multer to save the image
}

Meal.insertToDb = (meal, query_callBack, res) => {
    query_callBack('INSERT INTO `Meal` (`Vendor_ID`, `Meal_Name`, `Description`, `Price`,\
                    `Inventory`, `Image_url`, `Default_Inventory`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [meal.Vendor_ID, meal.Meal_Name, meal.Description, meal.Price, 
                     JSON.stringify(meal.Inventory), meal.Image_url, meal.Default_Inventory],
            (err, result) => {
                if (err) 
                    console.log(`Error inserting new meal to db: ${err}`);
                else{
                    console.log("New meal inserted, affected row(s): ", result.affectedRows);
                    res.json({"meal_id": result.insertId});
                }
            });
}  
export { Meal };