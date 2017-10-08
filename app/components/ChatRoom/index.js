import React from "react"
import cssModules from "react-css-modules"
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
    return (
      <div className={style.header}>
        Header (coming soon)
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
      <div className={style.container}>
        { this.renderHeader() }
        <div
          ref={ref => { this.chatContainer = ref }}
          className={style.chatWrapper}>
          { this.renderMessages(this.props) }
        </div>
        { this.renderInput(this.props) }
      </div>
    )
  }
}

export default cssModules(ChatRoom, style)
