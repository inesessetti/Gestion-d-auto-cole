import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles, Accordion, AccordionDetails, AccordionSummary, Typography, Box,
  InputLabel, FormControl, NativeSelect
} from '@material-ui/core';
import { AiFillCar } from 'react-icons/ai'
import Rating from '@material-ui/lab/Rating';
import { MdExpandMore } from 'react-icons/md'
import '../CSS/Vehicules.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    marginBottom: 5
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 10,
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft: 50
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: 200,
  },
  Titre: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '2.33%',
    flexShrink: 0,
    right: 550
  },
  SousTitre: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginRight: 25,
  },
  infos: {
    display: "flex",
    flexDirection: 'column',
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
  if (jour > (new Date()).getDate()) {
    months--
  }
  let next_month = 0
  if (months % period === 0) {
    next_month = new Date().getMonth() + 1;
    if (jour > (new Date()).getDate() || months === 0) {
      next_month += period
    }
  }
  else { next_month = period - (months % period) + (new Date()).getMonth() + 2 }

  if (next_month > 12) {
    let month = next_month % 12

    return ((new Date().getFullYear() + Math.floor(next_month / 12)) + '-' + month + '-' + jour)
  }

  return ((new Date().getFullYear()) + '-' + (next_month + 1) + '-' + jour)

}

function closestE(date, ep, eg) {
  console.log('entred btw')
  console.log(ep)
  const dateP = new Date(nextDate(date, ep.jour, ep.periode))
  const dateG = new Date(nextDate(date, eg.jour, eg.periode))
  if (dateP < dateG) return { color: '#f5bd1f', date: dateP, name: 'Petit entretien' }
  else return { color: 'red', date: dateG, name: 'Grand entretien' }
}

export default function VehiculeDispo({ car }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [cardata, setcardata] = useState()
  const [Ent, setEnt] = useState(closestE(new Date(car.dateAchat), car.entretienP, car.entretienG))


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div className={classes.root}>
      {car &&
        <div>
          {(!car.disponibilite) ? '' :
            <div>
              <Accordion className={classes.cards} expanded={expanded === car.id} onChange={handleChange(car.id)} key={car.id}>
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <AiFillCar />
                  <Typography className={classes.heading}> {car.marque} {car.modele}</Typography>
                  <Typography className={classes.secondaryHeading}>{car.disponibilite ? "Disponible" : "Non disponible"}</Typography>

                </AccordionSummary>
                <br />
                <br />
                <AccordionDetails className={classes.infos}>
                  <Typography>

                  </Typography>

                  <div className={classes.date}>
                    <Typography>
                      Date d'achat : {car.dateAchat.substring(0, 16)}

                    </Typography>
                  </div>
                  <div className={classes.entretien}>
                    <Typography>
                      Date du visite technique: {car.visiteTech.substring(0, 16)}
                    </Typography >
                  </div>
                  <div className={classes.entretien}>
                    <Typography>
                      {Ent && <h3 style={{ color: Ent.color }}>Date du prochaine entretien: {Ent.date.toString().substring(0, 16)}</h3>}
                    </Typography >
                  </div>
                  <div>
                    <Box className={classes.entretien} component="fieldset" mb={3} borderColor="transparent">
                      <Typography component="legend">Etat du véhicule</Typography>
                      <Rating
                        name="disabled"
                        value={car.etat}
                        disabled
                      />
                    </Box>
                  </div>
                  <div>
                    <FormControl className={classes.formControl} disabled>
                      <InputLabel htmlFor="name-native-disabled"></InputLabel>
                      <NativeSelect
                        value={car.service}
                      >
                        <option value={true}>En Service</option>
                        <option value={false}>HorsService</option>
                      </NativeSelect>
                    </FormControl>
                  </div>
                  <div className={classes.icons}>
                    <Typography >
                      <button className="button" style={{ fontFamily: "Avanta Garde", width: '8vw', marginLeft: 490, fontSize: '1.1rem' }} >
                        <Link to={`/Vehicules/Formulaire/${car.id}`} style={{ textDecoration: 'none', color: "#f2f2f2" }}>
                          Modifier
                        </Link>
                      </button>
                    </Typography>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          }
        </div>
      }
    </div>
  );

}