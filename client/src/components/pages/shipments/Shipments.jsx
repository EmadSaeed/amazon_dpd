import './shipments.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';

import { getShipments } from '../../../redux/actions/shipments.action';
import { getBoxes } from '../../../redux/actions/boxes.action';
import { getProducts } from '../../../redux/actions/products.action';
import { truncateSelectedShipment, createSelectedShipment, updateSelectedShipment } from '../../../redux/actions/selectedShipment.action';

import { CircularProgress, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Stack} from '@mui/material';


const Shipments = ({ purchaseOrderId, setPurchaseOrderId, setDeliveryNoteSubmitted }) => {    
    const dispatch = useDispatch();
    const classes = useStyles();
    const [successAlertDisplay, setSuccessAlertDisplay] = useState(true);
    const [boxesData, setBoxesData] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [unitValue, setUnitValue] = useState(10);

/****************************************************************************************************************/

    /* Get Shipment */
    useEffect(() => {
        dispatch(getShipments());
        setBoxesData([]);
        setPurchaseOrderId(null);
    }, []);
    
    const {shipments} = useSelector(state => state.shipments);

    // const completedShipment = shipments.purchaseOrdersAndPackers;
    
    console.log("completedShipment", shipments);

    console.log("purchaseOrderId", purchaseOrderId)

/****************************************************************************************************************/

    /* Get Boxes */
    useEffect(() => {
        if(purchaseOrderId) dispatch(getBoxes(purchaseOrderId));
        setBoxesData([]);
        console.log("purchaseOrderId", purchaseOrderId);
    }, [purchaseOrderId]);
    
    const {boxes} = useSelector(state => state.boxes);
    console.log("boxes", boxes);

    useEffect(() => {
        if(boxes){
            setBoxesData(boxes);
        } else {
            setBoxesData([]);
        }
    }, [boxes])

    useEffect(() => {
        if(boxesData.length && purchaseOrderId){
            setDisabledStatus(false);
        } else {
            setDisabledStatus(true);
        }
    }, [boxesData]);

    
/****************************************************************************************************************/

    /* Get Products */
    const [eans, setEans] = useState();
    
    // console.log("eans", eans)
    
    useEffect(() => {
        if(eans)dispatch(getProducts(eans));
    }, [eans])
    
    const buildProductsList = () => {
        const eanArr = [];
        const boxCountArr = [];
        boxesData.map((box) => {
            const ean = box.EAN;
            const boxCount = box.Count;
            eanArr.push(ean);
            boxCountArr.push(boxCount);
            setTotalQuantity(boxCountArr.reduce((a, b) => a + b, 0));
        });
        setEans(eanArr.join());
    }

    const {products} = useSelector((state) => state.products);
    
    // console.log("products", products)
    
    useEffect(()=>{
        buildProductsList();
    },[boxesData]);
    
/****************************************************************************************************************/

    /* Initiate selectedShipment */
    
    const initiateSelectedShipment = () => {
        boxesData.map((box) => {
            
            const data =  {
                "EAN": box.EAN.toString(),
                "description": `${box.Title.replaceAll("'","").replaceAll(",","")} / ${box.Color.replaceAll("'","").replaceAll(",","")} / ${box.Size}`,
                "productType": `${box.Title.replaceAll("'","").replaceAll(",","")}`,
                "parcel": box.BoxNo,
                "quantity": box.Count
            }
            dispatch(createSelectedShipment(data));
            
        });
    }

            useEffect(() => {
                setUnitValue(Math.ceil(160 / totalQuantity));
        }, [totalQuantity]);

        

        console.log("totalQuantity", totalQuantity)
        console.log('unitValue', unitValue);

    const updateSelectedShipmentWithProducInfo = () => {
        products.map((product) => {
            const EAN = product.EAN;
            const data = {
                "fabric": product.fabric.replaceAll("'","").replaceAll(",",""),
                "harmonisedCode": product.harmonisedCode,
                "unitWeight": product.packWeight,
                "itemOrigin": product.coo,
                // "unitValue": product.packValue,
                "unitValue": unitValue
            }
            dispatch(updateSelectedShipment(EAN, data))
        })
        
    }
    
    /* submitSelectedShipment Button */
    const [disabledStatus, setDisabledStatus] = useState(true);

    const submitShipment = () => {
        dispatch(truncateSelectedShipment())
        .then(initiateSelectedShipment())
        .then(updateSelectedShipmentWithProducInfo())
        .then(setSuccessAlertDisplay(false))
        .then(setDeliveryNoteSubmitted(0))
    }

    
    return (
        <div className="shipments">
         
            <div className="shipmentsHeader">
                 <h3>SHIPMENTS</h3>
                <Button variant="contained" color="primary" size="small" className={classes.margin} disabled={ disabledStatus } onClick={submitShipment}>
                    Submit selected shipment
                </Button>
            </div>
            <TableContainer component={Paper}>
            <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" style={{ display: successAlertDisplay ? 'none' : 'block' }}>Shipment with Purchase Order Id: {purchaseOrderId} has been submited</Alert>
                </Stack>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Purchase Order Id</TableCell>
                        <TableCell >Purchase Order</TableCell>
                        <TableCell >Total Boxes</TableCell>
                        <TableCell >Total Boxes Completed</TableCell>
                        <TableCell >Total Boxes In Process</TableCell>
                        <TableCell >Total Boxes Shipped</TableCell>
                        <TableCell align="right">Date/Time Created</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {!shipments?.length ? <tr><td className="pleaseSelect"> No shipments yet for this date</td></tr> : (   
                    shipments.map((row) => (
                        <TableRow key={row.PurchaseOrderId} id={row.PurchaseOrderId === purchaseOrderId ? "active" : ""} className="tableRow" 
                        onClick={() => {
                            setPurchaseOrderId(row.PurchaseOrderId);
                            dispatch(truncateSelectedShipment());
                            setSuccessAlertDisplay(true);
                            }}>
                            <TableCell component="th" scope="row">
                                {row.PurchaseOrderId}
                            </TableCell>
                            <TableCell >{row.PurchaseOrder}</TableCell>
                            <TableCell >{row.TotalBoxes}</TableCell>
                            <TableCell >{row.TotalBoxesCompleted}</TableCell>
                            <TableCell >{row.TotalBoxesInProcess}</TableCell>
                            <TableCell >{row.TotalBoxesShipped}</TableCell>
                            <TableCell align="right">{row.DateCreated}</TableCell>
                        </TableRow>
                    )))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <div className="boxesHeader">
                    <h4>Shipment details</h4>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Box No.</TableCell>
                            <TableCell>Name</TableCell>
                            {/* <TableCell >Purchase Order</TableCell> */}
                            <TableCell >Item title</TableCell>
                            <TableCell >Colour</TableCell>
                            <TableCell >Size</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                        </TableHead>
                        {!purchaseOrderId ? <tbody><tr><td className="pleaseSelect">Please select shipment</td></tr></tbody> :
                        purchaseOrderId && !boxesData?.length ? <tbody><tr><td className="pleaseSelect"><CircularProgress /></td></tr></tbody> : (   
                        boxesData.map((box) => (
                        <TableBody key={`${box.BoxNo}-${box.EAN}`} id={`${box.BoxNo}-${box.EAN}`}>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {box.BoxNo}
                                </TableCell>
                                {/* <TableCell >{box.PurchaseOrder}</TableCell> */}
                                <TableCell >{box.Name}</TableCell>
                                <TableCell >{box.Title.replaceAll("'","").replaceAll(",","")}</TableCell>
                                <TableCell >{box.Color.replaceAll("'","").replaceAll(",","")}</TableCell>
                                <TableCell >{box.Size}</TableCell>
                                <TableCell align="right">{box.Count}</TableCell>
                            </TableRow>
                        </TableBody>
                        )))}
                    </Table>
                    </TableContainer>
        </div>
    )
}
export default Shipments