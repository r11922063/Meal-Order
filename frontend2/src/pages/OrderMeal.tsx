/**
 * Belong Customer Page
 * Page of representing the meal information of the specific vendor
 */

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VendorImg from '../components/OrderMeal-ShopCart/VendorImg';
import VendorInfo from '../components/OrderMeal-ShopCart/VendorInfo';
import MealBlock from '../components/OrderMeal-ShopCart/MealBlock_OrderMeal';
import { VendorAndMeal } from '../type'
import { BACKEND_URL } from "../constant";
import style from '../style/OrderMeal-ShopCart/ShopCart.module.css'

export default function OrderMeal() {

    const param = useParams();
    const vid = param.vendorId;

    const [VendorImgurl, setVendorImgurl] = useState(''); // Vendor Image Url
    const [VendorName, setVendorName] = useState(''); // Vendor Name
    const [VendorAddr, setVendorAddr] = useState(''); // Vendor Address
    const [OrderMeal, setOrderMeal] = useState<VendorAndMeal[]>([]); // Needed Info of the Vendor and its meals

    useEffect(() => {
        const FetchOrders = async (ID: string) => {
            try {
                const url: string = `${BACKEND_URL}/orderMeal?vid=${ID}`;
                const result = await fetch(url).then((res) => { return res.json(); });
                if(result.length > 0){
                    setVendorImgurl(result[0]['Vendor_img' as keyof typeof VendorImgurl]);
                    setVendorName(result[0]['Name' as keyof typeof VendorName]);
                    setVendorAddr(result[0]['Address' as keyof typeof VendorAddr]);
                    setOrderMeal(result);
                }
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
    }, [vid]);

    if(VendorImgurl!=''){
        return (
            <>
                <VendorImg img_url={VendorImgurl} />
                <VendorInfo vendorName={VendorName} vendorAddr={VendorAddr} />
                <MealBlock meals={OrderMeal} />
            </>
        );
    }
    else{
        return(
          <>
            <div className={style.noOrder}>
                    <div>
                        <h2>目前這家餐廳沒有餐點!!!</h2>
                    </div>
                    <div>
                        <img src={require('../assets/crying.png')} alt='error' height='100vw'></img>
                    </div>
                </div>
          </>  
        );
    }

}
