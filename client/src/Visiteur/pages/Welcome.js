import React, { useEffect } from "react";
import '../CSS/Welcome.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import service1 from '../images/Conduite.jpg'
import service2 from '../images/Code.jpg'
import service3 from '../images/Test.jpg'
import Aos from "aos";
import "aos/dist/aos.css"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import {FaDesktop, FaMoneyCheckAlt} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import bg from '../images/bg.jpg'
import { Button } from "@material-ui/core";
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    Grid: {
        flexGrow: 1,
        marginBottom: 6,
    },
    paper: {
        height: 200,
        width: 800,
        marginLeft: 350,
        marginTop: 1,
        marginBottom: 10,
        backgroundColor: "#3a506b",
        display: "flex",
        flexDirection: 'row'
    },
    paperAU1: {
        height: 300,
        width: 500,
        marginTop: 150,
        marginBottom: 10,
        backgroundColor: "#3a506b",
        display: "flex",
        flexDirection: 'row'
    },
    paperAU2: {
        height: 300,
        width: 500,
        marginTop: 150,
        marginBottom: 10,
        backgroundColor: "#3a506b",
        display: "flex",
        flexDirection: 'row'
    },
    paperTimeLine: {
        padding: '30px 16px',
        width:"40vw",
        marginTop:20
      },
      secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
      },
      title: {
        color: '#f2f2f2',
        fontSize: '4.5rem',
        marginTop: -530,
        marginBottom: 100,
        opacity: 0.7,
        cursor:"pointer"
      },
      colorText: {
        color: '#52ab98',
      },
      soustitle:{
        color:"#0b132b",
        opacity:0.9,
        marginLeft:600
      }
}));

export default function Welcome() {
    const classes = useStyles();
    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);
    return (
        <div className="welcomePage">
            <div className="page1">
              <img src={bg} className="image"/>
            <h1 className={classes.title}>
            Bienvenu à <br />
            l'auto école<span className={classes.colorText}>SITI</span>
          </h1>
          <h2 className={classes.soustitle}>
            Rejoignez-nous dès<span className={classes.colorText}>maintenant!</span>
          </h2>
          <div style={{display:"flex", flexDirection:"row"}}>
          <div className="buttonInscription">
          <Button variant="outlined" style={{color:"#52ab98", backgroundColor:"#52ab98", opacity:0.5}}>
            <Link to="/signup" style={{textDecoration:"none", color:"#ffffff"}}>
            Inscription </Link></Button>
          </div>
          <div className="buttonConnection">
          <Button variant="outlined" style={{color:"#52ab98", backgroundColor:"#52ab98", opacity:0.5}}>
          <Link to="/login" style={{textDecoration:"none", color:"#ffffff", marginRight: 15}}>
            Connection
            </Link>
            </Button>
          </div>
          </div>
       </div>
      <div className="firstPage">
          <h1 className="TitleFP">Une formation complète et sur mesure</h1>
      <Timeline align="alternate">
      <TimelineItem data-aos="fade-right">
        <TimelineOppositeContent>
          <Typography variant="body2" color="Secondary">
            Digitalisation
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary">
              <FaDesktop/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paperTimeLine}>
            <Typography variant="h6" component="h1">
              Révisez le code de la route quand et où vous voulez
            </Typography>
            <Typography>Un test de 30 questions totalement gratuit pour vous entraîner en ligne. Relevez le défi: Obtenez un score de 30/30 ! Avec nous, c'est possible..</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem data-aos="fade-left">
        <TimelineOppositeContent>
          <Typography variant="body2" color="Secondary">
            Entraînement sur place
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary">
              <ImLocation/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paperTimeLine}>
            <Typography variant="h6" component="h1">
                Conduire comme un pro
            </Typography>
            <Typography> Conduire des voitures de hautes qualité avec plusieurs experts compétents, car votre comfort et la qualité sont notre priorité.
</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem data-aos="fade-right">
      <TimelineOppositeContent>
          <Typography variant="body2" color="Secondary">
            Facilité et sécurité
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary">
              <FaMoneyCheckAlt/>
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paperTimeLine}>
            <Typography variant="h6" component="h1">
              Paiement
            </Typography>
            <Typography>Un paiement sécurisé et en plusieurs fois. Facilité de paiement: par chèque, par carte bancaire ou par cash !</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
            </div>
            <div data-aos="fade-up"
                data-aos-duration="3000" style={{display:"flex", flexDirection:"row"}}>
                <h1 className="welcomeTitle">Nos services</h1>
                <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#f2f2f2", marginTop:50 }}>
                    <div>
                        <Grid container className={classes.Grid}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <img src={service1} className="imgServiceD" />
                                    <div>
                                        <h2 className="ServiceTitle">Des séances de conduite</h2>
                                        <p className="ServicesousTitle">Vous pouvez réservez et passez des heures de conduite avec nos experts de la route. </p>
                                        <p className="ServicesousTitle">Toute les séances réalisés seront enregistrées sur votre profile.</p>
                                        <h4 className="Tarif">Tarif: 20dt/h</h4>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container className={classes.Grid}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <div>
                                        <h2 className="ServiceTitle">Des séances de code</h2>
                                        <p className="ServicesousTitle">Vous pouvez réservez des heures de code pour apprendre le code de la route parfaitement avec notre aide.</p>
                                        <p className="ServicesousTitle">Toute les séances réalisés seront enregistrées sur votre profile.</p>
                                        <h4 className="Tarif">Tarif: 10dt/h</h4>
                                    </div>
                                    <img src={service2} className="imgServiceG" />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container className={classes.Grid}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <img src={service3} className="imgServiceD" />
                                    <div>
                                        <h2 className="ServiceTitle">Un test gratuit pour s'entraîner</h2>
                                        <p className="ServicesousTitle">Passez un test en ligne de 30 questions accompagné d'un minuteur.</p>
                                        <p className="ServicesousTitle">A la fin du questionnaire, vous aurez votre score.</p>
                                        <h4 className="Tarif">Tarif: gratuit</h4>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}
