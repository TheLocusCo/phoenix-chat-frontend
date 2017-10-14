const Actions = {}
const API_HOST = "http://192.168.195.158:4000"

Actions.organizationNew = function organizationNew(organization) {
  return dispatch => fetch(`${API_HOST}/api/organizations`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ organization })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    if (res.errors) {
      return dispatch({
        type: "ORGANIZATION_NEW_ERROR",
        payload: {
          errors: res.errors
        }
      })
    }
    dispatch({
      type: "ORGANIZATION_NEW"
    })
    return dispatch(Actions.userAuth())
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userAuth = function userAuth() {
  return dispatch => fetch(`${API_HOST}/auth/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then((res) => { return res.json() })
  .then((res) => {
    console.log('userAuth' + JSON.stringify(res.data))
    dispatch({
      type: "USER_AUTH",
      payload: {
        user: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userNew = function userNew(user) {
  return dispatch => fetch(`${API_HOST}/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    /* If success, log the user in */
    localStorage.token = res.data.token
    /* Then send action to reducer */
    dispatch({
      type: "USER_NEW",
      payload: {
        user: res.data
      }
    })
    dispatch(Actions.userAuth())
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userLogin = function userLogin(user) {
  return dispatch => fetch(`${API_HOST}/auth/identity/callback`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    console.log('????' + JSON.stringify(res.data))
    /* If success, log the user in */
    localStorage.token = res.data.token
    /* Then send action to reducer */
    dispatch({
      type: "USER_LOGIN",
      payload: {
        user: res.data
      }
    })
    dispatch(Actions.userAuth())
  })
  .catch((err) => {
    console.warn(err)
  })
}

export default Actions
