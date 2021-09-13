import './deliveryNotes.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveryNote, updateDeliveryNote } from '../../../redux/actions/deliveryNote.action';
import { getSelectedShipment } from '../../../redux/actions/selectedShipment.action';

import useStyles from './styles';
import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert, Stack } from '@mui/material';


const DeliveryNotes = ({setDeliveryNoteSubmitted}) => {

    const emptyDeliveryNote = {
        id: 1,
        deliveryCustomsValue: '',
        deliveryDescription: '',
        deliveryNoOfPackages: '',
        deliveryTotalWeight: '',
        deliveryCustomerRef1: '',
        deliveryCustomerRef2: '',
        deliveryCustomerRef3: '',
        deliveryCustomerRef3: '',
        receiverEORINo: '',
        receiverVAT: '',
        shipperIOSS: '',
        shipperEORINo: '',
        generateCustomsData: '',
        deliveryServiceCode: '',
    }

    const [deliveryNoteData, setDeliveryNoteData] = useState(emptyDeliveryNote);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeliveryNote(1))
    }, [dispatch])

    const { deliveryNote } = useSelector(state => state.deliveryNote);
    console.log("deliveryNote", deliveryNote);

    const classes = useStyles();
    const [errors, setErrors] = useState({});


    const [successAlertDisplay, setSuccessAlertDisplay] = useState(true);

    console.log(deliveryNoteData);

    const validate = () => {
        let errorMessage = {};
        errorMessage.deliveryCustomsValue = deliveryNoteData.deliveryCustomsValue ? "" : "This field is required";
        errorMessage.deliveryDescription = deliveryNoteData.deliveryDescription ? "" : "This field is required";
        errorMessage.deliveryNoOfPackages = deliveryNoteData.deliveryNoOfPackages ? "" : "This field is required";
        errorMessage.deliveryTotalWeight = deliveryNoteData.deliveryTotalWeight ? "" : "This field is required";
        errorMessage.receiverEORINo = deliveryNoteData.receiverEORINo ? "" : "This field is required";
        errorMessage.shipperEORINo = deliveryNoteData.shipperEORINo ? "" : "This field is required";
        setErrors({
            ...errorMessage

        })
        return Object.values(errorMessage).every(x => x == "")
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            dispatch(updateDeliveryNote(1, deliveryNoteData))
            .then(setSuccessAlertDisplay(false))
            setDeliveryNoteSubmitted(1)
        }
    }

 
