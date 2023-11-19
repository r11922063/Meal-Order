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
    Inventory: {"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number}, 
    Image_url: string,
    Default_Inventory: number,
};

type Option = {
    value: any,
    label: any
}
export type SelectOption = Option[];