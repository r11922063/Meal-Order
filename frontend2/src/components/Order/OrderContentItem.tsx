import type { OrderContent } from '../../type'
import test_img from '../../assets/dumplings.jpg'
import style from '../../style/Order/OrderContentItem.module.css'

export default function OrderContentItem({ orderContent }: { orderContent: OrderContent }) {
    return (
        <div className={style.orderContentItem_item}>
            <div className={style.orderContentItem_contentContainer}>
                <span className={style.orderContentItem_title}>{orderContent.Meal_Name}</span>
                {/* TODO: price / number or amount */}
            </div>

            <div className={style.orderContentItem_img}>
                <img src={test_img} alt={orderContent.Meal_Name} />
                {/* TODO: change to meal.Image_url */}
            </div>
        </div>
    );
}