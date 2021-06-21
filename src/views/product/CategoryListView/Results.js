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


const Results = ({categories}) => {
    const [image, setImage] = useState(null);

    const submitAdd = (name) => {
        const data = new FormData();
        if (image) data.append('image', image);
        data.append('name', name);
        axios({
            method: 'post',
            url: API_URL + 'admin/category',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            }
        }).then(function () {
            setImage(null);
            window.location.reload();
        })
    };

    const submitEdit = (_id, name) => {
        const data = new FormData();
        data.append('id', _id);
        console.log('image ', image);
        if (image != null) data.append('image', image);
        data.append('name', name);
        axios({
            method: 'put',
            url: API_URL + 'admin/category/' + _id,
            data: data,

            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            }
        }).then(function () {
            setImage(null);
            window.location.reload();
        })
    };
    const submitDelete = (_id) => {
        const data = new FormData();
        data.append('id', _id);

        axios({
            method: 'delete',
            url: API_URL + 'admin/category/' + _id,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            }
        }).then(function () {
            window.location.reload();
        })
    };


    const [state, setState] = React.useState({
        columns: [
            {
                title: "Image", field: "image", render: rowData => (
                    <img
                        style={{height: 36, borderRadius: '50%', width: 50}}
                        src={rowData.image}
                    />
                ),
                editComponent: props => (
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        value={image}
                        onChange={e => setImage(e.target.files[0])}
                    />
                )
            },
            {title: "Name", field: "name"},
        ]
    });

    return (
        <MaterialTable
            title="Categories"
            columns={state.columns}
            data={categories}

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

Results.propTypes = {
    className: PropTypes.string,
    customers: PropTypes.array.isRequired
};

export default Results;
