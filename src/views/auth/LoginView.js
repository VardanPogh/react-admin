import React, {useState} from 'react';
import {Redirect, useHistory, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {API_URL} from "../../config";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#8e44ad'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        background: '#8e44ad'
    },
    errorMsg: {
        color: 'white',
        background: '#8e44ad'
    }
}));

function LoginView() {
    const history = useHistory();
    const isAuthenticated = sessionStorage.getItem('token');
    if (isAuthenticated) {
        history.push('/');
    }
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event, item) => {
        if (item === 'email') {
            setEmail(event.target.value);
        } else if (item === 'password') {
            setPassword(event.target.value);
        }
    };
    // eslint-disable-next-line consistent-return


    const handleClick = () => {

        if (email && password) {

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password
                })
            };
            fetch(API_URL + 'admin/login', requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    if (response.status === 200 && data.jwtToken) {
                        sessionStorage.setItem('token', data.jwtToken);
                        history.push('/');
                    } else {
                        seterrorMsg(data.error.message);
                    }
                });
        } else {
            seterrorMsg('fill all sections');
        }
        if (sessionStorage.getItem('token')) {
            history.push('/');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        value={email}
                        onChange={(event) => handleChange(event, 'email')}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        value={password}
                        onChange={(event) => handleChange(event, 'password')}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleClick}
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </div>
            </div>

        </Container>
    );
}

LoginView.propTypes = {
    history: PropTypes.object
};

export default withRouter(LoginView);