import axios from 'axios';

const API = axios.create({ baseURL: 'https://server-amazon-dpd.emadsaeed.com/' });
// const API = axios.create({ baseURL: 'http://localhost:5000' });

// address
export const fatchAddress = (page, type) => API.get(`/addresses?page=${page}&type=${type}`);
export const createAddress = (newAddress) => API.post('/addresses', newAddress);
export const updateAddress = (id, updatedAddress) => API.put(`/addresses/${id}`, updatedAddress);
export const deleteAddress = (id) => API.delete(`/addresses/${id}`);
export const setAllSelectedToFalse = (type) => API.put(`/selectedAddressToFalse?type=${type}`);
export const fatchFulfilmentSelectedAddress = () => API.get(`/getSelectedFulfilmentAddress`);
export const fatchInvoiceSelectedAddress = () => API.get(`/getSelectedInvoiceAddress`);

// shipment
// export const fatchShipments = () => API.get(`https://portal.creativeapparel.co.uk/Api/api/GetPOs`);
export const fatchShipments = () => API.get(`/shipments`);

// boxes
// export const fatchBoxes = (purchaseOrderId) => API.get(`https://portal.creativeapparel.co.uk/Api/api/GetBoxByUserAndPOAndStatus?UserId=0&PurchaseOrderId=${purchaseOrderId}&StatusId=2`);
export const fatchBoxes = (purchaseOrderId) => API.get(`/box?UserId=0&PurchaseOrderId=${purchaseOrderId}&StatusId=2`);

// products
export const fatchProductsByEAN = (EAN) => API.get(`/products?EAN=${EAN}`);

// selectedShipment
export const createSelectedShipment = (selectedShipment) => API.post('/selectedShipments', selectedShipment);
export const getSelectedShipment = (selectedShipment) => API.get('/selectedShipments', selectedShipment);
export const updateSelectedShipment = (EAN, selectedShipment) => API.put(`/selectedShipments/${EAN}`, selectedShipment);
export const truncateSelectedShipment = (selectedShipment) => API.patch('/selectedShipments/truncate', selectedShipment);

// deliveryNote
export const getDeliveryNote = (id) => API.get(`/deliveryNote/${id}`);
export const updateDeliveryNote = (id, updatedDeliveryNote) => API.put(`/deliveryNote/${id}`, updatedDeliveryNote);

// shipperAddress
export const getShipperAddress = (id) => API.get(`/shipperAddress/${id}`);
export const updateShipperAddress = (id, updatedShipperAddress) => API.put(`/shipperAddress/${id}`, updatedShipperAddress);

// shipment file
export const writeShipmentFile = (fileName) => API.get(`/writeShipmentFile?fileName=${fileName}`);
export const downloadShipmentFile = (fileName) => API.get(`/downloadShipmentFile?fileName=${fileName}`);