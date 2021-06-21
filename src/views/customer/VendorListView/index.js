import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import DashboardLayout from "../../../layouts/DashboardLayout";
import {API_URL} from "../../../config";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const VendorListView = () => {
    const classes = useStyles();
    const [customers, setCustomers] = useState([]);


    const getCustomer = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Barear ' + sessionStorage.getItem('token'),
            },
        };
        fetch(API_URL + 'admin/vendors', requestOptions)
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 200) {
                    setCustomers(data);
                }
            });
    };
    useEffect(() => {
        getCustomer();
    }, []);

    return (
        <DashboardLayout>
            <Page
                className={classes.root}
                title="Customers"
            >
                <Container maxWidth={false}>
                    <Box mt={3}>
                        <Results customers={customers} globalCustomers={customers}/>
                    </Box>
                </Container>
            </Page>
        </DashboardLayout>
    );
};

export default VendorListView;
