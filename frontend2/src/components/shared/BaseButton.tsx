import style from "../../style/shared/BaseButton.module.css";

export default function BaseButton({text, onClickFunc}: {text: string, onClickFunc: any}) {
   
    return (
        <div className={style.baseButton_updateBox} onClick={onClickFunc}>
              <div className={style.baseButton_updateButton}>
                <span> {text} </span>
              </div>
          </div>
        );
}