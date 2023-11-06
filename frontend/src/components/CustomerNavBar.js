import logo from '../border-width.svg';

export default function CustomerNavBar() {
    return (
        <nav>
            <a href="http://">FoodApp</a>
            <a href="http://">購物車</a>
            <a href="http://">訂單</a>
            <a href="http://">月結算</a>
            <button>
                <img src={logo} height="32" width="32"/>
            </button>
        </nav>
    );
};