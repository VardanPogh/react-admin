import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';

import {
    makeStyles, withStyles
} from '@material-ui/core';
import {API_URL} from "../../../config";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 1000,
        overflow: 'auto',
    },
    table: {
        borderCollapse: 'collapse',
        width: '950px',
        '& td': {
            // width: '50%',
            border: '1px solid #ddd',
            padding: '8px'
        },
        '& tr:nth-child(even)': {
            backgroundColor: '#97869c',
        }
    },
    backgroundImg: {
        width: '800px',
        height: '325px',
        objectFit: 'fill',
    },
    photos: {
        height: '100px',
        width: '100px',
        margin: 30
    },
    orderImages: {
        height: 40,
        width: 40,
    },
    inline_flex: {
        // display: 'inline-flex',
        margin: '10px 5px',
        '& span': {
            margin: '0 5px',
        },
        width: '100%',
    },
    rightButton: {
        float: 'right',
        textTransform: 'capitalize',
        background: 'white',
        border: '1px solid ' + theme.palette.primary.main,
    },
    ordersButton:{
        background: 'white',
        border: '1px solid ' + theme.palette.primary.main,
    }
}));

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const Results = ({customers}) => {
    const classes = useStyles();
    console.log(customers);

//modal settings
    const [open, setOpen] = React.useState(false);
    const [openOrder, setOpenOrder] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [orders, setOrders] = React.useState([]);
    const [shippingAddresses, setShippingAddresses] = React.useState([]);


    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpenOrder = () => {
        setOpenOrder(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseOrder = () => {
        setOpenOrder(false);
    }
//
    const viewVendor = (data) => {
        const {_id, firstName, lastName, email, status, shippingAddresses} = data;
        setSelectedId(_id);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setStatus(status);
        setShippingAddresses(shippingAddresses);
        handleOpen();
    };

    const getOrders = (id) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Barear ' + sessionStorage.getItem('token'),
            },
        };
        fetch(API_URL + 'orders?customerId=' + id, requestOptions)
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 200) {
                    setOrders(data);
                }
            });
        handleOpenOrder();


    };
    const [state, setState] = React.useState({
        columns: [
            {title: "First Name", field: "firstName"},
            {title: "Last Name", field: "lastName"},
            {title: "Email", field: "email"},
            {
                field: 'orders',
                title: 'Orders',
                render: rowData => <Button className={classes.ordersButton} onClick={() => {
                    getOrders(rowData._id)
                }}>Order</Button>
            }
        ],


    });

    return (
        <>
            <MaterialTable
                title="Customers"
                columns={state.columns}
                data={customers}
                localization={{
                    header: {
                        actions: 'View Details'
                    },
                }}
                actions={[
                    {
                        icon: () => <VisibilityIcon/>,
                        tooltip: "Edit Order",
                        onClick: (_, rowData) => {
                            viewVendor(rowData);
                        }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    search: false
                }}
            />

            {/*//order Modal*/}
            <Modal
                className={classes.modal}
                open={openOrder}
                onClose={handleCloseOrder}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={openOrder}>
                    <div className={classes.paper}>
                        <table className={classes.table}>
                            <thead>
                            <tr>
                                <th>
                                    Order Number
                                </th>
                                <th>
                                    Total
                                </th>
                                <th>
                                    Shipping Price
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Products
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.total}</td>
                                    <td>{order.shippingPrice}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {order.products.map((product) => (
                                            <div className={classes.inline_flex}>
                                                <img className={classes.orderImages}
                                                     src={product.productId.images[0].url}/>
                                                <span>{product.productId.title}</span>
                                                <span>Quantity : {product.quantity}</span>
                                                <span>Unit Price : {product.unitPrice}</span>
                                                {product && (<HtmlTooltip
                                                        title={
                                                            product.addons && (<React.Fragment>
                                                                {product.addons.map((addon) => (
                                                                    <>
                                                                        <h3>{addon.title}</h3>
                                                                        {addon.options.map((option) => (
                                                                            <p>{option.name} : {option.price}</p>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                            </React.Fragment>)
                                                        }
                                                    >
                                                        <Button className={classes.rightButton}>Addons</Button>
                                                    </HtmlTooltip>
                                                )}
                                            </div>

                                        ))}
                                    </td>
                                </tr>

                            ))}
                            </tbody>
                        </table>
                        <div>

                        </div>
                    </div>
                </Slide>
            </Modal>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open}>
                    <div className={classes.paper}>
                        <table className={classes.table}>
                            <tr>
                                <td>First Name</td>
                                <td>{firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{lastName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{status}</td>
                            </tr>
                            <tr>
                                <td>
                                    Addresses
                                </td>
                                <td>
                                    {shippingAddresses.map((address) => (
                                        <p>
                                            {address.formatedAddress}
                                        </p>
                                    ))}
                                </td>
                            </tr>
                        </table>
                        <div>

                        </div>
                    </div>
                </Slide>
            </Modal>
        </>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    customers: PropTypes.array.isRequired
};

export default Results;
