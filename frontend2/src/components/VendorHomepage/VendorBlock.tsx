import style from "../../style/CustomerHomepage/VendorBlock.module.css";

export default function VendorBlock({imgurl, name, addr}:{imgurl:string, name:string, addr:string}){
    // const img = imgurl;
    return(
        <button type="submit" className={style.VendorBlock}>
            <div className={style.VendorImg}>
                <img src={imgurl} alt='error'></img>
            </div>
            <div className={style.VendorInfo}> 
                <h1 className={style.VendorName}>{name}</h1>
                <h4 className={style.VendorAddr}>{addr}</h4>
            </div>

        </button>
    );
};