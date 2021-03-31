import React, {useEffect} from 'react'
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
import {TodolistsList} from "./Todolist/TodolistList";
import {Login} from "./login/Login";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()


    useEffect( () => {
        dispatch(initializeAppTC())
    }, [initialized])

    if(!initialized) {
       return <div style={{position: 'fixed', top: '30%',
                            width: '100%', textAlign: 'center'}}>
         <CircularProgress  />
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
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
