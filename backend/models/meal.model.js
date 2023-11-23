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

Meal.save_img = (img) => {}

Meal.insert = () => {}  

export default Meal;