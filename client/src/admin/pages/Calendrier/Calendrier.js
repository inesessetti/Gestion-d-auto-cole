import React from "react";
import ProchaineSeance from "./ProchaineSeance";
import '../CSS/Calendrier.css';
import SessionCard from "./SessionCard"
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import axios from "axios";


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

const relativedate = new Date() // fonction pour retirer la prochaine date
function closestdate(arr) {
  let dates = arr.map(item => item.date)
  dates.sort(function (a, b) {
    var distancea = Math.abs(relativedate - a);
    var distanceb = Math.abs(relativedate - b);
    return distancea - distanceb;
  })
  dates = dates.filter(d => d > relativedate)
  return arr.find(d => dates[0] === d.date)
}


const Calendrier = () => {
  const [sessions,setsessions]=React.useState([{}])
  const [clients,setclients]=React.useState([{}])
  const [employees,setemployees]=React.useState([{}])
  const [vehicules,setvehicules]=React.useState([{}])
  React.useEffect(() => {
      axios.get('http://localhost:3001/api/admin/session/sessions',{headers:{
          "auth-token":localStorage.getItem('token')
      }}).then((result)=>{ setsessions(result.data) }
                )
      .catch((err)=>console.log(err))
      axios.get('http://localhost:3001/api/admin/clients',{headers:{
          "auth-token":localStorage.getItem('token')
      }}).then((result)=>{ setclients(result.data) })
      .catch((err)=>console.log(err))

      axios.get('http://localhost:3001/api/admin/employee/employees',{headers:{
          "auth-token":localStorage.getItem('token')
      }}).then((result)=>{ setemployees(result.data) })
      .catch((err)=>console.log(err))

      axios.get('http://localhost:3001/api/admin/vehicule/vehicules',{headers:{
        "auth-token":localStorage.getItem('token')
    }}).then((result)=>{ setvehicules(result.data) })
    .catch((err)=>console.log(err))
  }, [])
  

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1 className='titl'>Séances</h1>
      <Container fixed>
        <center>
          <ProchaineSeance session={closestdate(sessions)} clients ={clients} employees={employees}/>
        </center>
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
            <SessionCard sessions={sessions} clients={clients} employees={employees} vehicules={vehicules}/>
          </TabPanel>
          <TabPanel value={value} index={1} >
            <SessionCard sessions={sessions.filter(s => new Date(s.date) > relativedate)} clients={clients} employees={employees} vehicules={vehicules}/>
          </TabPanel>
          <TabPanel value={value} index={2} >
            <SessionCard sessions={sessions.filter(s => new Date(s.date) < relativedate)} clients={clients} employees={employees} vehicules={vehicules}/>
          </TabPanel>
        </Paper>
        <div className="next-session">
        </div>
      </Container>
      
    </div>
  );
};

export default Calendrier;
