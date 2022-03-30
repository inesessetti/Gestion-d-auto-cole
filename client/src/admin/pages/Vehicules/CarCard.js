import React from "react";
import {
  makeStyles, Card, CardContent, Button, Typography, Box,
  InputLabel, FormControl, NativeSelect, CardMedia
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import { GoAlert } from 'react-icons/go'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
  },
  media: {
    height: 140,
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    top: -100,
    marginTop: 92,
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft: 22
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft: 15,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: 15,
    marginTop: 15,
  },

  date: {
    marginTop: 50,
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft: 5

  },
  entretien: {
    top: -100,
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '99.33%',
    flexShrink: 0,
    marginRight: 10,
    marginLeft: 5,
    marginTop: 15
  },
  etat: {
    marginLeft: -600,
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '99.33%',
    flexShrink: 0,
    marginRight: 10,
    marginLeft: 5,
    marginTop: 15
  },

  Rating: {
    marginRight: 100,
    top: 100,
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '99.33%',
    flexShrink: 0,
    right: 250,
  },

}));

function nextDate(date, jour, period) {
  var months = 0
  let years = (new Date()).getFullYear() - (date.getFullYear() + 1)
  if (years < 0) {
    years = 0;
    months = (new Date()).getMonth() - date.getMonth()
  }
  else { months += (12 - date.getMonth()) + (new Date()).getMonth() + 1 }
  months += years * 12
  let next_month = 0
  if (months % period === 0) {
    next_month = new Date().getMonth() + 1;
    if (jour > (new Date()).getDate() || months === 0) {
      next_month += period
    }
  }
  else {
    next_month = period - (months % period) + (new Date()).getMonth() + 2
  }

  if (next_month > 12) {
    let month = next_month % 12

    return ((new Date().getFullYear() + Math.floor(next_month / 12)) + '-' + month + '-' + jour)
  }

  return ((new Date().getFullYear()) + '-' + (next_month + 1) + '-' + jour)

}
function isThisMonth(nextDate) {
  let date = new Date(nextDate)
  date.setDate(date.getDate() - 30)
  return (date <= new Date())
}

export default function CarCard({ car }) {
  { console.log(isThisMonth('2')) }
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [epthismonth, setepthismont] = React.useState()
  const [egthismonth, setgpthismont] = React.useState(car.entretienG ? new Date(nextDate(new Date(car.dateAchat), car.entretienG.jour, car.entretienG.periode)).getMonth()
    === new Date().getMonth() : '')
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (

    <Card className={classes.root} variant="outlined" key={car.id}>
      <div>
        <CardContent>
          <CardMedia
            className={classes.media}
          >
            <img src={car.imageLink} width='250px' />
          </CardMedia>
          <br /><br />
          <Typography className={classes.heading}> {car.marque} {car.modele}</Typography>
          <Typography className={classes.secondaryHeading}>{car.disponibilite}</Typography>
          <div className={classes.date}>
            <Typography>
              Date d'achat : {(car.dateAchat) && car.dateAchat.substring(0, 10)}
            </Typography>
            <br />
            <Typography>
              Date de visite technique : {(car.visiteTech) && car.visiteTech.substring(0, 10)}
            </Typography>
          </div>
          <div>
            <Box className={classes.etat} component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Etat du véhicule</Typography>
              <Rating
                name="disabled"
                value={car ? car.etat : 2}
                disabled
              />
            </Box>
          </div>
          <div className={classes.entretien}>
            <Typography>
              {car.entretienP && isThisMonth(nextDate(new Date(car.dateAchat), car.entretienP.jour, car.entretienP.periode)) && <GoAlert style={{ fill: 'red', marginRight: '2%' }} />}
              Date du prochain petit entretien : <span style={{ color: '#f5bd1f', fontSize: '1.2rem' }}> {car.entretienP && nextDate(new Date(car.dateAchat), car.entretienP.jour, car.entretienP.periode)}</span>
            </Typography >
            <Typography>
              {car.entretienG && isThisMonth(nextDate(new Date(car.dateAchat), car.entretienG.jour, car.entretienG.periode)) && <GoAlert style={{ fill: 'red', marginRight: '2%' }} />}
              Date du prochain grand entretien :  <span style={{ color: 'red', fontSize: '1.2rem' }}>{car.entretienG ? nextDate(new Date(car.dateAchat), car.entretienG.jour, car.entretienG.periode) : 'nope'}</span>
            </Typography >
          </div>
          <div>
            <FormControl className={classes.formControl} disabled>
              <InputLabel htmlFor="name-native-disabled"></InputLabel>
              <NativeSelect
                onChange={handleChange}
                inputProps={{
                  name: car.service,
                  id: 'name-native-disabled',
                }}
              >
                <option value="">{(car.disponibilite) ? 'Disponible' : 'Non Disponible'}</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div className={classes.icons}>
            <Button href={`/Vehicules/Formulaire/${car.id}`} variant="contained" color="secondary" style={{ marginLeft: '30%', width: '40%', marginTop: '-29%' }}>
              <center style={{ marginRight: '15%' }} >Modifier</center>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
