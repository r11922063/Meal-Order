import { useParams } from "react-router-dom";
export default function Orders() {
    const { vendorId } = useParams();
    return (
        <h1>Orders { vendorId }</h1>
    );
}