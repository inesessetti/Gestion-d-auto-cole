import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    fontSize:'87px',

  },
  title: {
    fontSize:20,
    margin: theme.spacing(4, 0, 2),
  },
  heading: {
    fontSize:20,
    letterSpacing:1,
    textAlign:'center',

  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign:'center'
  },
}));
function sessionname (c) {
  if(c==='c') return 'Séance de code'
  if(c==='p') return 'Séance de conduite'
  if(c==='e') return 'Examen de conduite'
  if(c==='f') return 'Examen de code'
}
const SessionCard = ({sessions}) => {


  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  return (
    
    <div>
         <div className={classes.demo}>
            <List dense={false}>
              {sessions.map(s=>
                <ListItem key={s.ref}>
                  <ListItemText
                    primary={<Typography className={classes.heading}>{sessionname(s.ref[0])}</Typography>}
                    secondary={<Typography className={classes.secondaryHeading}>{s.date.substring(0,10)}</Typography>}
                    />
                </ListItem>
              )}
            </List>
          </div>
    </div>
  )
}

export default SessionCard
