const fs = require('fs')
const Address = require("../models/address.model.js");
const DeliveryNote = require("../models/deliveryNote.model.js");
const ShipperAddress = require("../models/shipperAddress.model.js");
const SelectedShipment = require("../models/selectedShipment.model.js");


exports.writeShipmentFile = async (req, res) => {
    const { fileName } = req.query;
    const filePath = `${__dirname}/dpdImports/${fileName}.csv`;

    // write header
    const header = "deliveryOrganisation,deliveryAddressLine1,deliveryAddressLine2,deliveryCity,deliveryCounty,deliveryPostcode,deliveryCountryCode,deliveryAdditionalInformation,deliveryContactName,deliveryContactTelephoneNumber,deliveryemailAddress,deliveryNotificationSMSNumber,deliveryCustomsValue,deliveryDescription,deliveryNoOfPackages,deliveryTotalWeight,deliveryCustomerRef1,deliveryCustomerRef2,deliveryCustomerRef3,invoiceType,reasonForExport,receiverEORINo,receiverVAT,shipperIOSS,shipperEORINo,termsOfDelivery,generateCustomsData,deliveryServiceCode,extendedLiabilityFlag,receiverOrganisation,receiverAddressLine1,receiverAddressLine2,receiverCity,receiverCounty,receiverPostcode,receiverCountryCode,receiverContactName,receiverContactTelephoneNumber,receiverEmailAddress,shipperOrganisation,shipperAddressLine1,shipperAddressLine2,shipperCity,shipperCounty,shipperPostcode,shipperCountryCode,shipperContactName,shipperContactTelephoneNumber\n"

    fs.writeFileSync(filePath, header, err => {
        if (err) {
            console.error(err)
            return
        }
    })

    // Write Fulfilment information
    Address.getSelectedFulfilmentAddress((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SelectedFulfilmentAddress."
            });
        } else {
            const fulfilmentAddressData = `${data[0].organisationName},${data[0].addressLine1},${data[0].addressLine2},${data[0].city},${data[0].county},${data[0].postcode},${data[0].countryCode},${data[0].additionalInformation},${data[0].contactName},${data[0].contactTelephoneNumber.replaceAll(" ", "")},${data[0].emailAddress},${data[0].notificationSMSNumber},`
            // res.send(data)
            fs.appendFileSync(filePath, fulfilmentAddressData, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        };
    });

    // Write Delivery Notes
    DeliveryNote.findOneDeliveryNote(1, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found deliveryNote with id = 1."
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving deliveryNote with id = 1"
                });
            }
        } else {
            const deliveryNoteData = `${data.deliveryCustomsValue},${data.deliveryDescription},${data.deliveryNoOfPackages},${data.deliveryTotalWeight},${data.deliveryCustomerRef1},${data.deliveryCustomerRef2},${data.deliveryCustomerRef3},${data.invoiceType},${data.reasonForExport},${data.receiverEORINo},${data.receiverVAT},${data.shipperIOSS},${data.shipperEORINo},${data.termsOfDelivery},${data.generateCustomsData},${data.deliveryServiceCode},${data.extendedLiabilityFlag},`
            // res.send(data)
            fs.appendFileSync(filePath, deliveryNoteData, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        };
    });


    // Write Invoice Address
    Address.getSelectedInvoiceAddress((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SelectedInvoiceAddress."
            });
        } else {
            const invoiceAddressData = `${data[0].organisationName},${data[0].addressLine1},${data[0].addressLine2},${data[0].city},${data[0].county},${data[0].postcode},${data[0].countryCode},${data[0].contactName},${data[0].contactTelephoneNumber.replaceAll(" ", "")},${data[0].emailAddress},`
            // res.send(data)
            fs.appendFileSync(filePath, invoiceAddressData, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        };
    });


    // Write Shipper Address
    ShipperAddress.findOneShipperAddress(1, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found shipperAddress with id = 1"
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving shipperAddress with id = 1"
                });
            }
        } else {
            const shipperAddressData = `${data.shipperOrganisationName},${data.shipperAddressLine1},${data.shipperAddressLine2},${data.shipperAddressCity},${data.shipperAddressCounty},${data.shipperPostcode},${data.shipperCountryCode},${data.shipperContactName},${data.shipperContactTelephoneNo.replaceAll(" ", "")}\n`
            // res.send(data)
            fs.appendFileSync(filePath, shipperAddressData, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        };
    });

    // Write Shipment
    SelectedShipment.getAllSelectedShipments((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SelectedShipments."
            });
        } else {
            // const productHeader = "identifier,productCode,fabric,harmonisedCode,unitWeight,parcel,description,productType,itemOrigin,quantity,unitValue\n"
            // // res.send(data)
    
            // fs.appendFileSync(filePath, productHeader, err => {
            //     if (err) {
            //         console.error(err)
            //         return
            //     }
            // })
        
            let shipmentItem = ""

            data.map((item) => {
                shipmentItem += `PRD|${item.EAN}|${item.fabric}|${item.harmonisedCode}|${item.unitWeight}|${item.parcel}|${item.description}|${item.productType}|${item.itemOrigin}|${item.quantity}|${item.unitValue}\n`.replaceAll(","," -");
            })
            res.send(shipmentItem)

            fs.appendFileSync(filePath, shipmentItem, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        };
    });

// res.status(200).send({
//     message: "Success"
// });

}

exports.downloadShipmentFile = async (req, res) => {
    const { fileName } = req.query;
    const file = `${__dirname}/dpdImports/${fileName}.csv`; // path to folder
    res.download(file); // Set disposition and send it.
    // console.log("file has been downloaded")
}
