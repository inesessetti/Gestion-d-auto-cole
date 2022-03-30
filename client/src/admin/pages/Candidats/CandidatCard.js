import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
 Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, useMediaQuery, Tooltip
} from '@material-ui/core';
import { MdExpandMore, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useHistory } from 'react-router';
import { GoAlert } from 'react-icons/go'
import '../CSS/Candidats.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    marginLeft: 400,
    marginBottom: 135
  },
  NameTitle: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  Name: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: 200,
  },
  date: {
    marginTop: 50,
  },
  pay: {
    marginTop: 50,
  },
  sessionsmap: {
    marginRight: 50,
    display: "flex"
  },
  detailsSR: {
    display: "flex",
    flexDirection: "column"
  }
}));



export default function CandidatCard({ candidats }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const ButtonDelete = ({ candidat }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleNo = () => {
      setOpen(false);
    };
    const handleYes = () => {
      axios.delete(`http://localhost:3001/api/admin/client/${candidat.id}`, {
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      }).then(() => {
        setOpen(false)
        history.go(0)
      }).catch(err => console.log(err))
    } /*Fonction qui traîte les deux cas présents en cas où l'utilisateur a cliqué sur le bouton supprimer */

    return (
      <div>
        <div onClick={handleClickOpen}>Supprimer</div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleNo}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Supprimer un candidat ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de supprimer {candidat.name} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleNo} color="primary">
              Non
            </Button>
            <Button onClick={handleYes} color="primary" autoFocus>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {candidats.map(candidat =>
        <Accordion expanded={expanded === candidat.id} onChange={handleChange(candidat.id)} key={candidat.id}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.NameTitle}>Nom du candidat : </Typography>
            <Typography className={classes.Name}>{!candidat.payment && <GoAlert style={{ marginLeft: '0', color: 'red' }} />} {candidat.name} </Typography>
          </AccordionSummary>
          <br />
          <br />
          <AccordionDetails className={classes.detailsSR}>
            <Typography>
              Les séances réalisées :{candidat.sessions.map(session => <Link className='session-ref' to={`/Sessions/edit/${session}`}>{session} |</Link>)}
            </Typography>

            <div className={classes.date}>
              <Typography>
                Date d'inscription : {candidat.createdAt.substring(0, 10)}
              </Typography>
            </div>
            <div className={classes.pay}>
              <Typography className={classes.heading}>
                {(candidat.payment) ? <span style={{ fontSize: '1.2rem', color: 'green' }}>Paiement verifié</span> : <span style={{ fontSize: '1.2rem', color: 'red' }}>Pas de paiement</span>}
              </Typography >
            </div>
          </AccordionDetails>
          <div style={{ display: "flex", flexDirection: "row", marginBottom: 50 }}>
            <Typography >
              <Link to={`/Candidats/Formulaire/${candidat.id}`} className="UpdateButton" style={{ fontFamily: "Avanta Garde", width: '8vw', marginLeft: 400, fontSize: '1.1rem', bottom: 0 }} >
                <div candidat={candidat} style={{ textDecoration: 'none' }}>
                  Modifier
                </div>
              </Link>
            </Typography>
            <Typography >
              <button className="DeleteButton" style={{ fontFamily: "Avanta Garde", width: '8vw', fontSize: '1.1rem', marginLeft: 50, marginBottom: 0 }} >
                <ButtonDelete candidat={candidat} style={{ textDecoration: 'none', color: "#f2f2f2", }}>
                  Supprimer
                </ButtonDelete>
              </button>
            </Typography>
          </div>
        </Accordion>
      )}
    </div>
  );
}