/* Get Total Weight */
    useEffect(() => {
        dispatch(getSelectedShipment());
    }, [dispatch])

    const {selectedShipment} = useSelector(state => state.selectedShipment);
    const [selectedShipmentData, setSelectedShipmentData] = useState([])

    useEffect(() => {
        if(selectedShipment){setSelectedShipmentData(selectedShipment)}
    }, [selectedShipment])

    console.log("selectedShipmentData", selectedShipmentData)
        
    useEffect(() => {
        if(selectedShipmentData.length){
            let totalWeight = 5;
            let BoxNoArr = [];

            selectedShipmentData.map((s) => {
                totalWeight += s.unitWeight * s.quantity;
                BoxNoArr.push(s.parcel)
            })
            const totalBoxes = BoxNoArr.slice(-1)[0];
        console.log("totalBoxes:", totalBoxes);
            setDeliveryNoteData({ ...deliveryNote, deliveryTotalWeight: Math.round(totalWeight), deliveryNoOfPackages: totalBoxes })

        }
    }, [selectedShipmentData])
  

    return (
        <div className="deliveryNotes">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div className="deliveryNotesHeader">
                    <h3>DELIVERY NOTES</h3>
                    <Button variant="contained" color="primary" size="small" className="deliveryNoteSubmitButton" type="submit">SUBMIT DELIVERY NOTES</Button>

                </div>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" style={{ display: successAlertDisplay ? 'none' : 'block' }}>Delivery notes has been submited.</Alert>
                </Stack>
                {/* <Paper className={classes.pageContent}> */}
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField required
                                variant="outlined"
                                label="Delivery customs value"
                                name="deliveryCustomsValue"
                                value={deliveryNoteData.deliveryCustomsValue}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryCustomsValue: e.target.value })}
                                error={errors.deliveryCustomsValue ? true : false}
                                helperText={errors.deliveryCustomsValue}
                                inputProps={{
                                    maxLength: 10
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Delivery description"
                                name="deliveryDescription"
                                value={deliveryNoteData.deliveryDescription}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryDescription: e.target.value })}
                                error={errors.deliveryDescription ? true : false}
                                helperText={errors.deliveryDescription}
                                inputProps={{
                                    maxLength: 25
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Delivery no of packages"
                                name="deliveryNoOfPackages"
                                value={deliveryNoteData.deliveryNoOfPackages}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryNoOfPackages: e.target.value })}
                                error={errors.deliveryNoOfPackages ? true : false}
                                helperText={errors.deliveryNoOfPackages}
                                inputProps={{
                                    maxLength: 2
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Delivery total weight Kg"
                                name="deliveryTotalWeight"
                                value={deliveryNoteData.deliveryTotalWeight}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryTotalWeight: e.target.value })}
                                error={errors.deliveryTotalWeight ? true : false}
                                helperText={errors.deliveryTotalWeight}
                                inputProps={{
                                    maxLength: 5
                                }}
                            />
                            <TextField
                                variant="outlined"
                                label="Delivery customer ref. 1"
                                name="deliveryCustomerRef1"
                                value={deliveryNoteData.deliveryCustomerRef1}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryCustomerRef1: e.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                label="Delivery customer ref. 2"
                                name="deliveryCustomerRef2"
                                value={deliveryNoteData.deliveryCustomerRef2}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryCustomerRef2: e.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                label="Delivery customer ref. 3"
                                name="deliveryCustomerRef3"
                                value={deliveryNoteData.deliveryCustomerRef3}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryCustomerRef3: e.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                label="Delivery Service Code"
                                name="deliveryServiceCode"
                                value={deliveryNoteData.deliveryServiceCode}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, deliveryServiceCode: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                                variant="outlined"
                                label="Shipper's Destination Tax ID / IOSS Registration No."
                                name="shipperIOSS"
                                value={deliveryNoteData.shipperIOSS}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, shipperIOSS: e.target.value })}
                            />
                        <TextField
                                variant="outlined"
                                label="Shipper's EORI No"
                                name="shipperEORINo"
                                value={deliveryNoteData.shipperEORINo}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, shipperEORINo: e.target.value })}
                            />
                        <TextField
                                variant="outlined"
                                label="Receiver's EORI No"
                                name="receiverEORINo"
                                value={deliveryNoteData.receiverEORINo}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, receiverEORINo: e.target.value })}
                            />
                        <TextField
                                variant="outlined"
                                label="Receiver's VAT No."
                                name="receiverVAT"
                                value={deliveryNoteData.receiverVAT}
                                onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, receiverVAT: e.target.value })}
                            />
                        

                            <FormControl component="fieldset">
                                <FormLabel component="legend">Invoice Type:</FormLabel>
                                <RadioGroup
                                    aria-label="invoiceType"
                                    defaultValue="1"
                                    name="invoiceType"
                                    onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, invoiceType: e.target.value })}
                                    style={{ marginLeft: 15 }}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Proforma" style={{ margin: "2px 0" }} />
                                    <FormControlLabel value="2" control={<Radio />} label="Commercial" style={{ margin: "2px 0" }} />
                                </RadioGroup>
                            </FormControl>
                            

                            <FormControl component="fieldset">
                                <FormLabel component="legend">Terms Of Delivery:</FormLabel>
                                <RadioGroup
                                    aria-label="termsOfDelivery"
                                    defaultValue="DAP"
                                    name="termsOfDelivery"
                                    onChange={(e) => setDeliveryNoteData({ ...deliveryNoteData, termsOfDelivery: e.target.value })}
                                    style={{ marginLeft: 15 }}
                                >
                                    <FormControlLabel value="DAP" control={<Radio />} label="DAP" style={{ margin: "2px 0" }} />
                                    <FormControlLabel value="DT1" control={<Radio />} label="DT1" style={{ margin: "2px 0" }} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                {/* </Paper> */}
            </form>
        </div>
    )
}

export default DeliveryNotes
