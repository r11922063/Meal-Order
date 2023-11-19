import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import style from "../style/LoginSignUp.module.css"

export default function SignUp() {
    const [active, setActive] = useState(false);
    const handleActive = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActive(!active);
    }
    return (
        <div className={ style.Login }>
            <div className= { active ? `${style.inner} ${style.active}` : `${style.inner}`}>
                <div className={ `${style.container} ${style.front}` }>
                    <SignUpForm identity={ "customer" } handleActive={ handleActive }/>
                </div>
                <div className={ `${style.container} ${style.back}` }>
                    <SignUpForm identity={ "vendor" } handleActive={ handleActive }/>
                </div>
            </div>
        </div>
    );
}