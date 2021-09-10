import './addressForm.css';
import React, { useState, useEffect } from 'react';
import useStyles from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from "react-router-dom"; 

import { Paper, TextField, Grid, Button} from '@mui/material';


import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';
import { createAddress, updateAddress } from '../../../../redux/actions/addresses.action';
import Dialog from './dialog/Dialog'

const AddressForm = ({ setCurrentId, currentId }) => {
    const classes = useStyles();
    const [formState, setFormState] = useState();
    const [formType, setFormType] = useState();
    const pathname = useLocation().pathname;
    const [openDialog, setOpenDialog] = React.useState(false);


    useEffect(()=>{

        if(pathname === "/update-fulfilment-address/"){
            setFormState("update");
            setFormType(1);
        } else if (pathname === "/update-invoice-address/"){
            setFormState("update");
            setFormType(2);
        } else if (pathname === "/new-fulfilment-address/"){
            setFormState("new");
            setFormType(1);
        } else if (pathname === "/new-invoice-address/"){
            setFormState("new");
            setFormType(2);
        }
        
    },[pathname])
    console.log("formState: ", formState);
    console.log("formType: ", formType);
    
    const [emptyAddress] = useState({shortName: '', organisationName: '', addressLine1: '', addressLine2: '', city: '', county: '', postcode: '', country: '', countryCode: '', additionalInformation: '', contactName: '', contactTelephoneNumber: '', emailAddress: '', notificationSMSNumber: ''});

        console.log("currentId from FORM: ", currentId);
   
    // get current address
    const [addressData, setAddressData] = useState(emptyAddress);
    console.log(addressData);
    const [errors, setErrors] = useState({});
    
    const { addresses } = useSelector(state => state.addresses);

    const address = useSelector(() => {
        if(currentId){
           return addresses.find((a) => a.id === currentId)
        } else {
            return null;
        }
    });

    const dispatch = useDispatch();

    useEffect(()=> {
        if(address) {
            setAddressData(address);
        } else {
            setAddressData(emptyAddress)
        }
    }, [address])

    const fulfilmentValidate = () => {
        let errorMessage = {};
        errorMessage.organisationName = addressData.organisationName ? "" : "This field is required"
        errorMessage.addressLine1 = addressData.addressLine1 ? "" : "This field is required."
        errorMessage.city = addressData.city ? "" : "This field is required."
        errorMessage.postcode = addressData.postcode ? "" : "This field is required."
        errorMessage.countryCode = addressData.countryCode ? "" : "This field is required."
        errorMessage.contactName = addressData.contactName ? "" : "This field is required."
        errorMessage.contactTelephoneNumber = addressData.contactTelephoneNumber ? "" : "This field is required."
        errorMessage.emailAddress = addressData.emailAddress  && (/$^|.+@.+..+/).test(addressData.emailAddress) ? "" : "Email is not valid"
        errorMessage.notificationSMSNumber = addressData.notificationSMSNumber ? "" : "This field is required."

        setErrors({
            ...errorMessage
        })
        return Object.values(errorMessage).every(x => x == "")
    }

    const invoiceValidate = () => {
        let errorMessage = {};
        errorMessage.organisationName = addressData.organisationName ? "" : "This field is required"
        errorMessage.addressLine1 = addressData.addressLine1 ? "" : "This field is required."
        errorMessage.city = addressData.city ? "" : "This field is required."
        errorMessage.postcode = addressData.postcode ? "" : "This field is required."
        errorMessage.countryCode = addressData.countryCode ? "" : "This field is required."
        errorMessage.contactName = addressData.contactName ? "" : "This field is required."
        errorMessage.contactTelephoneNumber = addressData.contactTelephoneNumber ? "" : "This field is required."
        errorMessage.emailAddress = addressData.emailAddress  && (/$^|.+@.+..+/).test(addressData.emailAddress) ? "" : "Email is not valid"

        setErrors({
            ...errorMessage
        })
        return Object.values(errorMessage).every(x => x == "")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formType === 1){
            if(formState === "update" & fulfilmentValidate()) {
                dispatch(updateAddress(currentId, addressData));
                window.location.pathname = `/fulfilment-address/`;
            } else if (formState === "new" & fulfilmentValidate()) {
                dispatch(createAddress({...addressData, addressType: 1, selectedAddress: 0}));
                setOpenDialog(true);
                // window.location.pathname = `/fulfilment-address/`;

            }
        } else {
            if (formState === "update" & invoiceValidate()){
                dispatch(updateAddress(currentId, addressData));
                window.location.pathname = `/invoice-address/`;
            } else if (formState === "new" & invoiceValidate()) {
                dispatch(createAddress({...addressData, addressType: 2, selectedAddress: 0}));
                setOpenDialog(true);
                // window.location.pathname = `/invoice-address/`;
            }
            
        }
    }

    return (
        <div className="newAddress">
            <div className="newAddressHeader">
                <h3 className="newAddressTitle">{formType === 1 ? <LocalShippingIcon /> : <DescriptionIcon />} {formState === "new" ? "NEW " : "UPDATE "}{formType === 1 ? "FULFILMENT " : "INVOICE "} ADDRESS</h3>
                
                </div>
                <Paper className={classes.pageContent}>
                <form className= {classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField 
                                variant="outlined"
                                label="Short Name"
                                name="shortName"
                                value = {addressData.shortName}
                                onChange={(e)=> setAddressData({ ...addressData, shortName: e.target.value})}
                            />
                            <TextField required
                                variant="outlined"
                                label="Organisation Name"
                                name="organisationName"
                                value={addressData.organisationName}
                                onChange={(e)=> setAddressData({ ...addressData, organisationName: e.target.value})}
                                error={errors.organisationName? true : false}
                                helperText={errors.organisationName}
                                inputProps={{
                                    maxLength: 35
                                }}
                                
                            />
                            <TextField required
                                variant="outlined"
                                label="Address Line 1"
                                name="addressLine1"
                                value={addressData.addressLine1}
                                onChange={(e)=> setAddressData({ ...addressData, addressLine1: e.target.value})}
                                error={errors.addressLine1? true : false}
                                helperText={errors.addressLine1}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField 
                                variant="outlined"
                                label="Address Line 2"
                                name="addressLine2"
                                value={addressData.addressLine2}
                                onChange={(e)=> setAddressData({ ...addressData, addressLine2: e.target.value})}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="City"
                                name="city"
                                value={addressData.city}
                                onChange={(e)=> setAddressData({ ...addressData, city: e.target.value})}
                                error={errors.city? true : false}
                                helperText={errors.city}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField 
                                variant="outlined"
                                label="County/State"
                                name="county"
                                value={addressData.county}
                                onChange={(e)=> setAddressData({ ...addressData, county: e.target.value})}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Postcode"
                                name="postcode"
                                value={addressData.postcode}
                                onChange={(e)=> setAddressData({ ...addressData, postcode: e.target.value})}
                                error={errors.postcode? true : false}
                                helperText={errors.postcode}
                                inputProps={{
                                    maxLength: 7,
                                    style: {textTransform:"uppercase"}
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required
                                variant="outlined"
                                label="Country Code"
                                name="countryCode"
                                value={addressData.countryCode}
                                onChange={(e)=> setAddressData({ ...addressData, countryCode: e.target.value})}
                                error={errors.countryCode? true : false}
                                helperText={errors.countryCode}
                                inputProps={{
                                    maxLength: 2,
                                    style: {textTransform:"uppercase"}
                                }}
                            />
                            <TextField
                                variant="outlined"
                                label="Additional Information"
                                name="additionalInformation"
                                value={addressData.additionalInformation}
                                onChange={(e)=> setAddressData({ ...addressData, additionalInformation: e.target.value})}
                                inputProps={{
                                    maxLength: 50,
                                }}
                                style={ formType === 2 ? {display: "none"} : {display: "inline-flex"}}
                            />
                            <TextField required
                                variant="outlined"
                                label="Contact Name"
                                name="contactName"
                                value={addressData.contactName}
                                onChange={(e)=> setAddressData({ ...addressData, contactName: e.target.value})}
                                error={errors.contactName? true : false}
                                helperText={errors.contactName}
                                inputProps={{
                                    maxLength: 25
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Telephone Number"
                                name="contactTelephoneNumber"
                                value={addressData.contactTelephoneNumber}
                                onChange={(e)=> setAddressData({ ...addressData, contactTelephoneNumber: e.target.value})}
                                error={errors.contactTelephoneNumber? true : false}
                                helperText={errors.contactTelephoneNumber}
                                inputProps={{
                                    maxLength: 15
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Email Address"
                                name="emailAddress"
                                value={addressData.emailAddress}
                                onChange={(e)=> setAddressData({ ...addressData, emailAddress: e.target.value})}
                                error={errors.emailAddress? true : false}
                                helperText={errors.emailAddress}
                                inputProps={{
                                    maxLength: 50,
                                    style: {textTransform:"lowercase"}
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Delivery Notification SMS Number"
                                name="notificationSMSNumber"
                                value={addressData.notificationSMSNumber}
                                onChange={(e)=> setAddressData({ ...addressData, notificationSMSNumber: e.target.value})}
                                error={errors.notificationSMSNumber? true : false}
                                helperText={errors.notificationSMSNumber}
                                inputProps={{
                                    maxLength: 15
                                }}
                                style={ formType === 2 ? {display: "none"} : {display: "inline-flex"}}
                            />
                        </Grid>
                    </Grid>
                    <div className="newAddressFooter">
                        <Link to={formType === 1 ? "/fulfilment-address/" : "/invoice-address/"} className="CancelButton" variant="outlined" style={{marginRight: 20}} > CANCEL</Link>
                        <Button className="newAddressAddButton" variant="outlined" style={{marginRight: 20}} type="submit" > {formState === "update" ? "UPDATE " : "ADD NEW "}{formType === 1 ? "FULFILMENT " : "INVOICE "}ADDRESS</Button>
                    </div>
                </form>
            </Paper>
            <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} addressData={addressData} setAddressData={setAddressData} emptyAddress={emptyAddress} formType={formType}/>
        </div>
    )
}

export default AddressForm;
