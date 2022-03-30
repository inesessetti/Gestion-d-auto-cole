import React, {useState} from "react";
import Card from "./TestCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";




const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    marginTop:35,
    marginBottom:'30px'
 },
});

export default function Test() {
    
  const classes = useStyles();
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
  
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Card/>
      </Grid>   
    </Grid> 
    </div>
  );
}