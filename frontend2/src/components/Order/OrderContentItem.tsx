import type { CustomerOrderContent } from '../../type'
import style from '../../style/Order/OrderContentItem.module.css'

export default function OrderContentItem({ orderContent, amount }: { orderContent: CustomerOrderContent, amount: number }) {
    return (
        <div className={style.orderContentItem_item}>
            
            <div className={style.orderContentItem_contentContainer}>
                <span className={style.orderContentItem_title}>{orderContent.Meal_Name}</span>
                <span className={style.orderContentItem_price}>
                    {`NT$${orderContent.Price}`}
                </span>
            </div>

            <div className={style.orderContentItem_otherContainer}>
                <div className={style.orderContentItem_amount_totalPrice}>
                    <span>{`共 ${amount} 項, 共 ${amount * orderContent.Price} 元`}</span>
                </div>
            </div>

            <div className={style.orderContentItem_imgBox}>
                <img src={require(`../../assets/${orderContent.Image_url}`)} className={style.orderContentItem_img} alt={orderContent.Meal_Name} />
                {/* TODO: on cloud file path */}
            </div>
        </div>
    );
}