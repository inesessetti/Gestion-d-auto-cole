import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    table: {
        width: 1200,
        marginLeft: '10%'
    },
});

function createData(ref, date) {
    var price
    if (ref[0] === 'c') price = 10
    if (ref[0] === 'p') price = 20
    if (ref[0] === 'e') price = 100
    if (ref[0] === 'f') price = 30
    return { ref, date, price };
}
function cost(arr) {
    let somme = 0
    for (let i = 0; i < arr.length; i++) {
        var ref = arr[i].ref
        var price
        if (ref[0] === 'c') price = 10
        if (ref[0] === 'p') price = 20
        if (ref[0] === 'e') price = 100
        if (ref[0] === 'f') price = 30
        somme += price
    }
    return somme

}


export default function Payment() {
    const classes = useStyles();
    const history = useHistory();

    const [user, setuser] = React.useState()
    const [sessions, setsessions] = React.useState()
    const [rows, setrows] = React.useState()

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
        }).then((result) => {
            setsessions(result.data)
            setrows(result.data.map(d => createData(d.ref, d.date.substring(0, 10))))

        })

    }, [user])

    const handleSubmit = ()=>{
        axios.put(`http://localhost:3001/api/client/paiement/${user.id}`, {payment:true}, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
            .then(() => {
                history.push('/user/profile')
            }
            ).catch(err => console.log(err))
    }

    return (<>
        {user && <h1 className='Title'>Tarif de {user.name}</h1>}
        {rows && <Container maxWidth="800">
            {console.log(rows)}
            <TableContainer >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Réferance de la séance</TableCell>
                            <TableCell align="right">Date de la séance</TableCell>
                            <TableCell align="right">Prix</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.ref}>
                                <TableCell component="th" scope="row">
                                    {row.ref}
                                </TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                Total : {sessions.length}
                            </TableCell>
                            <TableCell>
                                prix Total : {cost(sessions)}
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>


        }
        {sessions && <>        <br />
            <br /> <button className="button" style={{ width: '10%', marginLeft: '70%', marginBottom: '5%' }} onClick={handleSubmit}>Paiement</button></>}
    </>
    );
}
