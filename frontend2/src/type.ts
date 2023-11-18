export type SettlementOrder = {
    Order_ID: number,
    Pickup_Time: string,
    Name?: string,
    Cash_Amout: number;
};

export type Meal = {
    Meal_ID: number,
    Vendor_ID: number,
    Meal_Name: string, 
    Description: string,
    Price: number,
    Inventory: Record<string, number>
    Image_url: string,
    Default_Inventory: number,
};


export type MealAmountOption = {
    value: number,
    label: string
}
export type MealAmountSelectOption = MealAmountOption[];