import type { CustomerOrderContent } from '../../type'
import style from '../../style/Order/OrderContentItem.module.css'

export default function OrderContentItem({ orderContent, amount }: { orderContent: CustomerOrderContent, amount: number }) {
    return (
        <div className={style.orderContentItem_item}>
            {/* ordered meal - info */}
            <div className={style.orderContentItem_contentContainer}>
                <span className={style.orderContentItem_title}>{orderContent.Meal_Name}</span>
                <span className={style.orderContentItem_price}>
                    {`NT$${orderContent.Price}`}
                </span>
            </div>

            {/* ordered meal - amount & price */}
            <div className={style.orderContentItem_otherContainer}>
                <div className={style.orderContentItem_amount_totalPrice}>
                    <span>{`共 ${amount} 項，共 NT$${amount * orderContent.Price}`}</span>
                </div>
            </div>

            {/* ordered meal - image */}
            <div className={style.orderContentItem_imgBox}>
                <img src={`${orderContent.Image_url}`} className={style.orderContentItem_img} alt={orderContent.Meal_Name} />
            </div>
        </div>
    );
}