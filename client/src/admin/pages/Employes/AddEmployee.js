import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { useHistory } from 'react-router';
import '../CSS/Vehicules.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '75ch',
        },
        marginTop: '4vw',
        textAlign: 'center',
        marginBottom: '36.2vh'
    },

}));

const AddEmployee = () => {

    const history = useHistory();
    const classes = useStyles();


    const [payday, setpayday] = React.useState(-1);
    const handlePayDayChange = (event) => {
        setpayday(event.target.value);
        setErrJP(false)
    };

    const [name, setname] = React.useState('')
    const handleNameChange = (event) => {
        setname(event.target.value)
        setErrName(false)
    }

    const [salaire, setsalaire] = React.useState(-200)
    const handleSalaireChange = (event) => {
        setsalaire(event.target.value)
        setErrSalaire(false)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name || !salaire || !payday) {
            alert('ATTENTION! Verifiez les champs..')
            if (!name) {
                setErrName(true)
            }
            if (salaire === -200) {
                setErrSalaire(true)
            }
            if (payday === -1) {
                setErrJP(true)
            }
            return
        }
        const emp = {
            name: name,
            salaire: salaire,
            dayofpayment: payday,

        }

        axios.post('http://localhost:3001/api/admin/employee/add', emp, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then(() => { history.push('/employes'); })
            .catch((err) => console.log(err))
        const nomel = document.querySelector('#Nom')
        const salaireel = document.querySelector('#Salaire')
        const payel = document.querySelector('#payday')
        nomel.value = ''
        salaireel.value = ''
        payel.value = ''
        setname('')
        setsalaire(200)
        setpayday(0)
    }

    //error handling
    const [ErrName, setErrName] = React.useState(false)
    const [ErrSalaire, setErrSalaire] = React.useState(false)
    const [ErrJP, setErrJP] = React.useState(false)

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <h1 style={{ color: '#3A506B' }}>Ajout d'un Employé:</h1>
                {ErrName ?
                    <TextField error id="Nom" label="Nom" helperText="Le nom de l'employé est obligatoire" onChange={handleNameChange} /> :
                    <TextField id="Nom" label="Nom" onChange={handleNameChange} />
                }
                <br />
                {ErrSalaire ?
                    <TextField error type='number' id="Salaire" label="Salaire" helperText="Le salaire est obligatoire"
                        inputProps={{
                            min: 0,
                        }}
                        onChange={handleSalaireChange} /> :

                    <TextField type='number' id="Salaire" label="Salaire"
                        inputProps={{
                            min: 0,
                        }}
                        onChange={handleSalaireChange} />
                }
                <br />
                {ErrJP ?
                    <TextField error type='number' id="payday" label="Jour de paiement" helperText="Le jour de payement est obligatoire"
                        inputProps={{
                            min: 1,
                            max: 31,
                        }}
                        onChange={handlePayDayChange} /> :
                    <TextField type='number' id="payday" label="Jour de paiement"
                        inputProps={{
                            min: 1,
                            max: 31,
                        }}
                        onChange={handlePayDayChange} />
                }
                <br />
                <button className="button" style={{ width: '9vw', marginLeft: '30vw', textAlign: 'center', fontFamily: "Avanta Garde", marginTop: '5vh' }}>Ajouter</button>
            </form>
        </div>
    )
}
export default AddEmployee
