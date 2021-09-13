import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryNote } from '../../../../../redux/actions/deliveryNote.action';
import EventNoteIcon from '@mui/icons-material/EventNote';

function DeliveryNoteCard({deliveryNoteSubmitted}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeliveryNote(1))
    }, [dispatch]);

    const { deliveryNote } = useSelector(state => state.deliveryNote);

    console.log("deliveryNote", deliveryNote)


    return (
        <div className="deliveryNoteCard">
            {deliveryNoteSubmitted === 0 || !deliveryNote ? <span>Please go back and submit the delivery notes.</span> :
                (
                    <div className="deliveryNoteCardContainer">
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}><EventNoteIcon /> <h4 style={{ marginLeft: 10 }}>Delivery Notes</h4></div>
                        <table >
                            <tbody>
                                <tr>
                                    <td className="tdHeader">Delivery Customs Value: </td>
                                    <td className="tdLine">{deliveryNote.deliveryCustomsValue}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Delivery Description: </td>
                                    <td className="tdLine">{deliveryNote.deliveryDescription}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Delivery No Of Packages: </td>
                                    <td className="tdLine">{deliveryNote.deliveryNoOfPackages}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Delivery Total Weight Kg: </td>
                                    <td className="tdLine">{deliveryNote.deliveryTotalWeight}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Delivery Customer Ref 1: </td>
                                    <td className="tdLine">{deliveryNote.deliveryCustomerRef1}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Delivery Customer Ref 2: </td>
                                    <td className="tdLine">{deliveryNote.deliveryCustomerRef2}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Delivery Customer Ref 3: </td>
                                    <td className="tdLine">{deliveryNote.deliveryCustomerRef3}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Delivery Service Code: </td>
                                    <td className="tdLine">{deliveryNote.deliveryServiceCode}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Invoice Type: </td>
                                    <td className="tdLine">{deliveryNote.invoiceType === "1" ? "Proforma" : "Commercial"} </td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Reason Of Export: </td>
                                    <td className="tdLine">{deliveryNote.reasonForExport === "01" ? "Sale" : ""}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Shipper's IOSS No.: </td>
                                    <td className="tdLine">{deliveryNote.shipperIOSS}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Shipper's EORI No.: </td>
                                    <td className="tdLine">{deliveryNote.shipperEORINo}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Receiver's EORI No.: </td>
                                    <td className="tdLine">{deliveryNote.receiverEORINo}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Receiver's VAT No.: </td>
                                    <td className="tdLine">{deliveryNote.receiverVAT}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Terms Of Delivery: </td>
                                    <td className="tdLine">{deliveryNote.termsOfDelivery}</td>
                                </tr>
                                <tr>
                                    <td className="tdHeader">Generate Customs Data: </td>
                                    <td className="tdLine">{deliveryNote.generateCustomsData}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
        </div>


    )
}

export default DeliveryNoteCard
