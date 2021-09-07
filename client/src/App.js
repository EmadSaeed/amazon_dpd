import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import logo from './AZ-DPD-logo.png';

import FirstPage from "./components/pages/firstPage/FirstPage";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Shipments from "./components/pages/shipments/Shipments";
import DeliveryNotes from "./components/pages/deliveryNotes/DeliveryNotes";
import AddressBook from "./components/pages/addressBook/AddressBook";
import AddressForm from "./components/pages/addressBook/addressForm/AddressForm";
import ReviewShipping from "./components/pages/reviewShipping/ReviewShipping";
import ShipperAddress from "./components/pages/shipperAddress/ShipperAddress";
import { useState } from "react";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  // const now = new Date();
  // const [dateCreated, setDateCreated] = useState(dateformat(now, "yyyy-mm-dd"));
  const [dateCreated, setDateCreated] = useState("2020-03-01");
  const [purchaseOrderId, setPurchaseOrderId] = useState();
  const [deliveryNoteSubmitted, setDeliveryNoteSubmitted] = useState(0)

  console.log("dateCreated: ", dateCreated);


  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getAddresses(1));
  //     // dispatch(getShipments(dateformat(dateCreated, "dd/mm/yyyy")));
  //     // dispatch(getBoxes());
  // }, [dispatch]);

  return (
    <Router>
      <div className='firsPageMobile'>
        <img className="firsPageAZ-logo" src={logo} alt="amazon/dpd logo"/>
        <h1>amazon-dpd Shipping Builder</h1>
        <span className='tryMe'>Try me on desktop!</span>
      </div>
      <Topbar />
      <div className="AppContainer">
        <Sidebar purchaseOrderId={purchaseOrderId} dateCreated={dateCreated} />
        <div className="pagesContainer">
          <Switch>
            <Route exact path="/">
              <FirstPage />
            </Route>
            <Route path="/fulfilment-address">
              <AddressBook currentId={currentId} setCurrentId={setCurrentId} />
            </Route>
            <Route path="/select-shipment">
              <Shipments
                dateCreated={dateCreated}
                setDateCreated={setDateCreated}
                purchaseOrderId={purchaseOrderId}
                setPurchaseOrderId={setPurchaseOrderId}
                setDeliveryNoteSubmitted={setDeliveryNoteSubmitted}
              />
            </Route>
            <Route path="/delivery-notes">
              <DeliveryNotes setDeliveryNoteSubmitted={setDeliveryNoteSubmitted} />
            </Route>
            <Route path="/invoice-address">
              <AddressBook currentId={currentId} setCurrentId={setCurrentId} />
            </Route>
            <Route path="/update-fulfilment-address">
              <AddressForm currentId={currentId} setCurrentId={setCurrentId} />
            </Route>
            <Route path="/update-invoice-address">
              <AddressForm currentId={currentId} setCurrentId={setCurrentId} />
            </Route>
            <Route path="/new-fulfilment-address">
              <AddressForm />
            </Route>
            <Route path="/new-invoice-address">
              <AddressForm />
            </Route>
            <Route path="/review-shipping">
              <ReviewShipping
                purchaseOrderId={purchaseOrderId}
                dateCreated={dateCreated}
                deliveryNoteSubmitted={deliveryNoteSubmitted}
              />
            </Route>
            <Route path="/edit-shipper-address">
              <ShipperAddress />
            </Route>
          </Switch>
        </div>
      </div>
      
    </Router>
  );
};

export default App;
