import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiMailDotRu } from 'react-icons/si';
import {VscAccount} from 'react-icons/vsc';
import logo from '../images/logo.png'
import Paper from '@material-ui/core/Paper';
import {AiOutlinePhone,AiOutlineIdcard} from 'react-icons/ai';
import '../CSS/Signup.css'

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
const Signup = () => {
    const classes = useStyles();
    const [name, setname] = React.useState('')
    const handleNameChange = (event) => {
        setname(event.target.value)
    }
    const [email, setemail] = React.useState(200)
    const handleEmailChange = (event) => {
        setemail(event.target.value)
    }
    const [password, setpassword] = React.useState('')
    const handlePasswordChange = (event) => {
        setpassword(event.target.value)
    }
    const [numero, setnumero] = React.useState(200)
    const handleNumeroChange = (event) => {
        setnumero(event.target.value)
    }
    const [cin, setcin] = React.useState('')
    const handleCINChange = (event) => {
        setcin(event.target.value);
        console.log(cin)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        //verification client side

        const client = {
            name: name,
            e_mail: email,
            password: password,
            telephone: numero,
            CIN: cin
        }

        axios.post('http://localhost:3001/api/user/register', client).then((result) => {
            console.log(result)
            window.location.replace("http://localhost:3000/login");
        })
            .catch((err) => console.log(err))


    }

    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" >
                        <Grid>
                            <Paper className={classes.paper}>
                                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit} >
                                    <h1 style={{ color: '#3A506B', marginTop: "4vh", marginBottom:"-9vh" }}>Inscription</h1>

                                    <Grid style={{ margin: 70 }} >
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <VscAccount />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="Nom" label="Nom" onChange={handleNameChange} />
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <SiMailDotRu />
                                            </Grid>
                                            <Grid item>
                                                <TextField type='email' id="e_mail" label="E_mail" onChange={handleEmailChange} />
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <RiLockPasswordLine />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="password"
                                                    label="Mot de passe"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    onChange={handlePasswordChange} />
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <AiOutlinePhone />
                                            </Grid>
                                            <Grid item>
                                                <TextField type='number' id="numero" label="Numéro de téléphone" onChange={handleNumeroChange} />
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={1} alignItems="flex-end" style={{marginBottom:'-4vh'}}>
                                            <Grid item>
                                                <AiOutlineIdcard />
                                            </Grid>
                                            <Grid item>
                                                <TextField type='number'  id="cin" label="Numéro de CIN" onChange={handleCINChange} />
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <button className="submitbutton" onSubmit={handleSubmit}>S'inscrire</button>
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
export default Signup
