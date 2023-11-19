import style from "../../style/OrderMeal-ShopCart/OrderMeal.module.css";


export default function VendorImg({img_url}:{img_url:string}){
    const img = img_url;
    return(
    <div className={style.VendorImg}>
        <img src={img} alt='error'></img>
    </div>
    );
};

