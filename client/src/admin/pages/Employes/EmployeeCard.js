import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import axios from 'axios';


const useStyles = makeStyles({
    root: {
        marginLeft: '15px',
        minWidth: 400,
        minHeight: 400,
        display: 'inline-block',
        marginBottom: '30px'

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
});

const relativedate = new Date() // fonction pour retirer la prochaine date
function closestdate(arr, sessions) {
    if (!sessions) return 0
    let sessarr = arr.map(ref => sessions.find(s => s.ref === ref))
    let datesArr1 = sessarr.map(item => new Date(item.date).toString())
    const datesArr = sessarr.map(item => new Date(item.date))
    let dates = datesArr.sort(function (a, b) {
        var distancea = Math.abs(relativedate - a);
        var distanceb = Math.abs(relativedate - b);
        return distancea - distanceb;
    })
    dates = dates.filter(d => d > relativedate)
    const date = datesArr.find(d => d === dates[0])
    const index = datesArr1.indexOf(new Date(date).toString())
    return sessarr[index]
}

const EmployeeCard = ({ emp }) => {
    
    const classes = useStyles();
    //fetching the data
    const [sessions, setsessions] = React.useState()
    const [Nextsession, setNextsession] = React.useState()
    const [monthsess, setmonthsess] = React.useState()

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/admin/session/sessions', {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            setsessions(result.data)
            setNextsession(closestdate(emp.sessions, result.data))
            setmonthsess(Sessionsbymonth(emp.sessions, relativedate.getMonth(), result.data))
        })

    }, [])

    //Calculate the number of sessions given the month
    function Sessionsbymonth(arr, month, sessions) {
        let sessdata = arr.map(
            ref =>
                sessions.find(d => d.ref === ref)
        )
        const sessdata2 = sessdata.filter(d => d && new Date(d.date).getMonth() === month)
        return sessdata2.length
    }

    return (
        <Card className={classes.root} variant="outlined" key={emp.id}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    employee
                </Typography>
                <Typography variant="h5" component="h2">
                    {emp.name}
                </Typography>
                <br/>
                <Typography className={classes.pos} color="textSecondary">
                    prochaine séance : {(Nextsession) ? new Date(Nextsession.date).toString().substring(0, 21) : ''}
                </Typography>
                <br/>
                <Typography variant="body2" component="p">
                    Nombre de séance pour ce mois : {monthsess}
                    <br />
                    <br/>
                    Nombre de séances : {emp.sessions.length}
                    <br />
                    <br/>
                    code: {(sessions) ? (emp.sessions.filter(e => e[0] === 'c').length) : ''}    ;conduite: {(emp.sessions.length > 0) ? emp.sessions.filter(e => e[0] === 'p').length : ''}
                </Typography>
                <br/>
            </CardContent>
            <CardActions>
                <Link to={`/employes/edit/${emp.id}`} style={{ textDecoration: 'none' }}> <Button color="secondary" variant="contained" ><div style={{ marginRight: '15%' }}>Modifier</div></Button></Link>
            </CardActions>
        </Card>
    );
}


export default EmployeeCard
