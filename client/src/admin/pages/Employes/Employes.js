import React from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';
import { Container, Button } from '@material-ui/core';

function Employes() {

  const [emps, setemps] = React.useState([])
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/admin/employee/employees', {
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    }).then((result) => { setemps(result.data) })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h1 className='title'>Employés</h1>
      <Container fixed >
        <div style={{ marginLeft: '16%', marginTop: '7vh' }}>
          {
            emps.map(e =>
              <EmployeeCard key={e.id} index={e.id} emp={e} />
            )
          }
        </div>
        <Button href='/Employes/Add' variant="contained" color="secondary" style={{ marginLeft: '45%', width: '10%', marginTop: '2%', marginBottom:50 }}>
          <center style={{ marginRight: '15%' }} >Ajouter</center>
        </Button>
      </Container>
    </div>
  );
}

export default Employes;
