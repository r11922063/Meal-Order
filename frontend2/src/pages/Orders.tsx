import { useParams } from "react-router-dom";
export default function Orders() {
    const { vendorid } = useParams();
    return (
        <h1>Orders { vendorid }</h1>
    );
}