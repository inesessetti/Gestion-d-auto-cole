import React from "react";
import "../CSS/Vehicules.css";
import Card from "./CarCard.js";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop:35,
    marginBottom:'30px'
 },
});

export default function Vehicules() {
  const classes = useStyles();
  const [cardata, setcardata] = React.useState([{}])
 React.useEffect(() => {
    axios.get('http://localhost:3001/api/admin/vehicule/vehicules',{headers:{
        "auth-token":localStorage.getItem('token')
    }}).then((result)=>{ setcardata(result.data) })
    .catch((err)=>console.log(err))
}, [])

  return (
    <div>
         <h1 className="titl" >Véhicules</h1>
    
  
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
     
      {cardata.map(car =>
      <Grid item xs={12} sm={6} md={4}>
        <Card car={car}/>
      </Grid>
      )}
    </Grid>
    <Button href='/Vehicules/ajouter' variant="contained" color="secondary" style={{marginLeft:'45%',width:'10%', marginTop:'2%', marginBottom:50}}>
   <center style={{marginRight:'15%'}} >Ajouter</center>
  </Button>
    </div>
  );
}

