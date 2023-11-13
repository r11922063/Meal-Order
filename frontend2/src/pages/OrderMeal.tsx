import { useParams } from "react-router-dom";
import VendorImg from '../components/VendorImg';
import VendorInfo from '../components/VendorInfo';
import DateFilter from '../components/DateFilter';

export default function OrderMeal() {
    const { vendorId } = useParams();
    return (
        <>
          <VendorImg />
          <VendorInfo />
          <DateFilter />
        </>
      );
}


