import { combineReducers } from "redux";

import addresses from './addresses.reducer';
import fulfilmentSelectedAddress from './addresses.reducer';
import invoiceSelectedAddress from './addresses.reducer';
import shipments from './shipments.reducer';
import boxes from './boxes.reducer';
import products from './products.reducer';
import selectedShipment from './selectedShipment.reducer';
import deliveryNote from './deliveryNote.reducer';
import shipperAddress from './shipperAddress.reducer';
import writeShipmentFile from './shipmentFile.reducer';

export default combineReducers({
    addresses, shipments, boxes, products, selectedShipment, fulfilmentSelectedAddress, invoiceSelectedAddress, deliveryNote, shipperAddress, writeShipmentFile
});