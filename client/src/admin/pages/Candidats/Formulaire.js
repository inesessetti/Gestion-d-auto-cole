import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

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
const Formulaire = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams()
    const [candidat, setcandidat] = useState()
    const [ErrName, setErrName] = useState(false)
    const [code, setcode] = useState()
    const [conduite, setconduite] = useState()
    const [name, setname] = useState('');
    const [payement, setpayement] = useState('')

    React.useEffect(() => {
        axios.get(`http://localhost:3001/api/admin/client/${id}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            setcandidat(result.data)
            setname(result.data.name)
            setpayement(result.data.payment)
            setcode(result.data.code_exam)
            setconduite(result.data.conduite_exam)
        }
        )
            .catch((err) => console.log(err))
    }, [])
    const handleNameChange = (event) => {
        setname(event.target.value);
        setErrName(false)
    };
    const handleSwitchChange = (event) => {
        setpayement((event.target.value === 'true'))
    }
    const handleCodeChange = (event) => {
        setcode(event.target.value)
    }
    const handleConduiteChange = (event) => {
        setconduite(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name) {
            alert('Attention! Verifez le nom.')
            setErrName(true)
            return
        }
        const info = {
            name: name,
            payment: payement,
            code_exam: code,
            conduite_exam: conduite,
            finished: (code && conduite)
        }
        axios.put(`http://localhost:3001/api/admin/client/${id}`, info, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
            .then(() => {
                console.log(info)
                history.push('/candidats')
            }
            ).catch(err => console.log(err))
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <h1 style={{ color: '#3A506B' }}>Modifier les données  :</h1>
                <br /><br /><br />
                {ErrName ?
                    <TextField error id="name" label="Nom du candidat" helperText="Le nom du candidat est obligatoire" onChange={handleNameChange} value={name} /> :
                    <TextField id="name" label="Nom du candidat" onChange={handleNameChange} value={name} />
                }
                <br />
                {candidat && typeof (code) === typeof (true) && typeof (conduite) === typeof (true) && <>
                    <FormControl className={classes.formControl} >
                        <InputLabel >A passé l'examen de code</InputLabel>
                        <Select
                            value={code}
                            labelId="demo-simple-select-label"
                            id='Disp'
                            onChange={handleCodeChange}
                        >
                            <MenuItem value={true}>Oui</MenuItem>
                            <MenuItem value={false}>Non</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl className={classes.formControl} >
                        <InputLabel >A passé l'examen de conduite</InputLabel>
                        <Select
                            value={conduite}
                            labelId="demo-simple-select-label"
                            id='e'
                            onChange={handleConduiteChange}
                        >
                            <MenuItem value={true}>Oui</MenuItem>
                            <MenuItem value={false}>Non</MenuItem>
                        </Select>

                    </FormControl>
                    <br />
                </>}

                <FormControl component="fieldset">
                    <FormLabel component="legend" >Payement:</FormLabel>
                    <br />
                    <RadioGroup aria-label="gender" id='type' name="paiement" value={payement} onChange={handleSwitchChange}>
                        <FormControlLabel value={true} control={<Radio />} label="Oui" />
                        <FormControlLabel value={false} control={<Radio />} label="Non" />
                    </RadioGroup>
                </FormControl>
                <br />
                <br />
                <button className="button" onSubmit={handleSubmit} style={{ marginTop: '3%', width: '15%', marginLeft: '25vw' }}>
                    <center style={{ marginRight: '10%' }} >Enregistrer</center>
                </button>
            </form>
        </div>
    )
}
export default Formulaire