import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useHistory } from 'react-router';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../CSS/Calendrier.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '75ch',
        },
        marginTop: '4vw',
        textAlign: 'center',
        marginBottom: '19vh'
    },
}));

const EditSession = () => {
    const { ref } = useParams()
    const history = useHistory();
    const classes = useStyles();

    //Fetching the Data
    const [session, setsession] = React.useState()
    const [sessions, setsessions] = React.useState([{}])
    const [vehicules, setvehicules] = React.useState()
    const [clients, setclients] = React.useState()
    const [employees, setemployees] = React.useState()

    React.useEffect(() => {
        axios.get(`http://localhost:3001/api/admin/session/sessions`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            setsessions(result.data);
            const sess = result.data.find(s => s.ref === ref)
            setsession(result.data.find(s => s.ref === ref))

        })
            .catch((err) => console.log(err))
        axios.get('http://localhost:3001/api/admin/clients', {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => { setclients(result.data) })
            .catch((err) => console.log(err))
        axios.get('http://localhost:3001/api/admin/employee/employees', {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => { setemployees(result.data) })
            .catch((err) => console.log(err))
        axios.get('http://localhost:3001/api/admin/vehicule/vehicules', {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => { setvehicules(result.data) })
            .catch((err) => console.log(err))
    }, [])

    const [type, settype] = React.useState();
    const handleTypeChange = (event) => {
        settype(event.target.value);
    };

    const [selectedDate, setSelectedDate] = React.useState();
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const [client, setclient] = React.useState()
    const handleClientChange = (event) => {
        setclient(event.target.value)
    }

    const [emp, setemp] = React.useState()
    const handleEmpChange = (event) => {
        setemp(event.target.value)
    }

    const [veh, setveh] = React.useState()
    const handleVehChange = (event) => {
        setveh(event.target.value)
    }

    const [exam, setexam] = React.useState(false)
    const handleExamChange = (event) => { setexam(event.target.value) }

    //using the useEffect again to update the late chanes due to the time the back takes
    React.useEffect(() => {
        if (session) {
            setSelectedDate(session.date)
            if (session.ref[0] == "e") {
                settype('p')
                setexam(true)
            }
            else if (session.ref[0] == 'f') {
                settype('c')
                setexam(true)
            }
            else {
                settype(session.ref[0])
            }
        }
        if (session) {
            if (clients) setclient(clients[session.clientId - 1].id)
            if (employees) {
                if ((type === 'c' && exam === true)) {
                    if (session.ref[0] === 'f') setemp(1)
                }
                else {
                    setemp(employees[session.employeeId - 1].id)
                }
            }
        }
        if (type === 'p' || type === 'e') {
            setveh(session.vehiculeId)
        }

    }, [session, clients, employees])


    const handleDelete = () => {
        axios.delete(`http://localhost:3001/api/admin/session/${ref}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            console.log(result)
            history.push('/Sessions')
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!client) {
            alert('ATTENTION! Veuillez vérifier les champs')
            return
        }
        const sess = {
            clientId: client,
            date: selectedDate,
            employeeId: emp,
        }
        if (type === 'p') {
            sess.vehiculeId = veh
            sess.ref = 'p' + session.ref.substring(1, session.ref.length)
        }
        if (type === 'c') {
            sess.ref = 'c' + session.ref.substring(1, session.ref.length)
        }
        if (type === 'c' && exam) {
            sess.ref = 'f' + session.ref.substring(1, session.ref.length)
            if (session.ref[0] !== 'f')
                delete sess.employeeId
        }
        if (type === 'p' && exam) {
            sess.vehiculeId = veh
            sess.ref = 'e' + session.ref.substring(1, session.ref.length)
        }
        axios.put(`http://localhost:3001/api/admin/session/${ref}`, sess, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then(() => {
            history.push('/Sessions')
        })

    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <h1 style={{ color: '#3A506B' }}>Modification d'une séance:</h1>
                {client && <FormControl className={classes.formControl}>
                    <InputLabel id="Client" label="Client" onChange={handleClientChange}>Client</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="papier"
                        value={client}
                        onChange={handleClientChange}
                    >
                        {clients.map(c =>
                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>}
                <br />
                {client && !(type === 'c' && exam) && emp && <FormControl className={classes.formControl}>
                    <InputLabel id="Employé" label="Employé" onChange={handleEmpChange}>Employé</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="papier"
                        value={emp}
                        onChange={handleEmpChange}
                    >
                        {employees.map(c =>
                            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>}
                <br />
                {((type === 'p') && vehicules) ? <>   <FormControl className={classes.formControl}>
                    <InputLabel id="veh" label="Vehicule" onChange={handleVehChange}>Vehicule</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="papier"
                        value={veh}
                        onChange={handleVehChange}
                    >
                        {vehicules.filter(v => v.service === true).map(vehicule =>
                            <MenuItem key={vehicule.id} value={vehicule.id}>{vehicule.marque} {vehicule.modele}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                    <br />
                </> : ''}
                <FormControl className={classes.formControl} >
                    <InputLabel >Nature de séance:</InputLabel>
                    <Select
                        value={exam}
                        labelId="demo-simple-select-label"
                        id='e'
                        onChange={handleExamChange}
                    >
                        <MenuItem value={false}>Séance Normale</MenuItem>
                        <MenuItem value={true}>Examen</MenuItem>
                    </Select>
                </FormControl>
                <br />
                {selectedDate && <TextField
                    id="datetime-local"
                    label="Date De la séance"
                    type="datetime-local"
                    defaultValue={selectedDate ? selectedDate.substring(0, 16) : ''}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleDateChange}
                />}
                <br />
                {type && <FormControl component="fieldset">
                    <FormLabel style={{ marginLeft: "-33vh" }} component="legend" >Type de séance:</FormLabel>
                    <RadioGroup aria-label="gender" id='type' name="gender1" value={type} onChange={handleTypeChange}>
                        <FormControlLabel value="c" control={<Radio />} label="Code" />
                        <FormControlLabel value="p" control={<Radio />} label="Conduite" />
                    </RadioGroup>
                </FormControl>}
                <br />
                <div style={{ display: "flex", direction: "column", marginLeft: "65vh" }}>
                    <button className="button" style={{ width: '18vw', marginLeft: '20vw', fontFamily: 'Avanta Garde' }} onSubmit={handleSubmit} >Enregistrer</button>
                    <button className="button" style={{ marginLeft: '1%', width: '15vw' }}><div style={{ marginRight: '15%' }} onClick={handleDelete}>Supprimer</div></button>
                </div>
            </form>

        </div>
    )
}
//e
export default EditSession
