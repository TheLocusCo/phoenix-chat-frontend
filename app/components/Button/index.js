import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export const Button = props => {
  return (
    <button
      style={props.style}
      onClick={props.onClick}
      className={style[props.type]}>
      {props.children}
    </button>
  )
}

export default cssModules(Button, style)

Button.propTypes = {
  style: React.PropTypes.object,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
}
