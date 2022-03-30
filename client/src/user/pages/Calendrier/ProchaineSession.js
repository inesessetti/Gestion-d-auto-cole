import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

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


const ProchaineSeance = ({ sessions }) => {
  const [client, setclient] = React.useState({})
  const [Nextsession, setNextsession] = React.useState(closestsession(sessions))
  const classes = useStyles();
  return (
    <>
{    Nextsession &&   <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Prochaine Séance:
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {new Date(Nextsession.date).toString().substring(0, 21)}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {Nextsession.ref[0]==='c'?'Séance de code':'Séance de conduite'}
          </Typography>
        </CardContent>
      </Card>}
    </>
  );
}
export default ProchaineSeance