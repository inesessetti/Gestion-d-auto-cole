import React, { useState } from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import '../CSS/Vehicules.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '75ch',
            
        },
        marginTop: '6vw',
        textAlign: 'center',
     
    },
    entretien: {
        marginLeft: 240,
        marginTop: 30
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 210,
        left: 264
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    date: {
        left: 265
    },
    page: {
        marginBottom: 50
    }
}));


const Formulaire = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const [errMarque, seterrMarque] = React.useState(false)
    const [errModele, seterrModele] = React.useState(false)
    const [errPPE, seterrPPE] = React.useState(false)
    const [errJPE, seterrJPE] = React.useState(false)
    const [errPGE, seterrPGE] = React.useState(false)
    const [errJGE, seterrJGE] = React.useState(false)
    const [ErrMessageDate, setErrMessageDate] = React.useState(false)
    const [errDate, seterrDate] = React.useState(false)
    const [disp, setdisp] = useState()
    const [car, setcar] = useState({})
    const [modele, setmodele] = useState()
    const [marque, setmarque] = useState();
    const [value, setValue] = React.useState();
    const [selectedDate, setselectedDate] = React.useState()
    React.useEffect(() => {
        axios.get(`http://localhost:3001/api/admin/vehicule/${id}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            setlanding(true)
            setdisp(result.data.disponibilite)
            setepp(result.data.entretienP.periode)
            setepj(result.data.entretienP.jour)
            setegp(result.data.entretienG.periode)
            setegj(result.data.entretienG.jour)
            setass(result.data.papiers.assurances)
            setvig(result.data.papiers.vignettes)
            setcar(result.data)
            setmodele(result.data.modele)
            setmarque(result.data.marque)
            setValue(result.data.etat)
            setselectedDate(result.data.visiteTech.substring(0, 16))
        })
            .catch((err) => console.log(err))
    }, [])

    const handleClicked = (event) => {
        setdisp(event.target.value === 'true')
    };
    const handleMarqueChange = (event) => {
        setmarque(event.target.value);
        seterrMarque(false)
    };
    const handleModeleChange = (event) => {
        setmodele(event.target.value)
        seterrModele(false)
    }
    const handleDateChange = (event) => {
        setselectedDate(event.target.value)
        seterrDate(false)
    }
    const [epp, setepp] = React.useState('');
    const handleEpPChange = (event) => {
        setepp(event.target.value);
        seterrPPE(false)
    };
    const [epj, setepj] = React.useState('');
    const handleEpJChange = (event) => {
        setepj(event.target.value);
        seterrJPE(false)
    };
    const [egp, setegp] = React.useState('');
    const handleEgPChange = (event) => {
        setegp(event.target.value);
        seterrPGE(false)
    };
    const [egj, setegj] = React.useState('');
    const handleEgJChange = (event) => {
        setegj(event.target.value);
        seterrJGE(false)
    };
    const [vig, setvig] = React.useState('')
    const handleVigChange = (event) => {
        setvig(event.target.value)
    };
    const [landing,setlanding]=React.useState()
    const [ass, setass] = React.useState('')
    const handleAssChange = (event) => {
        setass(event.target.value === 'true')
    };
    React.useEffect(() => {
        var marqueinput = document.querySelector('#marque')
        var modeleinput = document.querySelector('#modele')
        console.log('is it changing')
        marqueinput.value = marque
        modeleinput.value = modele
    }, [landing])

    const handleSubmit = (event) => {
        event.preventDefault()
        var today = new Date();
        const date = selectedDate.toString()
        const year = parseInt(date.substring(0, 4), 10)
        const month = parseInt(date.substring(6, 8))
        const day = parseInt(date.substring(8, 11))
        const monthToday = today.getUTCMonth() + 1
        const compareY = today.getUTCFullYear() > year;
        console.log(compareY);
        const compareD = (today.getUTCDate() > day && (monthToday == month) && (today.getUTCFullYear() == year))
        console.log(compareD);
        const compareM = (monthToday > month && today.getUTCFullYear() == year);
        console.log(compareM);
        if (compareY) {
            seterrDate(true)
            setErrMessageDate("L'année choisie est dépassée")
        }

        if (compareM) {
            seterrDate(true)
            setErrMessageDate("Le mois choisi est dépassé")
        }

        if (compareD) {
            setErrMessageDate("Le jour choisi est dépassé")
            seterrDate(true)

        }

        if (!marque || !modele || !epp || !egp || !epj || !egj) {
            alert('ATTENTION! Veuillez vérifier les champs')
            if (modele == '') {
                seterrModele(true)
            }
            if (!marque) {
                seterrMarque(true)
            }
            if (!epp) {
                seterrPPE(true)
            }
            if (!egp) {
                seterrPGE(true)
            }
            if (!epj) {
                seterrJPE(true)
            }
            if (!egj) {
                seterrJGE(true)
            }
            return
        }

        const data = {
            marque: marque,
            modele: modele,
            etat: value,
            visiteTech: selectedDate,
            disponibilite: disp,
            vignettes: vig,
            assurances: ass,
            periodeP: parseInt(epp),
            periodeG: parseInt(egp),
            jourP: parseInt(epj),
            jourG: parseInt(egj),
        }
        axios.put(`http://localhost:3001/api/admin/vehicule/${id}`, data, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            console.log(result)
            history.push('/vehicules');
        })
            .catch((err) => console.log(err))
    }
    const handleDelete = () => {
        axios.delete(`http://localhost:3001/api/admin/vehicule/${id}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            console.log(result)
            history.push('/vehicules');
        })
            .catch((err) => console.log(err))
    }
    return (
        <div className={classes.page}>
            {console.log(epj)}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <h1 style={{ color: '#3A506B', marginLeft: 150 }}>Modifier les données de {marque} {modele} :</h1>
                <br /><br /><br />
                {errMarque ?
                    <TextField error helperText="La marque du véhicule est obligatoire" id="marque" label="Marque du véhicule" onChange={handleMarqueChange} />
                    :
                    <TextField id="marque" label="Marque du véhicule" onChange={handleMarqueChange} value={marque}/>}
                <br />
                {errModele ?
                    <TextField error helperText="Le modèle du véhicule est obligatoire" id="marque" label="Marque du véhicule" onChange={handleMarqueChange} />
                    :
                    <TextField id="modele" label="Modèle du véhicule" onChange={handleModeleChange} value={modele} />
                }
                <br />
                {errPPE ?
                    <TextField error helperText="La période de petit entretien est obligatoire" id="E1" label="periode de petit entretien" onChange={handleEpPChange} />
                    :
                    <TextField id="E1" label="periode de petit entretien" onChange={handleEpPChange} value={epp} />}
                <br />
                {errJPE ?
                    <TextField error helperText="Le jour du mois du petit entretien est obligatoire" id="E10" label="Jour du mois du petit entretien" onChange={handleEpJChange} />
                    :
                    <TextField id="E10" label="Jour du mois du petit entretien" onChange={handleEpJChange} value={epj} />}
                <br />
                {errPGE ?
                    <TextField error helperText="La période du grand entretien est obligatoire" id="E2" label="periode du grand entretien" onChange={handleEgPChange} />
                    :
                    <TextField id="E2" label="periode du grand entretien" onChange={handleEgPChange} value={egp} />}
                <br />
                {errJGE ?
                <TextField error helperText="Le jour du mois du grand entretien est obligatoire" id="E20" label="Jour du mois du grand entretien" onChange={handleEgJChange} />:
                <TextField id="E20" label="Jour du mois du grand entretien" onChange={handleEgJChange} value={egj}/>}
                <br />
                {value ? <div>
                    <FormControl className={classes.formControl} >
                        <InputLabel >Disponibilité</InputLabel>
                        <Select
                            value={disp}
                            native
                            id='Disp'
                            onChange={handleClicked}
                        >
                            <option value={true}>Disponible</option>
                            <option value={false}>Non Disponible</option>
                        </Select>
                    </FormControl>

                </div> : ''}
                {value ? <div>
                    <FormControl className={classes.formControl} >
                        <InputLabel >Vignettes</InputLabel>
                        <Select
                            value={vig}
                            native
                            id='Disp'
                            onChange={handleVigChange}
                        >
                            <option value={true}>Vérifiées</option>
                            <option value={false}>Non Vérifiées</option>
                        </Select>
                    </FormControl>

                </div> : ''}
                {value ? <div>
                    <FormControl className={classes.formControl} >
                        <InputLabel >Assurances</InputLabel>
                        <Select
                            value={ass}
                            native
                            id='Disp'
                            onChange={handleAssChange}
                        >
                            <option value={true}>Vérifiées</option>
                            <option value={false}>Non Vérifiées</option>
                        </Select>
                    </FormControl>

                </div> : ''}
                {value ? <div className={classes.entretien}>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Etat du véhicule</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>
                </div>
                : ''}
                {selectedDate ? 
                <>
                {errDate ?
                <form className={classes.container} noValidate>
                    <TextField
                    error
                    helperText={ErrMessageDate}
                        id="datetime-local"
                        label="Date de visite technique"
                        type="datetime-local"
                        defaultValue={selectedDate}
                        className={classes.date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />

                </form>:
                <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label="Date de visite technique"
                    type="datetime-local"
                    defaultValue={selectedDate}
                    className={classes.date}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />

            </form>}
                </>
                    : ''}
                <button variant="contained" className="button" style={{ marginTop: '4%', width: '20%', marginLeft: '30%' }}>
                    <center style={{ marginRight: '10%' }} >Enregistrer</center>
                </button>
            </form>
            <center><button variant="contained" className="button" style={{ marginTop: '1%', width: '20%', marginLeft: '29.5%' }} onClick={handleDelete}>
                <center style={{ marginRight: '10%' }} >Supprimer</center>
            </button></center>
        </div>
    )
}
export default Formulaire