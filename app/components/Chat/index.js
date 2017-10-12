import React from "react"
import cssModules from "react-css-modules"
import { Socket, Presence } from "phoenix"
import { connect } from "react-redux"
import { Link } from "react-router"
import style from "./style.css"

import { default as ChatRoom } from "../ChatRoom"
import { default as Sidebar } from "../Sidebar"

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presences: {},
      messages: [],
      input: "",
      currentRoom: "",
      lobbyList: []
    }
    this.changeChatroom = this.changeChatroom.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const params = this.props.user
    this.socket = new Socket("ws://192.168.195.149:4000/socket", { params })
    this.socket.connect()
    this.configureAdminChannel()
  }

  componentWillUnmount() {
      if (this.channel) this.channel.leave()
      if (this.adminChannel) this.adminChannel.leave()
    }

  configureAdminChannel() {
    this.adminChannel = this.socket.channel("admin:active_users")
    this.adminChannel.on("presence_state", state => {
      const presences = Presence.syncState(this.state.presences, state)
      console.log('Presences after sync: ', presences)
      this.setState({ presences })
    })
    this.adminChannel.on("presence_diff", state => {
      const presences = Presence.syncDiff(this.state.presences, state)
      console.log('Presences after diff: ', presences)
      this.setState({ presences })
    })
    this.adminChannel.on("lobby_list", (user) => {
      if (!this.state.lobbyList.includes(user)) {
        this.setState({ lobbyList: this.state.lobbyList.concat([user]) })
      }
    })
    this.adminChannel.join()
      .receive("ok", ({ id, lobby_list }) => {
        console.log(`${id} succesfully joined the active_users topic.`)
        this.setState({ lobbyList: lobby_list })
      })
  }

  changeChatroom(room) {
    this.channel = this.socket.channel(`room:${room}`)
    this.setState({
      messages: []
    })
    this.configureRoomChannel(room)
  }

  configureRoomChannel(room) {
    this.channel.join()
      .receive("ok", ({ messages }) => {
        console.log(`Succesfully joined the ${room} chat room.`, messages)
        this.setState({
          messages,
          currentRoom: room
        })
      })
      .receive("error", () => { console.log(`Unable to join the ${room} chat room.`) })

    this.channel.on("message", payload => {
      this.setState({
        messages: this.state.messages.concat([payload])
      })
    })
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  handleMessageSubmit(e) {
    if (e.keyCode === 13 && this.state.currentRoom && this.state.input) {
      this.channel.push("message", {
        room: this.state.currentRoom,
        body: this.state.input,
        timestamp: (new Date()).getTime()
      })
      this.setState({ input: "" })
    }
  }

  renderHeader() {
    if (!this.state.currentRoom) {
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
              { this.state.currentRoom }
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

  render() {
    return (
      <div>
        <Sidebar
          presences={this.state.presences}
          onRoomClick={this.changeChatroom}
          lobbyList={this.state.lobbyList} />
        <div className={style.chatWrapper}>
          { this.renderHeader() }
          <div
            className={style.chatContainer}
            ref={ref => { this.chatContainer = ref }}>
            { this.renderEmpty() }
            { this.renderMessages() }
          </div>
          { this.renderInput() }
        </div>
        { this.props.children }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Chat, style))
