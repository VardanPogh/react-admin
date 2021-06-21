import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {
    makeStyles
} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import {API_URL} from "../../../config";

const axios = require("axios");


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));


const DietaryResults = ({dietaries}) => {
    const [image, setImage] = useState(null);

    const submitAdd = (name) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
            })
        };
        fetch(API_URL + 'admin/dietary', requestOptions)
            .then(async (response) => {
                const data = await response.json();
                setImage(null);
                window.location.reload();
            });
    };

    const submitEdit = (_id, name) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
                name: name,
            })
        };
        fetch(API_URL + 'admin/dietary/'+ _id, requestOptions)
            .then(async (response) => {
                const data = await response.json();
                setImage(null);
                window.location.reload();
            });
    };
    const submitDelete = (_id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
        };
        fetch(API_URL + 'admin/dietary/'+ _id, requestOptions)
            .then(async (response) => {
                const data = await response.json();
                setImage(null);
                window.location.reload();
            });
    };


    const [state, setState] = React.useState({
        columns: [
            {title: "Name", field: "name"},
        ]
    });

    return (
        <MaterialTable
            title="Dietary Types"
            columns={state.columns}
            data={dietaries}

            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        submitAdd(newData.name);
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        submitEdit(newData._id, newData.name);
                        resolve();
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        console.log('oldData ', oldData)
                        submitDelete(oldData._id);
                        resolve();
                    })
            }}
            options={{
                actionsColumnIndex: -1,
                search: false
            }}
        />
    );
};

DietaryResults.propTypes = {
    className: PropTypes.string,
    customers: PropTypes.array.isRequired
};

export default DietaryResults;
