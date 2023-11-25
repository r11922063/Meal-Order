import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VendorBlock from '../components/VendorHomepage/VendorBlock'
import { BACKEND_URL } from '../constant';
import style from '../style/CustomerHomepage/DropDown.module.css';
import style2 from '../style/CustomerHomepage/DropDown2.module.css';
import style3 from "../style/CustomerHomepage/CustomerSearch.module.css";

import {useLocation} from 'react-router-dom';

export type Vendors = {
    Image_url: string,
    Name: string,
    Address: string;
    Vendor_ID: number;
};
const vendortypelist: string[] = ["所有類型", "台灣美食", "日本美食", "中式美食", "美式料理", "義大利美食", "韓國美食", "泰國美食", "港式美食", "純素料理", "其他異國料理", "速食", "飲料", "點心"]

export default function Customer() {
    const params = useParams();
    const id = params.customerID;
    const [vendorType, setVendorType] = useState("所有類型");
    const [vendors, setVendors] = useState<Vendors[]>([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const FetchVendors = async (ID: string, vendortype: string, searchinput: string) => {
            try {
                const url: string = `${BACKEND_URL}/customer?id=${ID}&vendortype=${vendortype}&searchinput=${searchinput}`;
                const result = await fetch(url).then((res) => { return res.json(); });
                setVendors(result);
            }
            catch (err) {
                throw err;
            }
        }

        const abortController = new AbortController();
        FetchVendors(id!, vendorType, searchInput);
        
        return () => {
            abortController.abort();
        }
    }, [vendorType, searchInput]);

    return (
        <>
            <div className={style3.wrap}>
                <div className={style3.searchBox}>
                    <input type="text" className={style3.searchTerm} placeholder="搜尋餐廳" onChange={e => setSearchInput(e.target.value)}/>
                    <div className={style3.searchIcon}>
                        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
                        <i className ="fa fa-search"></i>
                    </div>
                </div>
            </div>
            <select 
                value={vendorType}
                className={style.DropDown} 
                onChange={e=>{setVendorType(e.target.value);}}>
                {vendortypelist.map(v => (<option value={v} key={v}> {v} </option>))}
            </select>
            <div className='VendorBlocks'>
                {vendors.map(ele=>{return <VendorBlock imgurl={ele.Image_url} name={ele.Name} addr={ele.Address}/>})}
            </div>
        </>
    );
}