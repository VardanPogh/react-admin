import React, {useEffect, useState} from 'react';
import {
    Box,
    Container, Grid,
    makeStyles, TextField
} from '@material-ui/core';
import {API_URL} from "../../config";
import DashboardLayout from "../../layouts/DashboardLayout";
import Page from "../../components/Page";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    d_inline: {
        display: 'flex',
        marginTop: 25,
        justifyContent: 'center',
    },
    coloredText: {
        color: theme.palette.primary.main
    }
}));

const Contact = () => {
    const classes = useStyles();
    const [homeChef, setHomeChef] = useState('');


    const getInfos = () => {
        // const requestOptions = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Authorization": 'Barear ' + sessionStorage.getItem('token'),
        //     },
        // };
        // fetch(API_URL + 'static/data?type=about_home_chef', requestOptions)
        //     .then(async (response) => {
        //         const data = await response.json();
        //         if (response.status === 200) {
        //             setHomeChef(data.text);
        //         }
        //     });
    };


    useEffect(() => {
        getInfos();
    }, []);


    const SubmitChange = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Barear ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
                type: "about_home_chef",
                text: homeChef
            })
        };
        fetch(API_URL + 'admin/static', requestOptions)
            .then(async (response) => {
                window.location.reload();
            });
    }


    return (
        <DashboardLayout>
            <Page
                className={classes.root}
                title="Customers"
            >
                <Container maxWidth={false}>
                    <h1 className={classes.coloredText}>Contact Us</h1>
                    <div className={classes.d_inline}>
                        <TextField
                            label="Email"
                            onChange={(e) => {
                                setHomeChef(e.target.value)
                            }}
                            value={homeChef}
                            variant="outlined"
                        />
                        <Button variant='contained' color='primary' onClick={SubmitChange}>Save</Button>
                    </div>
                </Container>
            </Page>
        </DashboardLayout>
    );
};

export default Contact;
