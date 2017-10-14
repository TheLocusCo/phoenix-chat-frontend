import React from "react"
import cssModules from "react-css-modules"
import { Link } from "react-router"
import style from "./style.css"

export class ChatRoom extends React.Component {
  componentDidUpdate() {
    if (this.props.messages.length > 0) {
      const lastMessage = this[`chatMessage:${this.props.messages.length - 1}`]
      this.chatContainer.scrollTop = lastMessage.offsetTop
    }
  }

  renderMessages() {
    console.log("Messages testing" +  this.props.messages)
    return this.props.messages.map(({
      body,
      id,
      user_id,
      anonymous_user_id
    }, i) => {
      console.log("Messages testing 2" + anonymous_user_id)
      const from = user_id ? 'Me' : anonymous_user_id.substring(0,10)
      const msg = `${from}: ${body}`
      return (
        <div
          ref={ref => { this[`chatMessage:${i}`] = ref }}
          key={id}>
          { msg }
        </div>
      )
    })
  }

  renderHeader() {
    console.log("IN HEADER RENDER" + JSON.stringify(this.props))
    if (!this.props.currentRoom) {
      return (
        <div className={style.header}>
          <div />
          <Link to="settings" className={style.settings}>
            <img
              alt="link to settings"
              className={style.cog}
              src="https://s3.amazonaws.com/learnphoenix-static-assets/icons/cog.png" />
          </Link>
        </div>
      )
    }

    const avatar = {
      height: "40px",
      width: "40px",
      background: "#ccc",
      border: "1px solid #888",
      borderRadius: "50%"
    }

    return (
      <div className={style.header}>
        <div className={style.identity}>
          <div style={avatar} />
          <div className={style.titleGroup}>
            <h3 className={style.title}>
              { this.props.currentRoom }
            </h3>
            <div className={style.lastActive}>
              Last active: __ minutes ago
            </div>
          </div>
        </div>
        <Link to="settings" className={style.settings}>
          <img
            alt="link to settings"
            className={style.cog}
            src="https://s3.amazonaws.com/learnphoenix-static-assets/icons/cog.png" />
        </Link>
      </div>
    )
  }

  renderEmpty() {
    if (this.props.currentRoom) return null
    return (
      <div className={style.empty}>
        No chat selected
      </div>
    )
  }

  renderInput() {
    if (!this.props.currentRoom) return null
    return (
      <div className={style.inputWrapper}>
        <input
          value={this.props.input}
          onKeyDown={this.props.handleMessageSubmit}
          onChange={this.props.handleChange}
          className={style.input} />
      </div>
    )
  }

  render() {
    return (
      <div className={style.chatWrapper}>
        { this.renderHeader(this.props) }
        <div
          ref={ref => { this.chatContainer = ref }}>
          { this.renderMessages(this.props) }
        </div>
        { this.renderInput(this.props) }
      </div>
    )
  }
}

export default cssModules(ChatRoom, style)
