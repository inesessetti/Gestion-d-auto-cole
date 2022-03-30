import React from 'react';
import MainRouter from './admin/MainRouter';
import MainRouterUser from './user/MainRouterUser';
import axios from 'axios'
import MainRouterVisiteur from './Visiteur/MainRouterVisiteur';
function App() {
  const [user, setuser] = React.useState({})
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/auth', {
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    }).then((result) => {
      setuser(result.data.userData)
    })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      {console.log(user.role)}
      {!(user.role) ? <MainRouterVisiteur/> :
      <>
      {(user.role==="Admin")?<MainRouter/>:<MainRouterUser/>}
      </>
  }

    </div>
  );
};
export default App;