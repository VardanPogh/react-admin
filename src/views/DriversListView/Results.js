import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
    makeStyles
} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import {API_URL} from "../../config";
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
        padding: theme.spacing(2, 4, 3),
        width: 850,
        height: 'auto',
        overflow: 'auto',
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
    },
    modalInnerImage: {
        width: 300,
        height: 200,
        margin: 'auto'
    }
}));

const confirmDriver = (id) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify({
            status: "verified",
        })
    };
    fetch(API_URL + 'tookan/agents/' + id, requestOptions)
        .then(async (response) => {
            const data = await response.json();
            // window.location.reload();
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

    const [passport, setPassport] = React.useState('');
    const [drivingLicense, setDrivingLicense] = React.useState('');
    const [carModel, setCarModel] = React.useState('');
    const [fleetType, setFleetType] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
//
    const viewDriver = (data) => {
        const {_id, firstName, lastName, email, city, country, phoneNumber, passport, drivingLicense, carModel, fleetType} = data;
        setSelectedId(_id);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setCity(city);
        setCounty(country);
        setPhoneNumber(phoneNumber);
        setPassport(passport);
        setDrivingLicense(drivingLicense);
        setCarModel(carModel);
        setFleetType(fleetType);


        handleOpen();
    };
    const [state, setState] = React.useState({
        columns: [
            {title: "First Name", field: "firstName"},
            {title: "Last Name", field: "lastName"},
            {title: "Phone", field: "phoneNumber"},
            {
                title: "Confirm", field: "status", render: rowData => (
                    rowData.status === 'not_verified' && (
                        <Button color='primary' variant='contained'
                                onClick={() => confirmDriver(rowData._id)}>Verify</Button>
                    ) || (<label color='primary'>Verified</label>)
                )
            }
        ]
    });

    return (
        <>
            <MaterialTable
                title="Drivers"
                columns={state.columns}
                data={customers}
                actions={[
                    {
                        icon: () => <VisibilityIcon/>,
                        tooltip: "Edit Order",
                        onClick: (_, rowData) => {
                            viewDriver(rowData);
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
                                <td>Car Model</td>
                                <td>{carModel}</td>
                            </tr>
                            <tr>
                                <td>Fleet Type</td>
                                <td>{fleetType}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Passport</td>
                                <td><img className={classes.modalInnerImage} src={passport} alt="passport"/></td>
                            </tr>
                            <tr>
                                <td>Driving License</td>
                                <td><img className={classes.modalInnerImage} src={drivingLicense} alt="drivingLicense"/>
                                </td>
                            </tr>
                        </table>
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
