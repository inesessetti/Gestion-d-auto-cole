import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import image1 from './images/questionnaire.jpg';
import imageConduite from './images/conduite.jpg';
import codeimage from './images/code.png';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    background: 'rgba(0,0,0,0.5)',
    margin: '20px',
  },
  media: {
    height: 350,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#3a506b',
textAlign:"center"  },
  desc: {
    fontFamily: 'Nunito',
    fontSize: '1.1rem',
    color: '#060b26',
  },
  cards: {
    display: "flex",
    flexDirection: "row"
  }
});

export default function ImageCard({ checked }) {
  const classes = useStyles();
  const passerletest = () => {
  window.location.push("/user/Tests")  
  return('')
  }

  return (
    <div className={classes.cards}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={codeimage}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >
              Code
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              "Résevez une séance de code. Une heure de code est de 5DT. Pour plus d'offres, veuillez consulter nos offres!",
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={imageConduite}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >
              Conduite
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              "Résevez une séance de code. Une heure de code est de 20DT. Pour plus d'offres, veuillez consulter nos offres!",
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={image1}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              className={classes.title}
            >
              questionnaire en ligne
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              "Passez un test gratuit de 30 questions avec un minuteur pour d'entraîner!",
            </Typography>
          </CardContent>
        </Card>

    </div>
  );
}