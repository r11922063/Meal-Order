import { type } from "os";

export type SettlementOrder = {
    Order_ID: number,
    Pickup_Time: string,
    Name?: string,
    Cash_Amount: number;
};

export type LoginInput = {
    email: string,
    password: string
}

export type SignUpInput = LoginInput & {
    name: string,
    address?: string,
    type?: string,
    img?: File
}

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

export enum OrderStatus {
    IN_CART = "IN_CART",
    PREPARING = "PREPARING",
    WAIT_FOR_APPROVAL = "WAIT_FOR_APPROVAL",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    PICKED_UP = "PICKED_UP",
    CANCELLED_UNCHECKED = "CANCELLED_UNCHECKED",
    CANCELLED_CHECKED = "CANCELLED_CHECKED",
};

export type CustomerOrderDetail = {
    Meal_ID: number,
    Amount: number,
};

export type CustomerOrder = {
    Order_ID: number,
    Customer_ID: number,
    Vendor_ID: number,
    Status: string,
    Pickup_Time: string,
    Meal_List: Array<CustomerOrderDetail>,
    Cash_Amount: number,
    Vendor_Name: string,
};

export type CustomerOrderContent = {
    Meal_ID: number,
    Meal_Name: string,
    Price: number,
    Image_url: string,
    Amount: number,
};

export type OrderTimeInfo = {
    year: string,
    month: string,
    date: string,
    day: string,
    dayPeriod: string, // AM, PM
    hour: string,
    minute: string,
};

export type VendorAndMeal ={
    Vendor_img: string,
    Meal_ID: number,
    Name: string,
    Address: string,
    Meal_Name: string, 
    Description?: string,
    Price: number,
    Inventory: {"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number}, 
    Image_url: string;
}

