import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import DashboardLayout from "../../../layouts/DashboardLayout";
import {API_URL} from "../../../config";
import DietaryResults from "./Results";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const DietaryList = () => {
    const classes = useStyles();
    const [dietaries, setDietaries] = useState([]);


    const getCustomer = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Barear ' + sessionStorage.getItem('token'),
            },
        };
        fetch(API_URL + 'static/dietaries', requestOptions)
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 200) {
                    console.log(data)
                    setDietaries(data);
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
                        <DietaryResults dietaries={dietaries}/>
                    </Box>
                </Container>
            </Page>
        </DashboardLayout>
    );
};

export default DietaryList;
