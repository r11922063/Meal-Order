import {Link} from "react-router-dom";

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <div><Link to="/customer/1"> Customer </Link></div>
            <div><Link to="/vendor/101"> Vendor </Link></div>
        </div>
    );
}