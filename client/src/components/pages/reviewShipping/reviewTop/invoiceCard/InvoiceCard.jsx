import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceSelectedAddress } from '../../../../../redux/actions/addresses.action';
import DescriptionIcon from '@mui/icons-material/Description';

function InvoiceCard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInvoiceSelectedAddress())
    }, [dispatch]);

    const { invoiceSelectedAddress } = useSelector(state => state.invoiceSelectedAddress);

    return (
        <div className="invoiceCard">
            {!invoiceSelectedAddress?.length ? <span>Please go back and select Invoice Address</span> :
                (
                    invoiceSelectedAddress.map((line) => (
                        <div className="invoiceCardContainer" key={line.id} id={line.id}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}><DescriptionIcon /> <h4 style={{ marginLeft: 10 }}>Invoice Address</h4></div>
                            <table>
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
                                        <td className="tdHeader">Contact Name: </td>
                                        <td className="tdLine">{line.contactName}</td>
                                    </tr>
                                    <tr>
                                        <td className="tdHeader">Contact Telephone No.: </td>
                                        <td className="tdLine">{line.contactTelephoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="tdHeader">Email Address: </td>
                                        <td className="tdLine">{line.emailAddress}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                )))}
        </div>
    )
}

export default InvoiceCard
