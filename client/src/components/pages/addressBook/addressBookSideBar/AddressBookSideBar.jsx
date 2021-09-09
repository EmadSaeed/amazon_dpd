import "./addressBookSideBar.css";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses } from '../../../../redux/actions/addresses.action';
import { setAllSelectedToFalse } from '../../../../redux/actions/addresses.action';
import AddressBookPagination from './addressBookPagination/AddressBookPagination';
import { Paper } from '@mui/material';


export default function AddressBookSideBar({ setSuccessAlertDisplay, type, currentId, setCurrentId }) {
    const dispatch = useDispatch();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const page = query.get('page') || 1;

    useEffect(() => {
        if (type) dispatch(getAddresses(page, type));
    }, [type]);


    const emptyAddress = { shortName: '', organisationName: '', addressLine1: '', addressLine2: '', city: '', county: '', postcode: '', countryCode: '', additionalInformation: '', contactName: '', contactTelephoneNumber: '', emailAddress: '', notificationSMSNumber: '' }

    const { addresses } = useSelector(state => state.addresses);

    console.log("addresses: ", addresses)

    const [addressData, setAddressData] = useState(emptyAddress)

    useEffect(() => {
        if (addresses) {
            setAddressData(addresses);
        }
    }, [addresses])

    useEffect(() => {
        if (addressData.length > 0) {
            setCurrentId(addressData[0].id);
        } else { }
    }, [addressData]);

    // console.log("addressData: ", addressData);


    console.log("currentId", currentId);

    return (
        !addressData?.length ? "Please add new address..." : (
            <div className="addressBookSideBar">
                <div className="deliveryInfoList">
                    {addressData.map((address) => (
                        <div key={address.id} id={address.id === currentId ? "active" : ""} className="deliveryInfoItem"
                            onClick={() => {
                                setCurrentId(address.id);
                                dispatch(setAllSelectedToFalse(type));
                                setSuccessAlertDisplay(true);
                            }
                            }>
                            <img className="flag"
                                src={"https://flagcdn.com/h20/" + address.countryCode.toLowerCase() + ".png"}
                            ></img>
                            <div className="addressShort">
                                <div className="addressShortTop">{address.shortName.toUpperCase()}</div>
                                <div>{address.countryCode.toUpperCase()}</div>
                                <span>{address.city.toUpperCase()
                                    + " - " + address.postcode.toUpperCase()}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <Paper className="addressBookPagination">
                    <AddressBookPagination page={page} type={type} />
                </Paper>
            </div>
        )
    )
}
