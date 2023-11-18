
import style from "../style/OrderMeal.module.css";

export default function VendorInfo({vendorName, vendorAddr}:{vendorName:string, vendorAddr:string}){
    return(
    <div className={style.VendorInfo}> 
        <h1 className={style.VendorName}>{vendorName}</h1>
        <h4 className={style.VendorAddr}>{vendorAddr}</h4>
    </div>
    );

}