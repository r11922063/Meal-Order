import style from '../../style/shared/DropDown.module.css'
import type { MealAmountOption, MealAmountSelectOption } from '../../type';

export default function MealAmountMealItem({ options, onChangeFunc, value}:
                                           { options: MealAmountSelectOption, onChangeFunc: any, value: any}) {
    return (
        <>
        <div className="DropDown">
            <select 
                value={value}
                className={style.DropDown} 
                onChange={e => onChangeFunc(e)}>
                {options.map((option: MealAmountOption) => (<option value={option.value}> {option.label} </option>))}
            </select>
        </div>
        </>
    );
}