import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import style from "../../style/shared/Counter.module.css";

export default function Counter({_count}: {_count: number}) {
    const [count, setCount] = useState(_count);
    return (
        <div className={style.counter_buttons}>
        <span
            onClick={() => setCount(Math.max(0, count-1))}
            className={style.counter_plus}
        >
            <AiOutlineMinus />
        </span>
        <span className={style.counter_number}>{count}</span>
        
            <span
            onClick={() => setCount(count+1)}
            className={style.counter_minus}
            >
            <AiOutlinePlus />
            </span>
        
        </div>
    );
}