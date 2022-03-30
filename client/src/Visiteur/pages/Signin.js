import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiMailDotRu } from 'react-icons/si';
import logo from '../images/logo.png'
import Paper from '@material-ui/core/Paper';
import '../CSS/Signin.css'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '75ch',
        },
        marginTop: '4vw',
        textAlign: 'center'
    },
    paper: {
        height: 500,
        width: 800,
        display: "flex",
        flexDirection: "row",
        marginTop: "4.5vh",
        marginBottom: "4.3vh"
    },
    control: {
        padding: theme.spacing(2),
    },
    form: {
        width: 400
    },
}));
const Signin = () => {
    const classes = useStyles();
    const [email, setemail] = React.useState(200)
    const handleEmailChange = (event) => {
        setemail(event.target.value)
    }
    const [password, setpassword] = React.useState('')
    const handlePasswordChange = (event) => {
        setpassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        //verification client side

        const client = {
            e_mail: email,
            password: password
        }
        const emailel = document.querySelector('#e_mail')
        const passel = document.querySelector('#password')
        emailel.value = ''
        passel.value = ''
        setemail('')
        setpassword('')
        axios.post('http://localhost:3001/api/user/login', client).then(
            (result) => {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('isAuth', true);
                window.location.replace("http://localhost:3000/")
            })
            .catch((err) => {
                console.log(err)
                localStorage.setItem('isAuth', false)
            })
    }

    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" >
                        <Grid>
                            <Paper className={classes.paper}>
                                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit} >
                                    <h1 style={{ color: '#3A506B', marginTop:"6vh" }}>Connexion</h1>
                                    <Grid style={{margin:70}} >
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <SiMailDotRu />
                                        </Grid>
                                        <Grid item>
                                            <TextField type='email' id="e_mail" label="E_mail"
                                                onChange={handleEmailChange} />
                                        </Grid>
                                    </Grid>
                                    <br />

                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <RiLockPasswordLine />
                                        </Grid>
                                        <Grid item>
                                            <TextField id="password"
                                            style={{marginTop:"3vh"}}
                                                label="Mot de passe"
                                                type="password"
                                                autoComplete="current-password"
                                                onChange={handlePasswordChange} />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <button className="submitbutton" onSubmit={handleSubmit}>Se connecter</button>
                                    </Grid>
                                </form>
                
                                <div className="secondPart">
                                    <img src={logo} style={{ width: "30vh", marginTop: "22vh" }} />
                                </div>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default Signin
