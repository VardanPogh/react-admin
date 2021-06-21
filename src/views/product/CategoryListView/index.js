import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import DashboardLayout from "../../../layouts/DashboardLayout";
import {API_URL} from "../../../config";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const CategoryList = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);


    const getCustomer = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Barear ' + sessionStorage.getItem('token'),
            },
        };
        fetch(API_URL + 'static/categories', requestOptions)
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 200) {
                    console.log(data)
                    setCategories(data);
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
                    {/*<Toolbar/>*/}
                    <Box mt={3}>
                        <Results categories={categories}/>
                    </Box>
                </Container>
            </Page>
        </DashboardLayout>
    );
};

export default CategoryList;
