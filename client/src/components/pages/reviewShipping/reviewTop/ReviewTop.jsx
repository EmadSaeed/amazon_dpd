import "./reviewTop.css";
import FulfilmentCard from "./fulfilmentCard/FulfilmentCard";
import DeliveryNoteCard from "./deliveryNoteCard/DeliveryNoteCard";
import InvoiceCard from "./invoiceCard/InvoiceCard";
import ShipperAddressCard from "./shipperAddressCard/ShipperAddressCard";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function ReviewTop({deliveryNoteSubmitted}) {
    return (
        <div className="reviewTop">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item style={{minHeight: "420px"}}><FulfilmentCard /></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item style={{minHeight: "420px"}}><DeliveryNoteCard deliveryNoteSubmitted={deliveryNoteSubmitted}/></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item style={{minHeight: "280px"}}><InvoiceCard /></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item style={{minHeight: "280px"}}><ShipperAddressCard /></Item>
                </Grid>
            </Grid>
        </div>
    )
}

export default ReviewTop
