import type { CustomerOrder } from '../../type'
import style from '../../style/Order/OrderInfoItem.module.css'
import triangle_style from '../../style/Order/TriangleButton.module.css'

export default function OrderInfoItem({ order, handleDisclosureClick, disclosure }: 
    { order: CustomerOrder, handleDisclosureClick: () => any, disclosure: boolean }) {
    const vendorId = order.Vendor_ID;

    function CancelOrder() {
        console.log("click cancel button!");
        // TODO: cancel order
    }

    return (
        <div className={style.orderInfoItem_item}>
            <div className={style.orderInfoItem_leftContainer}>
                <span className={style.orderInfoItem_title}>{order.Vendor_Name}</span>
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
                    <button className={triangle_style.triangle_buttons} onClick={() => handleDisclosureClick()}>
                        {disclosure ?
                            <div className={`${triangle_style.triangle_buttons__triangle} ${triangle_style.triangle_buttons__triangle_b}`}></div>
                            :
                            <div className={`${triangle_style.triangle_buttons__triangle} ${triangle_style.triangle_buttons__triangle_l}`}></div>
                        }
                    </button>
                </div>
            </div>
        </div>

    );
}