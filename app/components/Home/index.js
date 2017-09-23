import React, { Component } from "react"
import { default as Sidebar } from "../Sidebar"
import styles from "./style.css"

export default class Home extends React.Component {
  render() {
    return <div>
      <Sidebar />
      <div className={styles.chatWrapper}>
        Home component
      </div>
    </div>
  }
}
