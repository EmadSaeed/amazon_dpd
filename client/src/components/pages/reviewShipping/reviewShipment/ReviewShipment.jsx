import "./reviewShipment.css"
import useStyles from './styles';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { getSelectedShipment } from '../../../../redux/actions/selectedShipment.action';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';


function ReviewShipment({purchaseOrderId, dateCreated}) {    
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedShipment());
    }, [dispatch])

    const {selectedShipment} = useSelector(state => state.selectedShipment);
    const [selectedShipmentData, setSelectedShipmentData] = useState([])

    useEffect(() => {
        if(selectedShipment){setSelectedShipmentData(selectedShipment)}
    }, [selectedShipment])

    console.log(selectedShipmentData)
    return (
        <div className="reviewShipment">
            <div className="boxesHeader">
                    <h4>Shipment items details ID: {purchaseOrderId} </h4>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Parcel No.</TableCell>
                            <TableCell>EAN</TableCell>
                            <TableCell >Item description</TableCell>
                            <TableCell >Fabric</TableCell>
                            <TableCell >Harmonised Code</TableCell>
                            <TableCell >Item Origin</TableCell>
                            <TableCell >Unit Weight - Kg</TableCell>
                            <TableCell >Unit Value - £</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                        </TableHead>
                        {!selectedShipmentData ?.length ? <tbody><tr><td className="No shipment">Please go back to Shipment and submit a shibment</td></tr></tbody> :
                        (   
                            selectedShipmentData.map((line) => (
                        <TableBody key={`${line.id}`} id={`${line.id}`}>
                            <TableRow >
                                <TableCell component="th" scope="row">{line.parcel}</TableCell>
                                <TableCell >
                                    {line.EAN}
                                </TableCell>
                                <TableCell >{line.description}</TableCell>
                                <TableCell >{line.fabric}</TableCell>
                                <TableCell >{line.harmonisedCode}</TableCell>
                                <TableCell >{line.itemOrigin}</TableCell>
                                <TableCell >{line.unitWeight}</TableCell>
                                <TableCell >{line.unitValue}</TableCell>
                                <TableCell align="right">{line.quantity}</TableCell>
                            </TableRow>
                        </TableBody>
                        )))}
                    </Table>
                    </TableContainer>
        </div>
    )
}

export default ReviewShipment
