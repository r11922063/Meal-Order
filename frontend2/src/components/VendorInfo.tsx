
import style from "../style/OrderMeal.module.css";

export default function VendorInfo(){
    return(
    <div className={style.VendorInfo}> 
        <h1 className={style.VendorName}>安好食 和平店</h1>
        <h4 className={style.VendorAddr}>106台北市大安區辛亥路二段201號</h4>
    </div>
    );

}