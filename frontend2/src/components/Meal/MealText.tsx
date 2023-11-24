import style from "../../style/Meal/MealText.module.css";

export default function MealInput({placeholder, inputType, setInput}: 
                {placeholder: string, inputType: string, setInput: (text: any) => void}) {
   
    return (
            <div className={style.mealText_title}>
                <input type={inputType} placeholder={placeholder} required 
                    onChange={(e) => {setInput(e.target.value)}} min={0}></input>
            </div>
        );
}