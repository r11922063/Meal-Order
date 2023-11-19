import style from '../../style/CustomerHomepage/DropDown2.module.css'

export default function VendorFilter(){
    return(
        <details className={style.dropdown}>
            <summary role="button">
            <a className={style.button}>所有類型</a>
            </summary>
            <ul>
                <li><a href="#">台灣美食</a></li>
                <li><a href="#">日本美食</a></li>
                <li><a href="#">甜點</a></li>
                <li><a href="#">麵包店</a></li>
            </ul>
        </details>

    )
}