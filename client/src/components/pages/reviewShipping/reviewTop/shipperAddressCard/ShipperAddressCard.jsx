import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShipperAddress } from '../../../../../redux/actions/shipperAddress.action';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';

function ShipperAddressCard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShipperAddress(1))
    }, [dispatch]);

    const { shipperAddress } = useSelector(state => state.shipperAddress);

    console.log("shipperAddress", shipperAddress)

    return (
        <div className="shipperAddressCard">
            {!shipperAddress ? <span>Please go back and select Shipper Address.</span> :
                (
                    <div className="shipperAddressCardContainer">
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}><MarkunreadMailboxIcon /> <h4 style={{ marginLeft: 10 }}>Shipper Address</h4></div>
                        <table >
                            <tbody>
                                <tr>
                                    <td className="tdHeader">Shipper Organisation Name: </td>
                                    <td className="tdLine">{shipperAddress.shipperOrganisationName}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Address Line 1: </td>
                                    <td className="tdLine">{shipperAddress.shipperAddressLine1}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Address Line 2: </td>
                                    <td className="tdLine">{shipperAddress.shipperAddressLine2}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">City: </td>
                                    <td className="tdLine">{shipperAddress.shipperAddressCity}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">County/State: </td>
                                    <td className="tdLine">{shipperAddress.shipperAddressCounty}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Postcode: </td>
                                    <td className="tdLine">{shipperAddress.shipperPostcode}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Country Code: </td>
                                    <td className="tdLine">{shipperAddress.shipperCountryCode}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Contact Name: </td>
                                    <td className="tdLine">{shipperAddress.shipperContactName}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Contact Telephone No.: </td>
                                    <td className="tdLine">{shipperAddress.shipperContactTelephoneNo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
        </div>


    )
}

export default ShipperAddressCard
