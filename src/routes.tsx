import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from './pages/Home/Home'
import { TodoPage } from './pages/Todo/Todo'
import { PageNotFound } from './pages/PageNotFound/404'

export const routes = (
    <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Route path="/todo/:id">
            <TodoPage />
        </Route>
        <Route path="*">
            <PageNotFound />
        </Route>
    </Switch>
)
