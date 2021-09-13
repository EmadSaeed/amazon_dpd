import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFulfilmentSelectedAddress } from '../../../../../redux/actions/addresses.action';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


function FulfilmentCard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFulfilmentSelectedAddress())
    }, [dispatch]);

    const { fulfilmentSelectedAddress } = useSelector(state => state.fulfilmentSelectedAddress);

    return (
        <div className="fulfilmentCard">
            {!fulfilmentSelectedAddress?.length ? <span>Please go back and select Fulfilment Address.</span> :
                (
                    fulfilmentSelectedAddress.map((line) => (
                        <div className="fulfilmentCardContainer" key={line.id} id={line.id}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}><LocalShippingIcon /> <h4 style={{ marginLeft: 10 }}>Fulfilment Centre Address</h4></div>
                                <table >
                                    <tbody>
                                        <tr>
                                            <td className="tdHeader">Organisation: </td>
                                            <td className="tdLine">{line.organisationName}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Address Line 1: </td>
                                            <td className="tdLine">{line.addressLine1}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Address Line 2: </td>
                                            <td className="tdLine">{line.addressLine2}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">City: </td>
                                            <td className="tdLine">{line.city}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">County/State: </td>
                                            <td className="tdLine">{line.county}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Postcode: </td>
                                            <td className="tdLine">{line.postcode}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Country Code: </td>
                                            <td className="tdLine">{line.countryCode}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Additional Information: </td>
                                            <td className="tdLine">{line.additionalInformation}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Contact Name: </td>
                                            <td className="tdLine">{line.contactName}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Contact Telephone No.: </td>
                                            <td className="tdLine">{line.contactTelephoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Email Address </td>
                                            <td className="tdLine">{line.emailAddress}</td>
                                        </tr>
                                        <tr>
                                            <td className="tdHeader">Delivery Notification Sms: </td>
                                            <td className="tdLine">{line.notificationSMSNumber}</td>
                                        </tr>
                                        </tbody>
                                </table>
                        </div>
                    )))}
        </div>
    )
}

export default FulfilmentCard
