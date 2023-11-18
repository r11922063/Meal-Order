import Select from "react-select";
import type { SelectOption } from '../../type'
import style from '../../style/shared/BaseSelect.module.css'

export default function BaseSelect ({ options, onChangeFunc, value}:
                                    { options: SelectOption, onChangeFunc: any, value: any}){
    return (
        <>
          <div className={style.baseSelectBox}>
            <Select
                options={options}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                    ...theme.colors,
                      text: 'orangered',
                      primary25: '#4C9AFF',
                      primary: '#B2D4FF',
                    },
                  })}
                onChange={onChangeFunc}
                value={value}
            />
          </div>
        </>
    );
}