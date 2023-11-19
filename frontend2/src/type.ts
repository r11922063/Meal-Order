import { type } from "os";

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
    Inventory: {"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number}, 
    Image_url: string,
    Default_Inventory: number,
};

type Option = {
    value: any,
    label: any
}
export type SelectOption = Option[];

export enum OrderStatus {
    IN_CART = "IN_CART",
    PREPARING = "PREPARING",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    PICKED_UP = "PICKED_UP",
    CANCELLED_UNCHECKED = "CANCELLED_UNCHECKED",
    CANCELLED_CHECKED = "CANCELLED_CHECKED",
};

export type OrderDetail = {
    Meal_ID: number,
    Amount: number,
};

export type Order = {
    Order_ID: number,
    Customer_ID: number,
    Vendor_ID: number,
    Status: string,
    Pickup_Time: string,
    Meal_List: Array<OrderDetail>,
    Cash_Amount: number,
};

export type OrderContent = {
    Meal_ID: number,
    Meal_Name: string,
    Price: number,
    Image_url: string,
};

