import "./shipperAddress.css"
import { useDispatch, useSelector } from 'react-redux';
import { getShipperAddress, updateShipperAddress } from '../../../redux/actions/shipperAddress.action';

import useStyles from './styles';
import React, { useState, useEffect } from 'react';
import { Paper, TextField, Grid, Button, Alert, Stack } from '@mui/material';


const ShipperAddress = () => {
    const emptyShipperAddress = {
        id: 1,
        shipperOrganisationName: '',
        shipperAddressLine1: '',
        shipperAddressLine2: '',
        shipperAddressCity: '',
        shipperAddressCounty: '',
        shipperPostcode: '',
        shipperCountryCode: '',
        shipperContactName: '',
        shipperContactTelephoneNo: ''
    }

    const [shipperAddressData, setShipperAddressData] = useState(emptyShipperAddress);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShipperAddress(1))
    }, [dispatch])

    const { shipperAddress } = useSelector(state => state.shipperAddress);
    console.log("shipperAddress", shipperAddress);

    useEffect(() => {
        if (shipperAddress) {
            setShipperAddressData(shipperAddress)
        }
    }, [shipperAddress])

    const classes = useStyles();
    const [errors, setErrors] = useState({});


    const [successAlertDisplay, setSuccessAlertDisplay] = useState(true);

    console.log(shipperAddressData);

    const validate = () => {
        let errorMessage = {};
        errorMessage.shipperOrganisationName = shipperAddressData.shipperOrganisationName ? "" : "This field is required";
        errorMessage.shipperAddressLine1 = shipperAddressData.shipperAddressLine1 ? "" : "This field is required";
        errorMessage.shipperAddressLine2 = shipperAddressData.shipperAddressLine2 ? "" : "This field is required";
        errorMessage.shipperAddressCity = shipperAddressData.shipperAddressCity ? "" : "This field is required";
        errorMessage.shipperAddressCounty = shipperAddressData.shipperAddressCounty ? "" : "This field is required";
        errorMessage.shipperPostcode = shipperAddressData.shipperPostcode ? "" : "This field is required";
        errorMessage.shipperContactName = shipperAddressData.shipperContactName ? "" : "This field is required";
        errorMessage.shipperCountryCode = shipperAddressData.shipperCountryCode ? "" : "This field is required";
        errorMessage.shipperContactTelephoneNo = shipperAddressData.shipperContactTelephoneNo ? "" : "This field is required";
        setErrors({
            ...errorMessage

        })
        return Object.values(errorMessage).every(x => x == "")
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            dispatch(updateShipperAddress(1, shipperAddressData))
                .then(setSuccessAlertDisplay(false))
        }
    }
    return (
        <div className="shipperAddress">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div className="shipperAddressHeader">
                    <h3>SHIPPER ADDRESS</h3>
                </div>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" style={{ display: successAlertDisplay ? 'none' : 'block' }}>Shipper address has been submited.</Alert>
                </Stack>
                <Paper className={classes.pageContent}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField required
                                variant="outlined"
                                label="Shipper Organisation Name"
                                name="shipperOrganisationName"
                                value={shipperAddressData.shipperOrganisationName}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperOrganisationName: e.target.value })}
                                error={errors.shipperOrganisationName ? true : false}
                                helperText={errors.shipperOrganisationName}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Shipper Address Line 1"
                                name="shipperAddressLine1"
                                value={shipperAddressData.shipperAddressLine1}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperAddressLine1: e.target.value })}
                                error={errors.shipperAddressLine1 ? true : false}
                                helperText={errors.shipperAddressLine1}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Shipper Address Line 2"
                                name="shipperAddressLine2"
                                value={shipperAddressData.shipperAddressLine2}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperAddressLine2: e.target.value })}
                                error={errors.shipperAddressLine2 ? true : false}
                                helperText={errors.shipperAddressLine2}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="City"
                                name="shipperAddressCity"
                                value={shipperAddressData.shipperAddressCity}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperAddressCity: e.target.value })}
                                error={errors.shipperAddressCity ? true : false}
                                helperText={errors.shipperAddressCity}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="County"
                                name="shipperAddressCounty"
                                value={shipperAddressData.shipperAddressCounty}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperAddressCounty: e.target.value })}
                                error={errors.shipperAddressCounty ? true : false}
                                helperText={errors.shipperAddressCounty}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField required
                                variant="outlined"
                                label="Postcode"
                                name="shipperPostcode"
                                value={shipperAddressData.shipperPostcode}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperPostcode: e.target.value })}
                                error={errors.shipperPostcode ? true : false}
                                helperText={errors.shipperPostcode}
                                inputProps={{
                                    maxLength: 10
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Country Code"
                                name="shipperCountryCode"
                                value={shipperAddressData.shipperCountryCode}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperCountryCode: e.target.value })}
                                error={errors.shipperCountryCode ? true : false}
                                helperText={errors.shipperCountryCode}
                                inputProps={{
                                    maxLength: 2
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Shipper Contact Name"
                                name="shipperContactName"
                                value={shipperAddressData.shipperContactName}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperContactName: e.target.value })}
                                error={errors.shipperContactName ? true : false}
                                helperText={errors.shipperContactName}
                                inputProps={{
                                    maxLength: 35
                                }}
                            />
                            <TextField required
                                variant="outlined"
                                label="Shipper Contact Telephone No"
                                name="shipperContactTelephoneNo"
                                value={shipperAddressData.shipperContactTelephoneNo}
                                onChange={(e) => setShipperAddressData({ ...shipperAddressData, shipperContactTelephoneNo: e.target.value })}
                                error={errors.shipperContactTelephoneNo ? true : false}
                                helperText={errors.shipperContactTelephoneNo}
                                inputProps={{
                                    maxLength: 20
                                }}
                            />

                        </Grid>
                    </Grid>
                    <div className="shipperAddressFooter">
                    <Button variant="outlined" color="primary" size="small" className="shipperAddressSubmitButton" type="submit">SUBMIT SHIPPER ADDRESS</Button>
                    </div>
                </Paper>
            </form>
        </div>
    )
}

export default ShipperAddress
