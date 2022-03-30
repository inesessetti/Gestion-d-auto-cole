import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import '../CSS/Vehicules.css'
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '75ch',
        },
        marginTop: '4vw',
        marginBottom: '19.6vh',
        textAlign: 'center'
    },
}));

const EditEmployee = () => {
    const history = useHistory();
    const { id } = useParams()

    const classes = useStyles();
    const [emp, setemp] = React.useState({})
    const [paid, setpaid] = React.useState(false)
    const [name, setname] = React.useState('holder')
    const [salaire, setsalaire] = React.useState(200)

    //Fetching the Employee
    React.useEffect(() => {
        axios.get(`http://localhost:3001/api/admin/employee/${id}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            setemp(result.data)
            setname(result.data.name)
            setpaid(result.data.payment)
            setsalaire(result.data.salaire)
        })
            .catch((err) => console.log(err))
    }, [])

    const handleSwitchChange = (event) => {
        setpaid((event.target.value === 'true'))
    }

    const handleNameChange = (event) => {
        setname(event.target.value)
    }

    const handleSalaireChange = (event) => {
        setsalaire(event.target.value)
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/api/admin/employee/${id}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then(() => {
            alert('user deleted')
            history.push('/Employes')
        })

    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name || !salaire) {
            alert('ATTENTION! Veuillez vérifier les champs')
            if (!name) {
                setnameerr(true)
            }
            if (!salaire) {
                setsalaireerr(true)
            }
            return
        }
        const emplo = {
            name: name,
            salaire: salaire,
            payment: paid,
        }
        axios.put(`http://localhost:3001/api/admin/employee/${id}`, emplo, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then(() => { history.push('/employes'); })
            .catch((err) => console.log(err))

    }

    const [nameerr, setnameerr] = React.useState(false)
    const [salaireerr, setsalaireerr] = React.useState(false)

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <h1 style={{ color: '#3A506B' }}>Modification d'un Employé:</h1>
                {nameerr ?
                    <TextField error id="Nom" label="Nom" value={name}
                        helperText="Le nom de l'employé est obligatoire."
                        onChange={handleNameChange} /> :
                    <TextField id="Nom" label="Nom" value={name} onChange={handleNameChange} />}
                <br />
                {salaireerr ?
                    <TextField error type='number' id="Salaire" label="Salaire" value={salaire}
                        inputProps={{
                            min: 0,
                        }}
                        helperText="Le salaire est obligatoire."
                        onChange={handleSalaireChange} /> :
                    <TextField type='number' id="Salaire" label="Salaire" value={salaire}
                        inputProps={{
                            min: 0,
                        }}
                        onChange={handleSalaireChange} />}
                <br />
                <FormControl component="fieldset">
                    <FormLabel component="legend" >{`a reçu le paiement le ${emp.dayofpayment}/${new Date().getMonth() + 1}`}</FormLabel>
                    <RadioGroup aria-label="gender" id='type' name="paiement" value={paid} onChange={handleSwitchChange}>
                        <FormControlLabel value={true} control={<Radio />} label="Oui" />
                        <FormControlLabel value={false} control={<Radio />} label="Non" />
                    </RadioGroup>
                </FormControl>
                <br />
                <button className="button" style={{ marginLeft: '59.7vw', marginRight: '30%', width: '8vw' }}><div >Enregister </div></button>
                <button className="button" style={{ marginLeft: '30.7vw', width: '8vw' }}><div onClick={handleDelete}>Supprimer</div></button>

            </form>

        </div>
    )
}
export default EditEmployee
