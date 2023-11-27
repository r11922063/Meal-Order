import style from "../../style/CustomerHomepage/VendorBlock.module.css";
// import {Link, Route, Routes} from 'react-router-dom';

export default function VendorBlock({imgurl, name, addr, vid, cid}:{imgurl:string, name:string, addr:string, vid:number, cid:string}){
    // const link_url: string = "1"
    return(
        <a href = {cid+`/vendor/${vid}`}>
            <button type="submit" className={style.VendorBlock}>
                <div className={style.VendorImg}>
                    <img src={imgurl} alt='error'></img>
                </div>
                <div className={style.VendorInfo}> 
                    <h1 className={style.VendorName}>{name}</h1>
                    <h4 className={style.VendorAddr}>{addr}</h4>
                </div>

            </button>
        </a>
    );
};