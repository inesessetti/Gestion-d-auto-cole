import React from "react";
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router";
import Particles from "react-particles-js";

const Tests = () => {
const history = useHistory();
 const gototest = () => {
  history.push("/user/Test");

 }

  return (
    <div style={{marginTop:9.2}} >
      <Particles/>
    <div style={{width:"100%", backgroundColor:"#3a506b", height:700,marginTop:"-51%"}}>
     <br/><br/>
     
      <h1 style={{color: '#f2f2f2',marginTop: "20vh",
    fontSize: '3.5rem', fontFamily:"sans-serif", marginLeft:80}}>Tests de Code de la route : </h1>
     <br/> <h2 style={{color: '#f2f2f2',
    fontSize: '1.5rem', fontFamily:"Century Gothic", fontWeight:"normal", marginLeft:700}}>
        30 questions
        </h2>
        <br/>
      <h2 style={{color: '#f2f2f2',
    fontSize: '1.5rem', fontFamily:"Century Gothic", fontWeight:"normal", marginLeft:560}}>1 test gratuit de code pour s'entraîner</h2>
      <br/>
      <div style={{display:"flex", flexDirection:"row"}}>
      <h2 style={{color: '#f2f2f2',
    fontSize: '1.5rem', fontFamily:"Century Gothic", fontWeight:"normal", marginLeft:500, marginRight:20}}>Passez un test gratuitement dès maintement : </h2>
   <Button variant="contained" onClick={gototest}>
     <span style={{marginRight:35, fontSize:"1rem", fontWeight:"bold"}} >Test</span></Button>
   </div>
   </div>
    </div>
  );
};

export default Tests;
