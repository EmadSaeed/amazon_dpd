import { Pagination, PaginationItem } from '@material-ui/lab';
import { useLocation, Link } from 'react-router-dom';
import useStyles from './styles';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAddresses } from '../../../../../redux/actions/addresses.action';

const AddressBookPagination = ({ page, type }) => {
    const { numberOfPages } = useSelector((state) => state.addresses);
    const classes = useStyles();
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;

        console.log("page: ", page)
        console.log("type: ", type);

    useEffect(() => {
        if(page) dispatch(getAddresses(page, type));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={pathname.includes("fulfilment-address") ? `/fulfilment-address?page=${item.page}` : `/invoice-address?page=${item.page}`} />
            )}
        />

    )
}
export default AddressBookPagination;