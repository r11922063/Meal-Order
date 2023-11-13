import { useParams } from "react-router-dom";

export default function OrderMeal() {
    const { vendorId } = useParams();
    return (
        <h1>
            OrderMeal { vendorId }
        </h1>
    );
}