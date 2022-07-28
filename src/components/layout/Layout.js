import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import { MainNavigation } from './MainNavigation'
import classes from './Layout.module.css'

export const Layout = (props) => {
  return (
    <Fragment>
        <MainNavigation />
        <main className={classes.main}> {props.children} </main>
    </Fragment>
)
}
