import { useParams } from "react-router-dom";
import SearchVendorBox from '../components/VendorHomepage/SearchVendorBox';
import VendorFilter from '../components/VendorHomepage/VendorFilter';
import VendorBlocks from '../components/VendorHomepage/VendorBlocks'

export default function Customer() {
    return (
        <>
            <SearchVendorBox/>
            <VendorFilter/>
            <VendorBlocks/>
        </>
    );
}