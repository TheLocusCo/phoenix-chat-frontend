import React from "react"
import ReactDOM from "react-dom"
import "./styles/reset.css"
import { HashRouter, Route, Link } from 'react-router-dom';

import { default as Home } from "./components/Home"
import { default as Settings } from "./components/Settings"

const App = props => (<div>{props.children}</div>)

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="settings" component={Settings} />
    </div>
  </HashRouter>,
  document.getElementById("root")
)
