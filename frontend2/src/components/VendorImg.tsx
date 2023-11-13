import style from "../style/OrderMeal.module.css";

export default function VendorImg(){
    const img = 'https://a.cdn-hotels.com/gdcs/production145/d903/8aabf806-31a8-4ba1-8400-ee2d0ab72248.jpg'
    return(
    <div className={style.VendorImg}>
        <img src={img} alt='error'></img>
    </div>
    );
};

