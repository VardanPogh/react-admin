import React from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Notifications from './Notifications';
import Password from './Password';
import DashboardLayout from "../../../layouts/DashboardLayout";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const SettingsView = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Page
                className={classes.root}
                title="Settings"
            >
                <Container maxWidth="lg">
                    <Notifications/>
                    <Box mt={3}>
                        <Password/>
                    </Box>
                </Container>
            </Page>
        </DashboardLayout>
    );
};

export default SettingsView;
