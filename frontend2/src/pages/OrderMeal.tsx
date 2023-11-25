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
    }, [vid]);

    return (
        <>
            <VendorImg img_url={VendorImgurl} />
            <VendorInfo vendorName={VendorName} vendorAddr={VendorAddr} />
            <MealBlock meals={OrderMeal} />
        </>
    );
}
