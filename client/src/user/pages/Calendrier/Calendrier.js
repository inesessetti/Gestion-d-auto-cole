import React from "react";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import axios from "axios";
import ProchaineSession from "./ProchaineSession";
import SessionCard from "./SessionCard";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from "@material-ui/core";
import Examen from "./Examen";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '80%',
    marginLeft: '10%',
  },
});

const relativedate = new Date()

const Calendrier = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [user, setuser] = React.useState()
  const [sessions, setsessions] = React.useState()

  React.useEffect(() => {
    axios.get('http://localhost:3001/api/auth', {
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    }).then((result) => { setuser(result.data.userData) })

  }, [])

  React.useEffect(() => {
    if (user) axios.get(`http://localhost:3001/api/client/sessions/${user.id}`, {
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    }).then((result) => { setsessions(result.data) })

  }, [user])

  return (
    <div>
      <h1 className="title">Séances</h1>
      <div style={{textAlign:'center'}}>
      {sessions && user && <Examen user={user} sessions={sessions} type='f'/>}
      {sessions && user && <Examen user={user} sessions={sessions} type='e'/>}
      </div>
      {sessions && <center><ProchaineSession sessions={sessions} /></center>}

      {sessions && <Container fixed>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Toutes les séances" />
            <Tab label="Séances prochaines" />
            <Tab label="Séances précédentes" />
          </Tabs>
          <TabPanel value={value} index={0} >
            <SessionCard sessions={sessions} />
          </TabPanel>
          <TabPanel value={value} index={1} >
            <SessionCard sessions={sessions.filter(s => new Date(s.date) > relativedate)} />
          </TabPanel>
          <TabPanel value={value} index={2} >
            <SessionCard sessions={sessions.filter(s => new Date(s.date) < relativedate)} />
          </TabPanel>
        </Paper>
        <div className="next-session">
        </div>
      </Container>}
    </div>
  );
};

export default Calendrier;
