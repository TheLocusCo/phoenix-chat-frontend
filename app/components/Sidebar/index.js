import React from "react"
import cssModules from "react-css-modules"
import { Presence } from "phoenix"
import style from "./style.css"
import ObjectInspector from 'react-object-inspector';

const listBy = (id, { metas: [first, ...rest] }) => {
  first.count = rest.length + 1
  first.id = id
  return first
}

const renderList = (props) => {
  console.log("sidebar?")
  const activeList = Presence.list(props.presences, (id, _metas) => id)

  const lobbyList = props.lobbyList.map(({ id, name, avatar }) => {
    const active = activeList.includes(id)
    return {
      name,
      avatar,
      id,
      active
    }
  })

  return lobbyList
    .sort(orderByActivity)
    .map(({ id, active, name, avatar }) => {
      const newStyle = {}
      if (active) newStyle.boxShadow = "inset 0px 0px 6px 4px rgba(58, 155, 207, 0.6)"
      if (props.currentRoom === id) newStyle.background = "#ddd"

      return (
        <div
          style={newStyle}
          className={style.user}
          key={id}
          onClick={() => { props.onRoomClick(id) }}>
          <div>
            <img alt="user avatar" src={avatar} />
          </div>
          <div>
            { name }
          </div>
        </div>
      )
    }
  )
}

const orderByActivity = (a, b) => {
  if (a.active === b.active) return 0
  if (b.active === true) return 1
  return -1
}

export const Sidebar = props => {
  return (
    <div className={style.sidebar}>
      <div className={style.header}>
        Search (coming soon)
      </div>
      { renderList(props) }
    </div>
  )
}
{/*<ObjectInspector data={ props } />*/}
export default cssModules(Sidebar, style)
