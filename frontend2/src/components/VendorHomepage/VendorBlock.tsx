import style from "../../style/CustomerHomepage/VendorBlock.module.css";

export default function VendorBlock(){
    const img = 'https://i.imgur.com/JJEN2Su.jpg';
    return(
        <button type="submit" className={style.VendorBlock}>
            <div className={style.VendorImg}>
                <img src={img} alt='error'></img>
            </div>
            <div className={style.VendorInfo}> 
                <h1 className={style.VendorName}>安好食 和平店</h1>
                <h4 className={style.VendorAddr}>106台北市大安區辛亥路二段201號</h4>
            </div>

        </button>
    );
};