import style from "../../style/CustomerHomepage/CustomerSearch.module.css";


export default function SearchVendorBox(){
    return(
        
        <>
            
            <div className={style.wrap}>
                <div className={style.searchBox}>
                    <input type="text" className={style.searchTerm} placeholder="搜尋餐廳"/>
                    <div className={style.searchIcon}>
                        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
                        <i className ="fa fa-search"></i>
                    </div>
                    <button type="submit" className={style.searchButton}>搜尋</button>
                    
                </div>
            </div>
        </>
    );
}