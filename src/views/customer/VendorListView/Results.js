import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
    makeStyles, TextField
} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import {API_URL} from "../../../config";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Slide from "@material-ui/core/Slide";


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
        padding: '5px 31px 3px',
        width: 850,
        // height: '800px',
        overflow: 'auto',
        height: 677
    },
    table: {
        borderCollapse: 'collapse',
        width: '800px',
        '& td': {
            width: '50%',
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
    }
}));

const confirmVendor = (id) => {
    console.log('id ', id)
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify({
            vendorId: id,
            status: "verified",
        })
    };
    fetch(API_URL + 'admin/vendors/', requestOptions)
        .then(async (response) => {
            const data = await response.json();
            window.location.reload();
        });
};

const Results = ({customers, globalCustomers}) => {
    const classes = useStyles();
    console.log(customers);

//modal settings
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCounty] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const [backgroundImage, setBackgroundImage] = React.useState('');
    const [businessName, setBusinessName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [license, setLicense] = React.useState('');
    const [photos, setPhotos] = React.useState([]);
    const [profileImage, setProfileImage] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
//
    const viewVendor = (data) => {
        const {_id, firstName, lastName, email, city, country, phoneNumber} = data;
        setSelectedId(_id);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setCity(city);
        setCounty(country);
        setPhoneNumber(phoneNumber);

        setBackgroundImage(data.vendor.backgroundImage);
        setBusinessName(data.vendor.businessName);
        setDescription(data.vendor.description);
        setLicense(data.vendor.license);
        setPhotos(data.vendor.photos);
        setProfileImage(data.vendor.profileImage);

        handleOpen();
    };
    const [state, setState] = React.useState({
        columns: [
            {
                title: "Image", field: "vendor.profileImage", render: rowData => (
                    <img
                        style={{height: 36, borderRadius: '50%', width: 50}}
                        src={rowData.vendor.profileImage}
                    />
                ),
            },
            {title: "First Name", field: "firstName"},
            {title: "Last Name", field: "lastName"},
            {title: "Phone", field: "phoneNumber"},
            {
                title: "Confirm", field: "vendor.activeStep", render: rowData => (
                    rowData.vendor.activeStep === 0 && (
                        <Button color='primary' variant='contained'
                                onClick={() => confirmVendor(rowData._id)}>Confirm</Button>
                    ) || (<label color='primary'>Confirmed</label>)
                )
            }
        ]
    });

    return (
        <>
            <MaterialTable
                title="Orders"
                columns={state.columns}
                data={customers}
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
                        <img src={backgroundImage} className={classes.backgroundImg}/>
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
                                <td>City</td>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{country}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Business Name</td>
                                <td>{businessName}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <td>License</td>
                                <td><a href={license}>View License</a></td>
                            </tr>
                        </table>
                        <div className={classes.photosDiv}>
                            {photos.map((photo) => (
                                <img src={photo.url} className={classes.photos}/>
                            ))}
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
