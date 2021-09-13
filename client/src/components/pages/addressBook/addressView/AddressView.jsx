import './addressView.css'
import { CircularProgress, Alert, Stack} from '@mui/material';
// import Button from '@mui/material/Button';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress, deleteAddress, setAllSelectedToFalse } from '../../../../redux/actions/addresses.action';


export const AddressView = ({successAlertDisplay, setSuccessAlertDisplay, type, currentId, setCurrentId}) => {



    const dispatch = useDispatch()
    const emptyAddress = {shortName: '', organisationName: '', addressLine1: '', addressLine2: '', city: '', county: '', postcode: '', countryCode: '', additionalInformation: '', contactName: '', contactTelephoneNumber: '', emailAddress: '', notificationSMSNumber: ''}

    const [addressData, setAddressData] = useState(emptyAddress)

    const { addresses } = useSelector(state => state.addresses);

    const address = useSelector(() => {
        if(currentId){
           return addresses.find((a) => a.id === currentId)
        } else {
            return null;
        }
    });

      useEffect(() => {
        if(address) setAddressData(address);
    }, [address])
    
    useEffect(() => {
        if(currentId){
            
        }
    },[currentId])

    const submitSelectedAddress = () => {
        dispatch(setAllSelectedToFalse(type))
        .then(dispatch(updateAddress(currentId, { ...addressData, selectedAddress: 1})))
        .then(setSuccessAlertDisplay(false))
    }

    
    /* alertDialog */

    return (
        !addresses?.length ? <CircularProgress /> : (
            <div className="addressViewContainer">
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" style={{ display: successAlertDisplay ? 'none' : 'block' }}>{type === 1 ? "Fulfilment address: "  + addressData.shortName + " - " + addressData.countryCode  + " has been submited." : "Invoice address: " + addressData.shortName + " - " + addressData.countryCode  + " has been submited."} </Alert>
                </Stack>
                {!currentId ? <h3 className="pleaseSelect">Please select an address...</h3> :
                <div key={addressData.id}>
                    <div className="addressViewHeader">
                        <div>
                            <h2 className="addressViewTitle">{addressData.shortName.toUpperCase()} - {addressData.countryCode.toUpperCase()}</h2>
                            <h3 className="addressViewSubtitle">{addressData.city.toUpperCase()} - {addressData.postcode.toUpperCase()}</h3>
                        </div>
                        
                        <Button variant="contained" color="primary" size="small" onClick={submitSelectedAddress}>Submit selected address</Button>
                    </div>
                    <div className="addressViewBody">
                        <div className="addressView" key={addressData.id}>
                            <div className="addressLine"><strong className="addressLineLabel">Organisation Name: </strong><span className="addressLineInfo">{addressData.organisationName.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">Address Line 1: </strong><span className="addressLineInfo">{addressData.addressLine1.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">Address Line 2: </strong><span className="addressLineInfo">{addressData.addressLine2.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">City: </strong><span className="addressLineInfo">{addressData.city.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">County/State: </strong><span className="addressLineInfo">{addressData.county.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">Postcode: </strong><span className="addressLineInfo">{addressData.postcode.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">Country Code: </strong><span className="addressLineInfo">{addressData.countryCode.toUpperCase()}</span></div>
                            <div className="addressLine" style={ type === 2 ? {display: "none"} : {display: "inline-flex"}}><strong className="addressLineLabel">Additional Information: </strong><span className="addressLineInfo">{addressData.additionalInformation.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">Contact Name: </strong><span className="addressLineInfo">{addressData.contactName.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">Telephone Number: </strong><span className="addressLineInfo">{addressData.contactTelephoneNumber.toUpperCase()}</span></div>
                            <div className="addressLine"><strong className="addressLineLabel">Email Address: </strong><span className="addressLineInfo">{addressData.emailAddress.toLowerCase()}</span></div>
                            <div className="addressLine" style={ type === 2 ? {display: "none"} : {display: "inline-flex"}}><strong className="addressLineLabel">Delivery Notification Sms Number: </strong><span className="addressLineInfo">{addressData.notificationSMSNumber.toUpperCase()}</span></div>
                            <div className="addressViewFooter">

                        <div className="addressViewActions">
                            <Link to={type === 1 ? `/update-fulfilment-address/` : `/update-invoice-address/`}><Button className="addressViewEditButton" variant="outlined" style={{marginRight: 20}}>
                                    Edit</Button></Link>
                            <Button className="addressViewDeleteButton" variant="outlined" color="secondary" onClick={() => {
                                    dispatch(deleteAddress(addressData.id));
                                    window.location = type === 1 ? `/fulfilment-address/` : `/invoice-address/`;
                            }}>Delete</Button>  
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                }

            </div>
        )
    )
}
export default AddressView;