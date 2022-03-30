import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProchaineSeance from '../Calendrier/ProchaineSeance';
import VehiculeDispo from '../Vehicules/VehiculeDispo';
import Particles from 'react-particles-js';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  seance: {
    marginLeft: 450,
    marginTop: '-50%',
  },
  root: {
    backgroundColor: "#060b26"
  },
  title: {
    fontSize: 36,
    color: '#f2f2f2',
    marginLeft: '13%'
  },
}));

function Home() {

  const classes = useStyles();

  const [cardata, setcardata] = React.useState()

  React.useEffect(() => {
    axios.get('http://localhost:3001/api/admin/vehicule/vehicules', {
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    }).then((result) => { setcardata(result.data) })
      .catch((err) => console.log(err))
  }, [])

  return (

    <div className={classes.root}>

      <Particles />

      <div className={classes.seance}>

        <div>
          <ProchaineSeance className={classes.card} />
        </div>
        <Typography className={classes.title} gutterBottom>
          Véhicules disponibles:
        </Typography>

        {cardata && cardata.map(car => <div ><VehiculeDispo car={car} className={classes.card} /></div>)}
        <br /> <br /> <br /> <br /> <br /> <br />

      </div>
    </div>
  );
}


export default Home;