import style from "../../style/Meal/AddMealButton.module.css";

export default function AddMealButton({text, onClickFunc}: {text: string, onClickFunc: any}) {
   
    return (
          <div className={style.baseButton_button} onClick={onClickFunc}>
            {text}
          </div>
        );
}