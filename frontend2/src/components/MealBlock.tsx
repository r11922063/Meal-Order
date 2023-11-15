import style from '../style/ShopCart.module.css'

export default function MealBlock(){
    var Restname="安好食 和平店"
    
    var time = new Date();
    var month = time.getMonth().toString();
    var date = time.getDate().toString();
    var day = time.getDay().toString();
    var daystrArray = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    var hour = time.getHours();
    var hour_str = '';
    if(hour<6){
        hour_str = '凌晨'+hour.toString();
    }
    else if((hour>=6)&&(hour<12)){
        hour_str = '早上'+hour.toString();
    }
    else if((hour==12)){
        hour_str = '中午'+hour.toString();
    }
    else if((hour>12)&&(hour<18)){
        hour_str = '下午'+(hour-12).toString();
    }
    else{
        hour_str = '晚上'+(hour-12).toString();
    }
    var minute = time.getMinutes().toString();
    if(minute=='0'){
        minute = '00'
    }else{
        minute = minute.toString();
    }
    
    var TotalAmount = 300;
    return(
        <>
            <div className={style.OneOrder}>
                <div className={style.InfoAndButton}>
                    <div className={style.OrderInfo}>
                        <div>
                            <h1 className={style.ResName}>
                                {Restname}
                            </h1>
                            <p>
                                取餐時間：{month} 月 {date} 日 {daystrArray[+day]}, {hour_str}:{minute}
                            </p>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button className={style.Deletebutton} onClick={()=>{
                        var check = window.confirm('確定一鍵刪除')
                        if(check){
                            console.log("你確定");
                        }else{
                            console.log('no');
                        }
                    }}>一鍵刪除<img src={require('../assets/delete.png')} height='17vw' ></img></button>
                    </div>
                </div>
                <div className={style.Meals}>
                    <h3>
                        This is the place to put meal.
                    </h3>
                </div>
                <div className={style.TotalAmount}>
                    <h4>
                        總計：NT${TotalAmount}
                    </h4>
                </div>
                <div className={style.SendButton}>
                    <div >
                        <div>
                        </div>
                            <button className={style.sendButton}>
                                <img src={require('../assets/checked.png')} height='17vw' ></img>確認送出
                            </button>

                    </div>
                </div>
            </div>
        </>
    );
}