import { useState } from "react";
import LoginForm from "../components/LoginForm";
import style from "../style/Login.module.css"

export default function Login() {
    const [active, setActive] = useState(false);
    const handleActive = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActive(!active);
    }
    return (
        <div className={ style.Login }>
            <div className= { active ? `${style.inner} ${style.active}` : `${style.inner}`}>
                <div className={ `${style.container} ${style.front}` }>
                    <LoginForm identity={ "customer" } handleActive={ handleActive }/>
                </div>
                <div className={ `${style.container} ${style.back}` }>
                    <LoginForm identity={ "vendor" } handleActive={ handleActive }/>
                </div>
                {/* <div><Link to="/customer/1"> Customer </Link></div>
                <div><Link to="/vendor/101"> Vendor </Link></div> */}
            </div>
        </div>
    );
}