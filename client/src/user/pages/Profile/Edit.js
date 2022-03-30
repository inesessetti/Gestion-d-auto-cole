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
import { Link } from 'react-router-dom';

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
const Edit = () => {
    const classes = useStyles();
    const history = useHistory();

    const [ErrName, setErrName] = useState(false)
    const [CIN, setCIN] = useState()
    const [tele, settele] = useState()
    const [name, setname] = useState();
    const [e_mail,sete_mail] = useState()
    const [pass,setpass]=useState()
    const [user,setuser]=useState()

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/auth', {
          headers: {
            "auth-token": localStorage.getItem('token')
          }
        }).then((result) => { setuser(result.data.userData) 
                            setname(result.data.userData.name)
                            setCIN(result.data.userData.CIN)
                            settele(result.data.userData.telephone)
                            sete_mail(result.data.userData.e_mail)
                                })
    
      }, [])

    const handleNameChange = (event) => {
        setname(event.target.value);
        setErrName(false)
    };
    const handleCINChange = (event) => {
        setCIN(event.target.value)
    }
    const handleTelChange = (event) => {
        settele(event.target.value)
    }
    const handleMailChange = (event) => {
        sete_mail(event.target.value)
    }
    const handlePassChange = (event)=>{
        setpass(event.target.value)
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
            CIN: CIN,
            telephone: tele,
            e_mail:e_mail
        }
        if(pass)info.password=pass
        axios.put(`http://localhost:3001/api/client/update/${user.id}`, info, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
            .then(() => {
                console.log(info)
                history.push('/user/profile')
            }
            ).catch(err => console.log(err))
    }

    return (
        <div>
{          user &&  <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <h1 style={{ color: '#3A506B' }}>Modifier les données  :</h1>
                <br /><br /><br />
                {ErrName ?
                    <TextField error id="name" label="Nom du candidat" helperText="Le nom du candidat est obligatoire" onChange={handleNameChange} value={name} /> :
                    <TextField id="name" label="Nom du candidat" onChange={handleNameChange} value={name} />
                }
                <br />
                <TextField id="CIN" label="Numero CIN" type='number' onChange={handleCINChange} value={CIN} />
                <br />
                <TextField id="Tel" label="Numero de Telephone" onChange={handleTelChange} value={tele} />
                <br />
                <TextField id="e_mail" type="e_mail" label="e_mail" onChange={handleMailChange} value={e_mail} />
                <br />
                <TextField id="mdp" type="password" label="Nouveau mot de passe (optionnel)" onChange={handlePassChange} value={pass} />
                <br/>
                <button variant="contained" className="button" style={{ marginTop: '4%', width: '10%', marginLeft: '30%' }}>
                    <center style={{ marginRight: '10%' }} >Enregistrer</center>
                </button>
            </form>}
        </div>
    )
}
export default  Edit