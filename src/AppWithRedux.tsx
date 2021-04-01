import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {AppRootStateType} from "./state/store";
import {initializeAppTC, RequestStatusType} from "./state/app-reducer";
import {TodolistsList} from "./Todolist/TodolistsList";
import {Login} from "./login/Login";
import {logoutTC} from "./state/login-reducer";
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(initializeAppTC())
    }, [])

    const logOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if(!initialized) {
       return <div style={{position: 'fixed', top: '30%', width: '100%', textAlign: 'center'}}>
         <CircularProgress  />
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackBar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={()=><h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'} />
                </Switch>
            </Container>
        </div>
    )
}

export default App
