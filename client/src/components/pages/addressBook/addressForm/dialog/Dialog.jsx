import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({openDialog, setOpenDialog, addressData, setAddressData, emptyAddress, formType}) {

//   const handleClickOpen = () => {
//     setOpenDialog(true);
//   };

  const handleForward = () => {
    setOpenDialog(false);
    if(formType === 1){
        window.location.pathname = `/fulfilment-address/`
    } else {
        window.location.pathname = `/invoice-address/`
    }
  };

  const handleAnotherAddress = () => {
    setAddressData(emptyAddress)
    setOpenDialog(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleForward}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{addressData.organisationName + " has been added"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <h5>{addressData.addressLine1}</h5>
            <h5>{addressData.addressLine2}</h5>
            <h5>{addressData.city}</h5>
            <h5>{addressData.county}</h5>
            <h5>{addressData.postcode}</h5>
            <h5>{addressData.countryCode}</h5>
            <h5>{addressData.additionalInformation}</h5>
            <h5>{addressData.contactName}</h5>
            <h5>{addressData.contactTelephoneNumber}</h5>
            <h5>{addressData.emailAddress}</h5>
            <h5>{addressData.notificationSMSNumber}</h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnotherAddress}>+ Add another address</Button>
          <Button onClick={handleForward}>Finish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
