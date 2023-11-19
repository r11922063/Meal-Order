import type { Order } from '../../type'
import style from '../../style/Order/OrderInfoItem.module.css'

export default function OrderTab({ order }: { order: Order }) {
    const vendorId = order.Vendor_ID;

    function CancelOrder() {
        console.log("click cancel button!");
        // TODO: cancel order
    }

    return (
        <div className={style.orderInfoItem_item}>
            <div className={style.orderInfoItem_leftContainer}>
                <span className={style.orderInfoItem_title}>{order.Vendor_ID}</span>
                <span className={style.orderInfoItem_note}>{'訂單編號 #' + order.Order_ID}</span>
                <span className={style.orderInfoItem_note}>{'取餐時間：' + order.Pickup_Time}</span>
                <span className={style.orderInfoItem_warning}>{'最後取消時間：' + order.Pickup_Time}</span>
                {/* TODO: vendor name */}
                {/* TODO: 取餐時間、最後取消時間 */}
            </div>

            <div className={style.orderInfoItem_rightContainer}>
                <div className={style.orderInfoItem_cancelBox}>
                    <button className={style.orderInfoItem_cancelButton} onClick={() => CancelOrder()}>
                        <span>取消訂單</span>
                    </button>
                </div>
                <div className={style.orderInfoItem_detail}>
                    <span>{'總計: NT$' + order.Cash_Amount}</span>
                </div>
            </div>
        </div>

    );
}