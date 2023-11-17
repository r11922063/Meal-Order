import type { Meal, Order } from '../../type'
import style from '../../style/Order/OrderItem.module.css'
import { BACKEND_URL } from '../../constant'

export default function OrderItem({ order }: { order: Order }) {
    const vendorId = order.Vendor_ID;
    function CancelOrder() {
        console.log("click cancel button!");
        // TODO: cancel order
    }
    return (
        <div className={style.orderItem_item}>
            <div className={style.orderItem_contentContainer}>
                <span className={style.orderItem_title}>{order.Vendor_ID}</span>
                <span className={style.orderItem_note}>{'訂單編號 #' + order.Order_ID}</span>
                <span className={style.orderItem_note}>{'取餐時間：' + order.Pickup_Time}</span>
                <span className={style.orderItem_warning}>{'最後取消時間：' + order.Pickup_Time}</span>
                {/* TODO: vendor name */}
                {/* TODO: 取餐時間、最後取消時間 */}
            </div>

            <div className={style.orderItem_otherContainer}>
                <div className={style.orderItem_cancelBox}>
                    <button className={style.orderItem_cancelButton} onClick={() => CancelOrder()}>
                        <span>取消訂單</span>
                    </button>
                </div>
                <div className={style.orderItem_detail}>
                        <span>{'總計: NT$' + order.Cash_Amount}</span>
                </div>
                {/* TODO: toggle (meals) */}
            </div>
        </div>
        
    );
}