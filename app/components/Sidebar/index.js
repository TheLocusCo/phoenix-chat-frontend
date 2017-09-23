import React from "react"
import styles from "./style.css"
import CSSModules from 'react-css-modules';

class Sidebar extends React.Component {
  render () {
    return <div className={styles.sidebar}>
      <h3>John Smith</h3>
      <p>Last active: {Math.floor((Math.random() * 10) + 1)} minutes ago.</p>
    </div>
  }
}

export default CSSModules(Sidebar, styles);
