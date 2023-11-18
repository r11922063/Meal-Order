import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VendorImg from '../components/OrderMeal-ShopCart/VendorImg';
import VendorInfo from '../components/OrderMeal-ShopCart/VendorInfo';
import DateFilter from '../components/OrderMeal-ShopCart/DateFilter';

export type Meals = {
    Vendor_img: string,
    Meal_ID: number,
    Name: string,
    Address: string,
    Meal_Name: string, 
    Description?: string,
    Price: number,
    Inventory: {"1": number, "2": number, "3": number, "4": number, "5": number, "6": number, "7": number}, 
    Image_url: string;
};

export default function OrderMeal() {

    const [VendorImgurl, setVendorImgurl] = useState('');
    const [VendorName, setVendorName] = useState('');
    const [VendorAddr, setVendorAddr] = useState('');
    const [OrderMeal, setOrderMeal] = useState<Meals[]>([]);
    const param = useParams();
    const vid = param.vendorId;

    useEffect(() => {
      const FetchOrders = async (ID: string) => {
          try {
              const url: string = `http://localhost:8081/orderMeal?vid=${ID}`;
              const result = await fetch(url).then((res) => { return res.json(); });
              setVendorImgurl(result[0]['Vendor_img' as keyof typeof VendorImgurl]);
              setVendorName(result[0]['Name' as keyof typeof VendorName]);
              setVendorAddr(result[0]['Address' as keyof typeof VendorAddr]);
              setOrderMeal(result);
          }
          catch (err) {
              throw err;
          }
      }

      const abortController = new AbortController();
      FetchOrders(vid!);

      return () => {
          abortController.abort();
      }
  },[vid]);


    return (
        <>
          <VendorImg img_url={VendorImgurl} />
          <VendorInfo vendorName={VendorName} vendorAddr={VendorAddr}/>
          <DateFilter meals={OrderMeal}/>
        </>
      );
}
