import './addressBook.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import AddressView from './addressView/AddressView';
import AddressBookSideBar from './addressBookSideBar/AddressBookSideBar';

/** ICONS **/
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';

const AddressBook = ({ currentId, setCurrentId }) => {
    const [successAlertDisplay, setSuccessAlertDisplay] = useState(true);
    const [type, setType] = useState();
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (pathname.includes("fulfilment-address")) {
            setType(1);
        } else if (pathname.includes("invoice-address")) {
            setType(2);
        }
    }, [pathname])

    useEffect(() => {
        setSuccessAlertDisplay(true);
    }, [type])

    return (
        <div className='addressBook'>
            {type === 1 ? <div className="addressBookHeader"><LocalShippingIcon className="headerIcon" /> <h3>FULFILMENT CENTRE ADDRESS</h3></div> : <div className="addressBookHeader"><DescriptionIcon className="headerIcon" /><h3>INVOICE ADDRESS</h3></div>}
            <div className='addressBookContainer'>
                <AddressBookSideBar setSuccessAlertDisplay={setSuccessAlertDisplay} type={type} currentId={currentId} setCurrentId={setCurrentId} />
                <AddressView successAlertDisplay={successAlertDisplay} setSuccessAlertDisplay={setSuccessAlertDisplay} type={type} currentId={currentId} setCurrentId={setCurrentId} />
            </div>
        </div>
    )
}

export default AddressBook;