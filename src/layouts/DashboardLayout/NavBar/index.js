import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Box,
    Divider,
    Drawer,
    Hidden,
    List,
    makeStyles
} from '@material-ui/core';
import {
    BarChart as BarChartIcon,
    ShoppingBag as ShoppingBagIcon,
    Users as UsersIcon,
} from 'react-feather';
import NavItem from './NavItem';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InfoIcon from '@material-ui/icons/Info';

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith'
};

const items = [
    {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '/app/vendors',
        icon: UsersIcon,
        title: 'Vendors'
    },
    {
        href: '/app/customers',
        icon: UsersIcon,
        title: 'Customers'
    },
    {
        href: '/app/category',
        icon: ShoppingBagIcon,
        title: 'Category'
    },
    {
        href: '/app/drivers',
        icon: DirectionsCarIcon,
        title: 'Drivers'
    },
    {
        href: '/app/dietary',
        icon: FavoriteBorderIcon,
        title: 'Dietary Types'
    },
    {
        href: '/app/about',
        icon: InfoIcon,
        title: 'About Us'
    },
    {
        href: '/app/contact',
        icon: InfoIcon,
        title: 'Contact Us'
    },

];

const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)'
    },
    avatar: {
        cursor: 'pointer',
        width: 64,
        height: 64
    }
}));

const NavBar = ({onMobileClose, openMobile}) => {
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const content = (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
        >
            <Divider/>
            <Box p={2}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box flexGrow={1}/>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{paper: classes.mobileDrawer}}
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    classes={{paper: classes.desktopDrawer}}
                    open
                    variant="persistent"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

NavBar.defaultProps = {
    onMobileClose: () => {
    },
    openMobile: false
};

export default NavBar;
