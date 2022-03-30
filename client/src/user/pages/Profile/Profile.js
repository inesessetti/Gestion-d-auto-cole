import React from "react";
import './Profile.css'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import { FcCheckmark } from "react-icons/fc";
import { IoMdAlert } from "react-icons/io";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 500,
    width: 900,
    marginTop: 50,
    display: "flex",
    flexDirection: "row"
  },
  control: {
    padding: theme.spacing(2),
  },
  colorText: {
    color: "#5bc0be",
    fontWeight:"bold",
    fontSize:16
  },
  card: {
    marginTop: -650
  },
  table: {
    minWidth: 650,
  },
}));



const Profile = () => {
  const [user, setuser] = React.useState({})
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/auth', {
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    }).then((result) => {
      setuser(result.data.userData)
    })
      .catch((err) => console.log(err))
  }, [])

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  var size = Object.size(user.sessions);

  const classes = useStyles();
  return (
    <div style={{marginTop:650}}>
      <div className="PageProfile">
        <Grid container className={classes.card}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item>
                <Paper className={classes.paper}>
                  <Box style={{ backgroundColor: "#0b132b", width: "15vw", height: "69.4vh" }}>
                    <center style={{ marginRight: "80px" }}>
                      <div className="Titles">
                        <h1 style={{ color: "#f2f2f2" }} >{user.name}</h1>
                        <hr className="hr" />
                        <div className="sousTitre">
                          <h2>Candidat</h2></div>
                      </div></center>
                  </Box>
                  <div style={{ marginTop: 50, marginLeft:10 }}>
  
                  <TableContainer  style={{marginBottom:10}} >
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        <TableRow >
                          <TableCell component="th" scope="row">
                          Nombre total de séances
                          </TableCell>
                          <TableCell align="right"><span className={classes.colorText}>{size} séances</span></TableCell>

                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer  style={{marginBottom:10}}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                          Nombre de séances de code
                          </TableCell>
                          <TableCell align="right"><span className={classes.colorText}> {(Object.size(user.sessions) > 0) ? (Object.size(user.sessions.filter(u => u[0] === 'c'))) : ''} séances</span></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer  style={{marginBottom:10}}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                          Nombre de séances de conduite
                          </TableCell>
                          <TableCell align="right">
                          <span className={classes.colorText}> {(Object.size(user.sessions) > 0) ? Object.size(user.sessions.filter(u => u[0] === 'p')) : ''} séances</span>
                          </TableCell>

                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer  style={{marginBottom:10}}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                          Numéro de carte d'identité nationale
                          </TableCell>
                          <TableCell align="right"><span className={classes.colorText}> {user.CIN}</span></TableCell>

                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer style={{marginBottom:10}}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Numéro de téléphone
                          </TableCell>
                          <TableCell align="right"><span className={classes.colorText}> {user.telephone}</span></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {(user.payment) ? <>
                      <h3 style={{ color: "green" }}><FcCheckmark /> Vous avez payé tout vos séances.</h3>
                      <br /> </> :
                      <h3 style={{ color: "red", fontFamily: "Gill Sans", fontSize: '1.2rem', textAlign: "left", marginRight: '5%' }}><IoMdAlert /> Vous avez des séances non payés! Veuillez vérifier votre compte.</h3>

                    }
                    <br /><br />
                    <div style={{ display: 'inline-block', marginTop: '0%', marginLeft: '50%', width: '100%' }}>
                      <Link to="/user/Profile/edit" style={{ textDecoration: 'none', }}><button href="/user/Profile/edit" className='button2' style={{ width: '20%', marginLeft: '3%' }}>
                        Modifier
                      </button></Link>
                      <Link to="/user/paiement" style={{ textDecoration: 'none', }}> <button className='button2' style={{ width: '20%', marginLeft: '3%' }}>
                        Paiement
                      </button></Link>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

    </div>
  );
};

export default Profile;
