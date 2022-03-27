import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
    return isAuthenticated ? (
        <Switch>
            <Route exact path="/create">
                <CreatePage />
            </Route>
            <Route exact path="/links">
                <LinksPage />
            </Route>
            <Route path="/detail/:id">
                <DetailPage />
            </Route>
            <Redirect to='/create'/>
        </Switch>
    ) : (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}