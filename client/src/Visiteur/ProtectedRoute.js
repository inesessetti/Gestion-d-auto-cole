import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios';
const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    
    const [role, setrole] = React.useState("")
    const [isAuth, setisAuth] = React.useState(localStorage.getItem('isAuth'))
    const [user, setuser] = React.useState({})

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/auth', {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((result) => {
            setuser(result.data.userData)
            setrole(result.data.userData.role)
            console.log(result.data.userData.role)
        })
            .catch((err) => console.log(err))
    }, [])

    React.useEffect(() =>
        setisAuth(localStorage.getItem("isAuth"))
        , [isAuth])

    return (
        <Route {...rest}
            render={(props) => {
                if (isAuth === 'true') {
                    if (role === "Admin") { return <Component /> }
                    if (role === "User") {
                        return <h1>You have no permission dear User</h1>
                    }
                    else {
                        return <div>
                        </div>
                    }
                }
                else {
                    return <Redirect from="/protected" to="/login" />
                }
            }

            }
        />

    )
}

export default ProtectedAdminRoute
