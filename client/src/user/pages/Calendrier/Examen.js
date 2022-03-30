import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {GoVerified} from 'react-icons/go'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width:400,
    display:'inline-block',
    marginLeft:'2%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function verify_passed(user,type){
    if (type==='e'){
        return user.conduite_exam
    }
    else if (type==='f'){
        return user.code_exam
    }
}
function find_next_exam(type,sessions){
    const exams = sessions.filter(e=>e.ref[0]===type)
    const exam = exams.find(e=>new Date(e.date)>new Date())
    console.log(exam)
    if (exam ){
        let date = new Date(exam.date)
        date.setDate(date.getDate() - 30)
        if(date <= new Date()) return <span style={{color:'red',fontSize:'1.2rem'}}>{new Date(exam.date).toString().substring(0,21)}</span>
        return new Date(exam.date).toString().substring(0,21)
    }
    else return <span style={{color:'red'}}> Pas de date pour cet examen</span>

}

export default function Examen({user,sessions,type}) {
    console.log(user)
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        {console.log(find_next_exam(type,sessions))}
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="h5" component="h2">
          Examen de {type==='e'?'Conduite':'Code'}
        </Typography>
        <br/>
{       verify_passed(user,type)?<Typography variant="body2" component="p">
       <GoVerified style={{fill:'green'}}/> Vous avez passez l'examen
          <br />
        </Typography>:<Typography ariant="body2" component="p">{find_next_exam(type,sessions)}</Typography>}
      </CardContent>
      <CardActions>
        {type==='f'?<Link to='/user/tests' style={{marginLeft:'60%',textDecoration:'none'}}><Button  size="small">Prendre un Test</Button></Link>:
        <Link to='/' style={{marginLeft:'55%',textDecoration:'none'}}><Button  size="small">Reserver une date</Button></Link>}
      </CardActions>
    </Card>
  );
}
