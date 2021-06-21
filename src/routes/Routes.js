import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import ProtectedRoute from './ProtectedRoute';
import LoginView from "../views/auth/LoginView";
import DashboardView from "../views/reports/DashboardView"
import VendorListView from "../views/customer/VendorListView";
import CategoryList from "../views/product/CategoryListView";
import Account from "../views/account/AccountView";
import SettingsView from "../views/settings/SettingsView";
import CustomersListView from "../views/customer/CustomersListView";
import theme from "../theme";
import DriversListView from "../views/DriversListView";
import DietaryList from "../views/product/DietaryListView";
import About from "../views/About";
import Contact from "../views/Contact";

function Routes() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    {/*<Route path="/" exact component={DashboardView}/>*/}
                    <Route path="/login" component={LoginView}/>
                    <ProtectedRoute exact path="/app/vendors" component={VendorListView}/>
                    <ProtectedRoute exact path="/app/dashboard" component={DashboardView}/>
                    <ProtectedRoute exact path="/app/category" component={CategoryList}/>
                    <ProtectedRoute exact path="/app/settings" component={SettingsView}/>
                    <ProtectedRoute exact path="/app/account" component={Account}/>
                    <ProtectedRoute exact path="/app/customers" component={CustomersListView}/>
                    <ProtectedRoute exact path="/app/drivers" component={DriversListView}/>
                    <ProtectedRoute exact path="/app/dietary" component={DietaryList}/>
                    <ProtectedRoute exact path="/app/about" component={About}/>
                    <ProtectedRoute exact path="/app/contact" component={Contact}/>
                    <ProtectedRoute exact path="/" component={DashboardView}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default Routes;
