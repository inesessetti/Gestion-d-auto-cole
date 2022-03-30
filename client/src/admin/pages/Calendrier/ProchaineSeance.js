import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import '../CSS/Calendrier.css'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    width: '60%',
    minWidth: 275,
    marginTop: '2vw',
    marginBottom: '2vw',
    textAlign: 'center',
    color: '#1C2541'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 36,
    color: '#3A506B',
  },
  pos: {
    marginBottom: 12,
  },
});

const relativedate = new Date()

//fonction pour retourner la seance la plus proche: 
function closestsession(arr) {
  let datesArr1 = arr.map(item => new Date(item.date).toString())
  const datesArr = arr.map(item => new Date(item.date))
  let dates = datesArr.sort(function (a, b) {
    var distancea = Math.abs(relativedate - a);
    var distanceb = Math.abs(relativedate - b);
    return distancea - distanceb;
  })
  dates = dates.filter(d => d > relativedate)
  const date = datesArr.find(d => d === dates[0])
  const index = datesArr1.indexOf(new Date(date).toString())
  return arr[index]
}


const ProchaineSeance = () => {
  const [client, setclient] = React.useState({})
  const [Nextsession, setNextsession] = React.useState({})
  const [emp, setemp] = React.useState({})
  const [veh, setveh] = React.useState({})

  React.useEffect(() => {
    axios.get('http://localhost:3001/api/admin/session/sessions', {
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    }).then((result) => {
      setNextsession(closestsession(result.data))
    })
      .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    if (Nextsession
      && typeof (Nextsession.clientId) === typeof (5)) {
      axios.get(`http://localhost:3001/api/admin/employee/${Nextsession.employeeId}`, {
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      }).then((result) => {
        setemp(result.data)
      })
      axios.get(`http://localhost:3001/api/admin/client/${Nextsession.clientId}`, {
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      }).then((result) => setclient(result.data))
    }
    if (Nextsession.employeeId) {
      axios.get(`http://localhost:3001/api/admin/vehicule/${Nextsession.vehiculeId}`, {
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      }).then((result) => setveh(result.data))
    }

  }, [Nextsession])

  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Prochaine Séance:
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {new Date(Nextsession.date).toString().substring(0, 21)}
        </Typography>
        <Typography variant="h5" component="h2">
          {client.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {Nextsession.ref}
        </Typography>
        {Nextsession.ref && Nextsession.ref[0] !== 'f' && <Typography variant="body2" component="p">
          Teacher : {emp.name}
          <br />
          {(Nextsession.vehiculeId != null) ? `véhicule :${veh.marque + ' ' + veh.modele}` : ''}
        </Typography>}
      </CardContent>
      <CardActions>
        <button className="button" style={{ marginLeft: '70%', width: '40%' }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to='/Sessions/add'> <center style={{ fontSize: '1.1rem' }} >Ajouter une séance</center></Link>
        </button>
      </CardActions>
    </Card>
  );
}
export default ProchaineSeance