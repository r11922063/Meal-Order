import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import style from "../../style/shared/Counter.module.css";


export default function Counter({count, setCount}: 
                                {count: number, setCount: (c: number)=>void}) {
    
    const handleInput = (text: any) => {
        const number = Number(text);
        if (!isNaN(number)){
            setCount(number);
            console.log("count updated");
        }
    };
    
    return (
        <div className={style.counter_buttons}>
            <span
                onClick={() => { setCount(Math.max(0, count-1));}}
                className={style.counter_plus}
            >
                <AiOutlineMinus />
            </span>
            
            <span className={style.counter_number} contentEditable 
                suppressContentEditableWarning={true}
                onInput={(e) => handleInput(e.currentTarget.textContent)} >{count}
            </span>
            
            <span
            onClick={() => { setCount(count+1); }}
            className={style.counter_minus}
            >
            <AiOutlinePlus />
            </span>
        
        </div>
    );
}